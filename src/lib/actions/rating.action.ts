'use server';

import Rating from "@/database/rating.model";
import { connectToDatabase } from "../mongoose";

export async function createNewRating(params: any): Promise<boolean | undefined> {
    try {
        connectToDatabase();
        const newRating = await Rating.create(params);
        return !newRating?._id ? false : true;
    } catch (error) {
        console.log(error);
    }
};