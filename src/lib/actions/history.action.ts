"use server";

import { auth } from "@clerk/nextjs/server";
import { connectToDatabase } from "../mongoose";
import User from "@/database/user.model";
import History, { IHistory } from "@/database/history.model";
import { ICreateHistoryParams } from "@/types";
import { revalidatePath } from "next/cache";

export async function createNewHistory(params: ICreateHistoryParams) {
    try {
        connectToDatabase();
        const { userId } = await auth();
        const findUser = await User.findOne({ clerkId: userId });
        if (!findUser?._id)
            return;
        if (params.checked) {
            await History.create({
                course: params.course,
                lesson: params.lesson,
                user: findUser._id,
            });
        }
        else {
            await History.findOneAndDelete({
                course: params.course,
                lesson: params.lesson,
                user: findUser._id,
            });
        }
        revalidatePath(params.path || "/");
    } catch (error) {
        console.error("Error creating new history:", error);
    }
}

export async function getHistory(params: { course: string; }): Promise<IHistory[] | undefined> {
    try {
        connectToDatabase();
        const { userId } = await auth();
        const findUser = await User.findOne({ clerkId: userId });
        if (!findUser?._id)
            return;
        const histories = await History.find({ course: params.course, user: findUser._id });
        return histories;
    } catch (error) {
        console.error("Error getting history:", error);
    }
}