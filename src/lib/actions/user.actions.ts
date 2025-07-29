// Actions for "User" model
'use server';

import User, { IUser } from "@/database/user.model";
import { connectToDatabase } from "../mongoose";
import { ICreateUserParams } from "@/types";
import { auth } from "@clerk/nextjs/server";
import Course, { ICourse } from "@/database/course.model";
import { ECourseStatus } from "@/types/enums";

export async function createNewUser(params: ICreateUserParams) {
    try {
        connectToDatabase();
        const newUser = await User.create(params);
        return newUser;
    } catch (error) {
        console.error("Error creating new user:", error);
    }
}

export async function getUserInfo({ userId }: { userId: string }): Promise<IUser | null | undefined> {
    try {
        connectToDatabase();
        const findUser = await User.findOne({ clerkId: userId });
        return findUser ? JSON.parse(JSON.stringify(findUser)) : null;
    } catch (error) {
        console.error("Error fetching user info:", error);
        throw error;
    }
}

export async function getUserCourses(): Promise<ICourse[] | null | undefined> {
    try {
        connectToDatabase();
        const { userId } = await auth();
        const findUser = await User.findOne({ clerkId: userId }).populate({
            path: 'courses',
            model: Course,
            match: { status: ECourseStatus.APPROVED, _destroy: false },
        });
        if (!findUser)
            return null;
        return findUser.courses ? JSON.parse(JSON.stringify(findUser.courses)) : null;

    } catch (error) {
        console.error("Error fetching user courses:", error);
    }
}
