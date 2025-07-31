'use server';

import Coupon, { ICoupon } from "@/database/coupon.model";
import { connectToDatabase } from "../mongoose";
import { revalidatePath } from "next/cache";

export async function getAllCoupons(params: any): Promise<ICoupon[] | undefined> {
    try {
        connectToDatabase();
        const coupons = await Coupon.find(params)
        return coupons ? JSON.parse(JSON.stringify(coupons)) : [];
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