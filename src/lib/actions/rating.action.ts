'use server';

import Rating from "@/database/rating.model";
import { connectToDatabase } from "../mongoose";
import { ICreateRatingParams, TRatingItem } from "@/types";
import Course from "@/database/course.model";
import { revalidatePath } from "next/cache";
import { ERatingStatus } from "@/types/enums";

export async function getAllRatings(): Promise<TRatingItem[] | undefined> {
    try {
        connectToDatabase();
        const ratings = await Rating.find({}).populate({
            path: "course",
            select: "title slug",
        })
            .populate({
                path: "user",
                select: "name",
            });
        return ratings ? JSON.parse(JSON.stringify(ratings)) : [];
    } catch (error) {
        console.log(error);
    }
};

export async function getRatingByUserId(userId: string, courseId: string): Promise<boolean | undefined> {
    if (!userId) return;
    try {
        connectToDatabase();
        const findRating = await Rating.findOne({
            user: userId,
            course: courseId
        });
        return findRating?._id ? true : false;
    } catch (error) {
        console.log('Error get rating by userId:', error);
    }
}

export async function createNewRating(params: ICreateRatingParams): Promise<boolean | undefined> {
    try {
        connectToDatabase();
        const newRating = await Rating.create(params);
        const findCourse = await Course.findOne({ _id: params.course }).populate({ path: "rating", model: Rating });
        if (findCourse?._id && findCourse?.rating) {
            await findCourse?.rating?.push(newRating?._id);
            await findCourse.save();
        }
        return !newRating?._id ? false : true;
    } catch (error) {
        console.log(error);
    }
};

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