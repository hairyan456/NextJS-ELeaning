'use client';
import { MouseEvent, useState } from 'react';
import { toast } from 'react-toastify';
import slugify from 'slugify';
import Swal from 'sweetalert2';

import { createNewLecture, updateLecture } from '@/lib/actions/lecture.action';
import { createNewLesson, updateLesson } from '@/lib/actions/lesson.action';
import { cn } from '@/lib/utils';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/shared/components/ui/accordion';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { commonClassName } from '@/shared/constants';
import { ICourseUpdateParams, IUpdateCourseLecture } from '@/shared/types';
import { ILesson } from '@/shared/types/models/lesson.model';

import {
  IconCancel,
  IconCheck,
  IconDelete,
  IconEdit,
} from '../../shared/components/icons';
import LessonItemUpdate from '../lesson/lesson-item-update';

const CourseUpdateContent = ({ course }: { course: ICourseUpdateParams }) => {
  const lectures = course?.lectures || [];

  const [lectureEdit, setLectureEdit] = useState<string>('');
  const [lectureIdEdit, setLectureIdEdit] = useState<string>('');
  const [lessonEdit, setLessonEdit] = useState<string>('');
  const [lessonIdEdit, setLessonIdEdit] = useState<string>('');

  const handleAddNewLecture = async () => {
    try {
      const hasResult = await createNewLecture({
        title: 'Chương mới',
        course: course._id,
        order: lectures?.length + 1,
        path: `/manage/course/update-content?slug=${course.slug}`,
      });

      if (hasResult?.success) {
        toast.success(hasResult?.message || 'Thêm chương mới thành công!');
      }
    } catch (error) {
      console.error('Error adding new lecture:', error);
    }
  };

  const handleDeleteLecture = async (
    event: MouseEvent<HTMLSpanElement>,
    lectureId: string,
  ) => {
    event?.stopPropagation();
    try {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
      }).then(async (result) => {
        if (result.isConfirmed) {
          const hasResult = await updateLecture({
            lectureId,
            updateData: {
              _destroy: true,
              path: `/manage/course/update-content?slug=${course.slug}`,
            },
          });

          if (hasResult?.success) {
            toast.success('Xóa chương thành công!');
          }
        }
      });
    } catch (error) {
      console.error('Error deleting lecture:', error);
    }
  };

  const handleUpdateLecture = async (
    event: MouseEvent<HTMLSpanElement>,
    lectureId: string,
  ) => {
    event?.stopPropagation();
    try {
      const hasResult = await updateLecture({
        lectureId,
        updateData: {
          title: lectureEdit,
          path: `/manage/course/update-content?slug=${course.slug}`,
        },
      });

      if (hasResult?.success) {
        toast.success('Cập nhật chương thành công!');
        setLectureEdit('');
        setLectureIdEdit('');
      }
    } catch (error) {
      console.error('Error deleting lecture:', error);
    }
  };

  const handleAddNewLesson = async (lectureId: string, courseId: string) => {
    try {
      const hasResult = await createNewLesson({
        path: `/manage/course/update-content?slug=${course.slug}`,
        lecture: lectureId,
        course: courseId,
        title: 'Tiêu đề bài học mới',
        slug: `tieu-de-bai-hoc-moi-${Date.now().toString().slice(-3)}`,
      });

      if (hasResult?.success) {
        toast.success('Thêm bài học mới thành công!');
      } else toast.error('Thêm bài học mới thất bại');
    } catch (error) {
      console.error('Error adding new lesson:', error);
    }
  };

  const handleUpdateLesson = async (
    event: MouseEvent<HTMLSpanElement>,
    lessonId: string,
  ) => {
    event?.stopPropagation();
    try {
      const hasResult = await updateLesson({
        lessonId,
        path: `/manage/course/update-content?slug=${course.slug}`,
        updateData: {
          title: lessonEdit,
          slug: slugify(lessonEdit, {
            lower: true,
            locale: 'vi',
            remove: /[!"'()*+.:@~]/g,
          }),
        },
      });

      if (hasResult?.success) {
        toast.success('Cập nhật bài học thành công!');
        setLessonEdit('');
        setLessonIdEdit('');
      }
    } catch (error) {
      console.error('Error updating lesson:', error);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-5">
        {lectures.map((lecture: IUpdateCourseLecture) => (
          <div key={lecture._id}>
            <Accordion
              collapsible={!lectureIdEdit}
              type="single"
            >
              <AccordionItem value={lecture._id}>
                <AccordionTrigger>
                  <div className="flex w-full items-center justify-between gap-3 pr-5">
                    {lecture._id === lectureIdEdit ? (
                      <>
                        <div className="w-full">
                          <Input
                            defaultValue={lecture?.title}
                            placeholder="Tên chương..."
                            onChange={(event) => {
                              setLectureEdit(event.target.value);
                            }}
                          />
                        </div>
                        <div className="flex gap-2">
                          <span
                            className={cn(
                              commonClassName.action,
                              'text-green-500',
                            )}
                            onClick={(event) =>
                              handleUpdateLecture(event, lecture?._id)
                            }
                          >
                            <IconCheck />
                          </span>
                          <span
                            className={cn(
                              commonClassName.action,
                              'text-red-500',
                            )}
                            onClick={(event) => {
                              event.stopPropagation();
                              setLectureIdEdit('');
                            }}
                          >
                            <IconCancel />
                          </span>
                        </div>
                      </>
                    ) : (
                      <>
                        <div>{lecture?.title}</div>
                        <div className="flex gap-2">
                          <span
                            className={cn(
                              commonClassName.action,
                              'text-blue-500',
                            )}
                            onClick={(event) => {
                              event.stopPropagation();
                              setLectureIdEdit(lecture?._id);
                            }}
                          >
                            <IconEdit />
                          </span>
                          <span
                            className={cn(
                              commonClassName.action,
                              'text-red-500',
                            )}
                            onClick={(event) =>
                              handleDeleteLecture(event, lecture?._id)
                            }
                          >
                            <IconDelete />
                          </span>
                        </div>
                      </>
                    )}
                  </div>
                </AccordionTrigger>
                <AccordionContent className="border-none !bg-transparent">
                  <div className="flex flex-col gap-5">
                    {lecture.lessons.map((lesson: ILesson) => (
                      <Accordion
                        key={lesson?._id}
                        collapsible={!lessonIdEdit}
                        type="single"
                      >
                        <AccordionItem value={lesson?._id}>
                          <AccordionTrigger>
                            <div className="flex w-full items-center justify-between gap-3 pr-5">
                              {lesson._id === lessonIdEdit ? (
                                <>
                                  <div className="w-full">
                                    <Input
                                      defaultValue={lesson?.title}
                                      placeholder="Tên bài học..."
                                      onChange={(event) => {
                                        setLessonEdit(event.target.value);
                                      }}
                                    />
                                  </div>
                                  <div className="flex gap-2">
                                    <span
                                      className={cn(
                                        commonClassName.action,
                                        'text-green-500',
                                      )}
                                      onClick={(event) =>
                                        handleUpdateLesson(event, lesson._id)
                                      }
                                    >
                                      <IconCheck />
                                    </span>
                                    <span
                                      className={cn(
                                        commonClassName.action,
                                        'text-red-500',
                                      )}
                                      onClick={(event) => {
                                        event.stopPropagation();
                                        setLessonIdEdit('');
                                      }}
                                    >
                                      <IconCancel />
                                    </span>
                                  </div>
                                </>
                              ) : (
                                <>
                                  <div>{lesson?.title}</div>
                                  <div className="flex gap-2">
                                    <span
                                      className={cn(
                                        commonClassName.action,
                                        'text-blue-500',
                                      )}
                                      onClick={(event) => {
                                        event.stopPropagation();
                                        setLessonIdEdit(lesson?._id);
                                      }}
                                    >
                                      <IconEdit />
                                    </span>
                                    <span
                                      className={cn(
                                        commonClassName.action,
                                        'text-red-500',
                                      )}
                                      // onClick={(event) => handleDeleteLesson(event, lesson?._id)}
                                    >
                                      <IconDelete />
                                    </span>
                                  </div>
                                </>
                              )}
                            </div>
                          </AccordionTrigger>
                          <AccordionContent>
                            <LessonItemUpdate lesson={lesson} />
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <Button
              className="ml-auto mt-5 block w-fit text-white"
              onClick={() => handleAddNewLesson(lecture._id, course._id)}
            >
              Thêm bài học
            </Button>
          </div>
        ))}
      </div>

      <Button
        className="mt-5 text-white"
        onClick={() => handleAddNewLecture()}
      >
        Thêm chương mới
      </Button>
    </>
  );
};

export default CourseUpdateContent;
