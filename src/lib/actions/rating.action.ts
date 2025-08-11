'use server';

import { FilterQuery } from 'mongoose';
import { revalidatePath } from 'next/cache';

import Course from '@/database/course.model';
import Rating from '@/database/rating.model';
import { connectToDatabase } from '@/shared/lib/mongoose';
import { ICreateRatingParams, IFilterData, TRatingItem } from '@/shared/types';
import { ERatingStatus } from '@/shared/types/enums';

export async function getAllRatings(params: IFilterData): Promise<
  | {
      ratings: TRatingItem[];
      total: number;
    }
  | undefined
> {
  try {
    connectToDatabase();
    const { limit = 10, page = 1, search = '', status } = params;
    const skip = (page - 1) * limit;
    const query: FilterQuery<typeof Rating> = {};

    if (search) query.$or = [{ content: { $regex: search, $options: 'i' } }];
    if (status) query.status = status;
    const total = await Rating.countDocuments(query);
    const ratings = await Rating.find(query)
      .populate({
        path: 'course',
        select: 'title slug',
      })
      .populate({
        path: 'user',
        select: 'name',
      })
      .skip(skip)
      .limit(limit)
      .sort({ created_at: -1 });

    return {
      ratings: ratings ? JSON.parse(JSON.stringify(ratings)) : [],
      total,
    };
  } catch (error) {
    console.log(error);
  }
}

export async function getRatingByUserId(
  userId: string,
  courseId: string,
): Promise<boolean | undefined> {
  if (!userId) return;
  try {
    connectToDatabase();
    const findRating = await Rating.findOne({
      user: userId,
      course: courseId,
    });

    return findRating?._id ? true : false;
  } catch (error) {
    console.log('Error get rating by userId:', error);
  }
}

export async function createNewRating(
  params: ICreateRatingParams,
): Promise<boolean | undefined> {
  try {
    connectToDatabase();
    const newRating = await Rating.create(params);
    const findCourse = await Course.findOne({ _id: params.course }).populate({
      path: 'rating',
      model: Rating,
    });

    if (findCourse?._id && findCourse?.rating) {
      await findCourse?.rating?.push(newRating?._id);
      await findCourse.save();
    }

    return newRating?._id ? true : false;
  } catch (error) {
    console.log(error);
  }
}

export async function updateRating(id: string): Promise<boolean | undefined> {
  try {
    connectToDatabase();
    await Rating.findByIdAndUpdate(id, { status: ERatingStatus.ACTIVE });
    revalidatePath('/manage/rating');

    return true;
  } catch (error) {
    console.log(error);
  }
}

export async function deleteRating(id: string): Promise<boolean | undefined> {
  try {
    connectToDatabase();
    await Rating.findByIdAndDelete(id);
    revalidatePath('/manage/rating');

    return true;
  } catch (error) {
    console.log(error);
  }
}
