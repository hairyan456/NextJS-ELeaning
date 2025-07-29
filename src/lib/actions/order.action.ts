'use server';

import Order from "@/database/order.model";
import { connectToDatabase } from "../mongoose";
import { ICreateOrderParams } from "@/types";
import { FilterQuery } from "mongoose";
import Course from "@/database/course.model";
import User from "@/database/user.model";

export async function fetchOrders(params: any) {
    try {
        connectToDatabase();
        const { page = 1, limit = 10, search, status } = params;
        const skip = (page - 1) * limit;
        const query: FilterQuery<typeof Course> = {};
        if (search)
            query.$or = [{ code: { $regex: search, $options: "i" } }];
        if (status)
            query.status = status;
        const orders = await Order.find(query)
            .populate({
                model: Course,
                select: "title",
                path: "course",
            })
            .populate({
                path: "user",
                model: User,
                select: "name",
            })
            .skip(skip)
            .limit(limit);
        return orders;
    } catch (error) { }
}

export async function createNewOrder(params: ICreateOrderParams) {
    try {
        connectToDatabase();
        const newOrder = await Order.create(params);
        return newOrder ? JSON.parse(JSON.stringify(newOrder)) : null;
    } catch (error) {
        console.error("Error connecting to the database:", error);
    }
}