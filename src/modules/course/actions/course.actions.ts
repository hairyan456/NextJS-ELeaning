'use server';

import { auth } from '@clerk/nextjs/server';
import { FilterQuery } from 'mongoose';

import Course from '@/database/course.model';
import Lecture from '@/database/lecture.model';
import User from '@/database/user.model';
import { connectToDatabase } from '@/shared/lib/mongoose';
import { CourseModel, LessonModel, RatingModel } from '@/shared/schemas';
import { ICourse, IQueryFilter } from '@/shared/types';
import { ECourseStatus, ERatingStatus } from '@/shared/types/enums';

import { ICourseItemData } from '../types';

export async function fetchCourses(
  params: IQueryFilter,
): Promise<ICourse[] | undefined> {
  try {
    connectToDatabase();
    const { limit = 10, page = 1, search = '' } = params;
    const skip = (page - 1) * limit;
    const query: FilterQuery<typeof CourseModel> = {};

    if (search) query.$or = [{ title: { $regex: search, $options: 'i' } }];
    query.status = ECourseStatus.APPROVED; // Chỉ lấy các khóa học đã được phê duyệt
    const listCourses = await CourseModel.find(query)
      .skip(skip)
      .limit(limit)
      .sort({ created_at: -1 });

    return listCourses ? JSON.parse(JSON.stringify(listCourses)) : [];
  } catch (error) {
    console.error('Error connecting to database:', error);
  }
}

export async function fetchCoursesOfUser(): Promise<
  ICourseItemData[] | null | undefined
> {
  try {
    connectToDatabase();
    const { userId } = await auth();
    const findUser = await User.findOne({ clerkId: userId }).populate({
      path: 'courses',
      model: Course,
      match: { status: ECourseStatus.APPROVED, _destroy: false },
      populate: {
        path: 'lectures',
        model: Lecture,
        select: 'lessons',
        populate: {
          path: 'lessons',
          model: LessonModel,
          select: 'slug',
        },
      },
    });

    if (!findUser) return null;

    return findUser.courses
      ? JSON.parse(JSON.stringify(findUser.courses))
      : null;
  } catch (error) {
    console.error('Error fetching user courses:', error);
  }
}

export async function fetchCourseBySlug({
  slug,
}: {
  slug: string;
}): Promise<ICourseItemData | undefined> {
  try {
    connectToDatabase();
    const findCourse = await Course.findOne({ slug })
      .populate({
        path: 'lectures',
        model: Lecture,
        select: '_id title',
        match: { _destroy: false },
        populate: {
          path: 'lessons',
          model: LessonModel,
          match: { _destroy: false },
        },
      })
      .populate({
        path: 'rating',
        model: RatingModel,
        match: {
          status: ERatingStatus.ACTIVE,
        },
      });

    return findCourse
      ? (JSON.parse(JSON.stringify(findCourse)) as ICourseItemData)
      : undefined;
  } catch (error) {
    console.error('Error fetching course by slug:', error);
  }
}
