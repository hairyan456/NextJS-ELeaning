'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@/shared/components/ui/button'
import { Calendar } from '@/shared/components/ui/calendar'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/components/ui/form'
import { Input } from '@/shared/components/ui/input'
import { Label } from '@/shared/components/ui/label'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/shared/components/ui/popover'
import { RadioGroup, RadioGroupItem } from '@/shared/components/ui/radio-group'
import { Switch } from '@/shared/components/ui/switch'
import { IconCalendar, IconCancel } from '@/shared/components/icons'
import { useState } from 'react'
import { couponFormSchema, couponTypes } from '@/shared/constants'
import { ECouponType } from '@/types/enums'
import { format } from 'date-fns'
import { createNewCoupon } from '@/lib/actions/coupon.action'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import { debounce } from 'lodash'
import { getAllCourses } from '@/lib/actions/course.action'
import { ICourse } from '@/database/course.model'
import { Checkbox } from '@/shared/components/ui/checkbox'
import InputFormatCurrency from '@/shared/components/ui/input-format'

const NewCouponForm = () => {
  const router = useRouter()

  const [startDate, setStartDate] = useState<Date>()
  const [endDate, setEndDate] = useState<Date>()
  const [findCourse, setFindCourse] = useState<ICourse[] | undefined>([])
  const [selectedCourses, setSelectedCourses] = useState<ICourse[]>([])

  const form = useForm<z.infer<typeof couponFormSchema>>({
    resolver: zodResolver(couponFormSchema),
    defaultValues: {
      type: ECouponType.PERCENT,
      active: true,
      value: '0',
      limit: 0,
      title: '',
      code: '',
      start_date: '',
      end_date: '',
      course: [],
    },
  })

  const couponTypeWatch = form.watch('type')

  const handleSearchCourse = debounce(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value
      const listCourses = await getAllCourses({ search: value })
      setFindCourse(listCourses)
      if (!value) setFindCourse([])
    },
    250,
  )

  const handleSelectCourse = (checked: boolean | string, course: any) => {
    if (checked) {
      setSelectedCourses((prev) => [...prev, course])
    } else {
      setSelectedCourses((prev) => prev.filter((c) => c._id !== course._id))
    }
  }

  async function onSubmit(values: z.infer<typeof couponFormSchema>) {
    try {
      const couponValue = Number(values.value?.replace(/,/g, ''))
      if (
        couponTypeWatch === ECouponType.PERCENT &&
        couponValue &&
        (couponValue > 100 || couponValue < 0)
      ) {
        form.setError('value', { message: 'Giá trị không hợp lệ' })
      }
      const newCoupon = await createNewCoupon({
        ...values,
        value: couponValue,
        start_date: startDate,
        end_date: endDate,
        type: couponTypeWatch,
        course: selectedCourses.map((c) => c._id),
      })
      if (!newCoupon?.success) {
        toast.warning(newCoupon?.message)
        return
      }
      if (newCoupon?._id) {
        toast.success('Tạo mã giảm giá thành công!')
        form.reset()
        router.push('/manage/coupon')
      }
    } catch (error) {
      console.error('Error creating coupon:', error)
    }
  }

  return (
    <Form {...form}>
      <form
        autoComplete="off"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="mb-8 mt-10 grid grid-cols-2 gap-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tiêu đề</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Tiêu đề"
                    {...field}
                  />
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
                  <Input
                    placeholder="Mã giảm giá"
                    {...field}
                    className="font-bold"
                    onChange={(e) =>
                      field.onChange(e.target.value.toUpperCase())
                    }
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
                      <Button
                        className="bgDarkMode borderDarkMode w-full border"
                        variant={'outline'}
                      >
                        <IconCalendar className="mr-2 size-4" />
                        {startDate ? (
                          format(startDate, 'dd/MM/yyyy')
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent
                      align="start"
                      className="w-auto p-0"
                    >
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
                      <Button
                        className="bgDarkMode borderDarkMode w-full border"
                        variant={'outline'}
                      >
                        <IconCalendar className="mr-2 size-4" />
                        {endDate ? (
                          format(endDate, 'dd/MM/yyyy')
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent
                      align="start"
                      className="w-auto p-0"
                    >
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
                <FormControl className="h-12">
                  <RadioGroup
                    className="flex gap-5"
                    defaultValue={ECouponType.PERCENT}
                    onValueChange={field.onChange}
                  >
                    {couponTypes.map((type) => (
                      <div
                        key={type.value}
                        className="flex items-center space-x-2"
                      >
                        <RadioGroupItem
                          id={type.value}
                          value={type.value}
                        />
                        <Label
                          className="cursor-pointer"
                          htmlFor={type.value}
                        >
                          {type.title}
                        </Label>
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
                  {couponTypeWatch === ECouponType.PERCENT ? (
                    <Input
                      placeholder="100"
                      {...field}
                      onChange={(e) => field.onChange(e.target.value)}
                    />
                  ) : (
                    <InputFormatCurrency
                      {...field}
                      onChange={(e) => field.onChange(e.target.value)}
                    />
                  )}
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
                    placeholder="100"
                    type="number"
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
                    {findCourse && findCourse?.length > 0 && (
                      <div className="!mt-5 flex flex-col gap-2">
                        {findCourse.map((course) => (
                          <Label
                            key={course.title}
                            className="flex cursor-pointer items-center gap-2 text-sm font-medium"
                            htmlFor={course.title}
                          >
                            <Checkbox
                              className="bgDarkMode borderDarkMode border"
                              id={course.title}
                              checked={selectedCourses.some(
                                (c) => c._id === course._id,
                              )}
                              onCheckedChange={(checked) =>
                                handleSelectCourse(checked, course)
                              }
                            />
                            <span>{course.title}</span>
                          </Label>
                        ))}
                      </div>
                    )}
                    {selectedCourses.length > 0 && (
                      <div className="!mt-5 flex flex-wrap items-start gap-2">
                        {selectedCourses?.map((course) => (
                          <div
                            key={course.title}
                            className="borderDarkMode bgDarkMode inline-flex items-center gap-2 rounded-lg border px-3 py-1 text-sm font-semibold"
                          >
                            <span>{course.title}</span>
                            <button
                              type="button"
                              onClick={() => handleSelectCourse(false, course)}
                            >
                              <IconCancel className="size-4 font-bold text-red-500 hover:text-gray-600 hover:transition-all" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button
          className="ml-auto flex w-[150px]"
          variant="primary"
        >
          Tạo mã
        </Button>
      </form>
    </Form>
  )
}

export default NewCouponForm
