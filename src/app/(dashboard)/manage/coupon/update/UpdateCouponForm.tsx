"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { IconCalendar } from "@/components/icons";
import { useState } from "react";
import { couponTypes } from "@/constants";
import { ECouponType } from "@/types/enums";
import { format } from "date-fns";
import { createNewCoupon } from "@/lib/actions/coupon.action";
import { toast } from "react-toastify";
import { redirect } from "next/navigation";

const formSchema = z.object({
    title: z.string({ message: "Tiêu đề không được để trống" }),
    code: z.string({ message: "Mã giảm giá không được để trống" }).min(3, "Mã giảm giá phải có ít nhất 3 ký tự").max(10, "Mã giảm giá không được quá 10 ký tự"),
    start_date: z.string().optional(),
    end_date: z.string().optional(),
    active: z.boolean().optional(),
    value: z.number().optional(),
    type: z.string().optional(),
    courses: z.array(z.string()).optional(),
    limit: z.number().optional(),
});
const UpdateCouponForm = () => {
    const [startDate, setStartDate] = useState<Date>();
    const [endDate, setEndDate] = useState<Date>();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            type: ECouponType.PERCENT,
        },
    });

    const couponTypeWatch = form.watch("type");

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            // console.log("Form values:", { ...values, start_date: startDate, end_date: endDate, type: couponTypeWatch }); return;
            const newCoupon = await createNewCoupon(values);
            if (newCoupon?._id) {
                toast.success("Tạo mã giảm giá thành công!");
                form.reset();
                redirect('/manage/coupon');
            }
        } catch (error) {
            console.error("Error creating coupon:", error);
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} autoComplete="off">
                <div className="grid grid-cols-2 gap-8 mt-10 mb-8">
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Tiêu đề</FormLabel>
                                <FormControl>
                                    <Input placeholder="Tiêu đề" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="code"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Code</FormLabel>
                                <FormControl>
                                    <Input placeholder="Mã giảm giá" {...field}
                                        onChange={(e) => field.onChange(e.target.value.toUpperCase())}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="start_date"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Ngày bắt đầu</FormLabel>
                                <FormControl>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button variant={"outline"} className="w-full bgDarkMode border borderDarkMode">
                                                <IconCalendar className="mr-2 h-4 w-4" />
                                                {startDate ? format(startDate, 'dd/MM/yyyy') : <span>Pick a date</span>}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar
                                                mode="single"
                                                selected={startDate}
                                                onSelect={setStartDate}
                                            />
                                        </PopoverContent>
                                    </Popover>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="end_date"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Ngày kết thúc</FormLabel>
                                <FormControl>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button variant={"outline"} className="w-full bgDarkMode border borderDarkMode">
                                                <IconCalendar className="mr-2 h-4 w-4" />
                                                {endDate ? format(endDate, 'dd/MM/yyyy') : <span>Pick a date</span>}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar
                                                mode="single"
                                                selected={endDate}
                                                onSelect={setEndDate}
                                            />
                                        </PopoverContent>
                                    </Popover>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="type"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Loại coupon</FormLabel>
                                <FormControl>
                                    <RadioGroup
                                        defaultValue={ECouponType.PERCENT}
                                        className="flex gap-5"
                                        onValueChange={field.onChange}
                                    >
                                        {couponTypes.map((type) => (
                                            <div key={type.value} className="flex items-center space-x-2">
                                                <RadioGroupItem value={type.value} id={type.value} />
                                                <Label htmlFor={type.value}>{type.title}</Label>
                                            </div>
                                        ))}
                                    </RadioGroup>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="value"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Giá trị</FormLabel>
                                <FormControl>
                                    <Input type="number" placeholder="25%" {...field} onChange={(e) => field.onChange(e.target.valueAsNumber)} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="active"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Trạng thái</FormLabel>
                                <FormControl>
                                    <div>
                                        <Switch
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="limit"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Số lượng tối đa</FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        placeholder="100"
                                        {...field}
                                        onChange={(e) => field.onChange(e.target.valueAsNumber)}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="courses"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Khóa học</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Tìm kiếm khóa học..."
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <Button variant="primary" className="w-[150px] ml-auto flex">
                    Cập nhật
                </Button>
            </form>
        </Form>
    );
};

export default UpdateCouponForm;