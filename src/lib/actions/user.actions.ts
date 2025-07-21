// Actions for "User" model
'use server';

import User from "@/database/user.model";
import { connectToDatabase } from "../mongoose";
import { ICreateUserParams } from "@/types";

export default async function createNewUser(params: ICreateUserParams) {
    try {
        connectToDatabase();
        const newUser = await User.create(params);
        return newUser;
    } catch (error) {

    }
}
