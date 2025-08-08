import CourseUpdateForm from '@/components/course/CourseUpdateForm'
import { Heading } from '@/shared/components'
import { getCourseBySlug } from '@/lib/actions/course.action'
import React from 'react'

const page = async ({ searchParams }: { searchParams: { slug: string } }) => {
  const findCourse = await getCourseBySlug({ slug: searchParams.slug })
  if (!findCourse) return <></>
  return (
    <>
      <Heading className="mb-8">Cập nhật khóa học</Heading>
      {/* Form CourseUpdate */}
      <CourseUpdateForm
        data={JSON.parse(JSON.stringify(findCourse))} // Chuyển đổi đối tượng Mongoose sang JSON
      />
    </>
  )
}

export default page
