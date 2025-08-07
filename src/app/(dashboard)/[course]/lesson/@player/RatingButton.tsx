'use client';

import { IconStar } from "@/shared/components/icons";
import { Button } from "@/shared/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/shared/components/ui/dialog";
import { Textarea } from "@/shared/components/ui/textarea";
import { ratingList } from "@/shared/constants";
import { createNewRating, getRatingByUserId } from "@/lib/actions/rating.action";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";
import { toast } from "react-toastify";

const RatingButton = ({ courseId, userId }: { courseId: string; userId: string; }) => {
    const [ratingValue, setRatingValue] = useState<number>(-1);
    const [ratingContent, setRatingContent] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleRatingCourse = async () => {
        setIsLoading(true);
        try {
            if (!ratingContent || ratingValue === -1) {
                toast.warning('Vui lòng chọn mức độ và nhập nội dung đánh giá')
                setIsLoading(false);
                return;
            }
            const isAlreadyRated = await getRatingByUserId(userId, courseId);
            if (isAlreadyRated) {
                toast.warning("Bạn đã đánh giá khóa học này");
                setIsLoading(false);
                return;
            }
            const res = await createNewRating({
                rate: ratingValue,
                content: ratingContent,
                user: userId,
                course: courseId
            });
            if (res) {
                toast.success("Viết đánh giá thành công")
                setRatingContent("");
                setRatingValue(-1);
            }
            else {
                toast.error("Viết đánh giá thất bại")

            }
        } catch (error) {
            console.log(error);
        }
        finally {
            setIsLoading(false);
        }
    }

    return (
        <Dialog>
            <DialogTrigger
                className="flex items-center gap-2 rounded-md h-10 bg-primary text-sm font-semibold px-5 text-white"
            >
                <IconStar className="size-4" />
                <span> Đánh giá khóa học</span>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="tracking-tight font-bold mb-5 text-xl">Đánh giá</DialogTitle>
                    <DialogDescription>
                        <div className="flex items-center justify-between gap-5 mb-5">
                            {ratingList?.map(rating => (
                                <button
                                    type="button"
                                    key={rating.title}
                                    className="flex flex-col gap-3 text-center text-xs items-center"
                                    onClick={() => setRatingValue(rating.value)}
                                >
                                    <span
                                        className={cn(`flex items-center justify-center size-10 rounded-full bg-gray-200`,
                                            ratingValue === rating.value && 'bg-[#ffb86c]')}
                                    >
                                        <Image width={20} height={20} alt={rating.title}
                                            src={`/rating/${rating.title}.png`}
                                        />
                                    </span>
                                    <strong className="capitalize">{rating.title}</strong>
                                </button>
                            ))}
                        </div>
                        <Textarea
                            placeholder="Nhập đánh giá của bạn..."
                            className="h-[200px] resize-none "
                            onChange={(e) => setRatingContent(e.target.value)}
                            value={ratingContent}
                        />
                        <Button variant={'primary'} className="w-full mt-5" onClick={handleRatingCourse}
                            disabled={isLoading || ratingValue === -1 || !ratingContent}
                            isLoading={isLoading}
                        >
                            Gửi đánh giá
                        </Button>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};

export default RatingButton;