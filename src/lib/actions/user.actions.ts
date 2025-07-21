// Actions for "User" model
'use server';

import User, { IUser } from "@/database/user.model";
import { connectToDatabase } from "../mongoose";

export default async function createNewUser(params: IUser) {
    try {
        connectToDatabase();
        const newUser = await User.create(params);
        return newUser;
    } catch (error) {

    }
}
