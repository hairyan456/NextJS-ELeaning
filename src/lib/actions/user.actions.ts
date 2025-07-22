// Actions for "User" model
'use server';

import User, { IUser } from "@/database/user.model";
import { connectToDatabase } from "../mongoose";
import { ICreateUserParams } from "@/types";

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
        return findUser ? findUser.toObject() : null;
    } catch (error) {
        console.error("Error fetching user info:", error);
        throw error;
    }
}
