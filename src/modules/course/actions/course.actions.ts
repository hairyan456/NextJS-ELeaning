'use server';

import { FilterQuery } from 'mongoose';

import { connectToDatabase } from '@/shared/lib/mongoose';
import { IQueryFilter } from '@/shared/types';
import { ECourseStatus } from '@/shared/types/enums';

import CourseModel, { ICourse } from '../models/course.model';

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
