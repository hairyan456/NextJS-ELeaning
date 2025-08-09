'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@/shared/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/components/ui/form'
import { Input } from '@/shared/components/ui/input'
// import { vi } from "zod/locales"
import { useState } from 'react'
import slugify from 'slugify'
import { createNewCourse } from '@/lib/actions/course.action'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import { IUser } from '@/database/user.model'

const formSchema = z.object({
  title: z
    .string()
    .min(10, 'Tên khóa học phải có ít nhất 10 ký tự')
    .max(100, 'Tên khóa học không được quá 100 ký tự'),
  slug: z.string().optional(),
})

function CourseAddNewForm({ user }: { user: IUser }) {
  const [isLoadingSubmit, setLoadingSubmit] = useState(false)
  const router = useRouter()

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      slug: '',
    },
  })

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoadingSubmit(true)
    try {
      const data = {
        title: values.title,
        slug:
          values.slug || slugify(values.title, { lower: true, locale: 'vi' }),
        author: user?._id || '',
      }
      const res = await createNewCourse(data)
      if (!res?.success) {
        toast.error(res?.message)
        return
      } else toast.success(res?.message)
      if (res?.data) {
        router.push(`/manage/course/update?slug=${res?.data?.slug}`)
      }
    } catch (error) {
      console.error('Error submitting form:', error)
    } finally {
      setLoadingSubmit(false)
    }
  }
  return (
    <Form {...form}>
      <form
        autoComplete="off"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="my-10 grid grid-cols-2 gap-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tên khóa học *</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Tên khóa học"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Đường dẫn khóa học</FormLabel>
                <FormControl>
                  <Input
                    placeholder="khoa-hoc-lap-trinh"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button
          className="w-28"
          disabled={isLoadingSubmit}
          isLoading={isLoadingSubmit}
          type="submit"
          variant={'primary'}
        >
          Tạo khóa học
        </Button>
      </form>
    </Form>
  )
}

export default CourseAddNewForm
