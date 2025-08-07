"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/shared/components/ui/button";
import { Calendar } from "@/shared/components/ui/calendar";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/shared/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/shared/components/ui/radio-group";
import { Switch } from "@/shared/components/ui/switch";
import { IconCalendar, IconCancel } from "@/shared/components/icons";
import { useEffect, useState } from "react";
import { couponFormSchema, couponTypes } from "@/shared/constants";
import { ECouponType } from "@/types/enums";
import { format } from "date-fns";
import { updateCoupon } from "@/lib/actions/coupon.action";
import { toast } from "react-toastify";
import InputFormatCurrency from "@/shared/components/ui/input-format";
import { da } from "date-fns/locale";
import { TCouponParams } from "@/types";
import { ICourse } from "@/database/course.model";
import { debounce } from "lodash";
import { getAllCourses } from "@/lib/actions/course.action";
import { Checkbox } from "@/shared/components/ui/checkbox";

const UpdateCouponForm = ({ data }: { data: TCouponParams }) => {
    const [startDate, setStartDate] = useState<Date>(data?.start_date || new Date());
    const [endDate, setEndDate] = useState<Date>(data?.end_date || new Date());
    const [findCourse, setFindCourse] = useState<ICourse[] | undefined>([]);
    const [selectedCourses, setSelectedCourses] = useState<any[]>([]);

    const form = useForm<z.infer<typeof couponFormSchema>>({
        resolver: zodResolver(couponFormSchema),
        defaultValues: {
            title: data.title,
            code: data.code,
            active: data.active,
            value: data.value.toString(),
            limit: data.limit,
            type: data.type,

        },
    });

    const couponTypeWatch = form.watch("type");

    const handleSearchCourse = debounce(async (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const listCourses = await getAllCourses({ search: value });
        setFindCourse(listCourses);
        if (!value)
            setFindCourse([]);
    }, 250);

    const handleSelectCourse = (checked: boolean | string, course: any) => {
        if (checked) {
            setSelectedCourses((prev) => [...prev, course]);
        } else {
            setSelectedCourses((prev) => prev.filter(c => c._id !== course._id));
        }
    };

    useEffect(() => {
        if (data?.course) {
            setSelectedCourses(data?.course);
        }
    }, [data.course]);

    async function onSubmit(values: z.infer<typeof couponFormSchema>) {
        try {
            const couponValue = Number(values.value?.replace(/,/g, ""));
            if (couponTypeWatch === ECouponType.PERCENT && couponValue && (couponValue > 100 || couponValue < 0)) {
                form.setError("value", { message: "Giá trị không hợp lệ" });
            }
            const updatedCoupon = await updateCoupon({
                _id: data._id,
                updateData: {
                    ...values,
                    value: couponValue,
                    start_date: startDate,
                    end_date: endDate,
                    type: couponTypeWatch,
                    course: selectedCourses.map(c => c._id)
                }
            });
            if (updatedCoupon?._id) {
                toast.success("Cập nhật coupon thành công");
                return;
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
                                    <Input placeholder="Mã giảm giá" {...field} className="font-bold uppercase"
                                        onChange={(e) => field.onChange(e.target.value.toUpperCase())}
                                        disabled
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
                                                onSelect={setStartDate as any}
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
                                                onSelect={setEndDate as any}
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
                                <FormControl className="h-12">
                                    <RadioGroup
                                        defaultValue={data.type || ECouponType.PERCENT}
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
                                    {couponTypeWatch === ECouponType.PERCENT ?
                                        <Input
                                            placeholder="100"
                                            {...field}
                                            onChange={(e) => field.onChange(e.target.value)}
                                        />
                                        :
                                        <InputFormatCurrency
                                            {...field}
                                            onChange={(e) => field.onChange(e.target.value)}
                                        />
                                    }
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
                                <FormControl className="h-12">
                                    <div className="flex flex-col justify-center">
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
                        name="course"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Khóa học</FormLabel>
                                <FormControl>
                                    <>
                                        <Input
                                            placeholder="Tìm kiếm khóa học..."
                                            onChange={handleSearchCourse}
                                        />
                                        {findCourse && findCourse?.length > 0 &&
                                            <div className="flex flex-col gap-2 !mt-5">
                                                {findCourse.map((course) => (
                                                    <Label
                                                        key={course.title}
                                                        className="flex items-center gap-2 font-medium text-sm cursor-pointer"
                                                        htmlFor={course.title}
                                                    >
                                                        <Checkbox
                                                            id={course.title}
                                                            className="bgDarkMode border borderDarkMode"
                                                            onCheckedChange={(checked) => handleSelectCourse(checked, course)}
                                                            checked={selectedCourses.some(c => c._id === course._id)}
                                                        />
                                                        <span>{course.title}</span>
                                                    </Label>
                                                ))}
                                            </div>
                                        }
                                        {selectedCourses.length > 0 &&
                                            <div className="flex flex-wrap items-start gap-2 !mt-5">
                                                {selectedCourses?.map((course) => (
                                                    <div
                                                        key={course.title}
                                                        className="inline-flex items-center gap-2 font-semibold text-sm px-3 py-1 rounded-lg border borderDarkMode bgDarkMode"
                                                    >
                                                        <span>{course.title}</span>
                                                        <button type="button" onClick={() => handleSelectCourse(false, course)}>
                                                            <IconCancel className="size-4 text-red-500 font-bold hover:text-gray-600 hover:transition-all" />
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        }
                                    </>
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