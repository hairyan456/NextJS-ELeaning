'use server';

import Coupon, { ICoupon } from "@/database/coupon.model";
import { connectToDatabase } from "../mongoose";
import { revalidatePath } from "next/cache";
import { TCouponParams, TCreateCouponParams } from "@/types";

export async function getAllCoupons(params: any): Promise<ICoupon[] | undefined> {
    try {
        connectToDatabase();
        const coupons = await Coupon.find(params)
        return coupons ? JSON.parse(JSON.stringify(coupons)) : [];
    } catch (error) {
        console.error('Error fetching all coupons:', error);
    }
};

export async function getCouponByCode(params: { code: string }): Promise<TCouponParams | undefined> {
    try {
        connectToDatabase();
        const coupon = await Coupon
            .findOne({ code: params.code })
            .populate({
                path: "course",
                select: "_id title",
            })
        return coupon ? JSON.parse(JSON.stringify(coupon)) : [];
    } catch (error) {
        console.error('Error fetching all coupons:', error);
    }
};

export async function createNewCoupon(params: any) {
    try {
        connectToDatabase();
        const newCoupon = await Coupon.create(params);
        revalidatePath('/manage/coupon');
        return newCoupon ? JSON.parse(JSON.stringify(newCoupon)) : null;
    } catch (error) {
        console.error('Error creating new coupon:', error);
    }
}

export async function updateCoupon(params: any) {
    try {
        connectToDatabase();
        const updatedCoupon = await Coupon.findByIdAndUpdate(params?._id, params?.updateData);
        revalidatePath('/manage/coupon');
        return updatedCoupon ? JSON.parse(JSON.stringify(updatedCoupon)) : null;
    } catch (error) {
        console.error('Error update coupon:', error);
    }
}

export async function deleteCoupon(code: string, path?: string) {
    if (!code) return;
    try {
        connectToDatabase();
        await Coupon.findOneAndDelete({ code });
        revalidatePath(path || '/');
    } catch (error) {
        console.error('Error delete Coupon:', error);
    }
};