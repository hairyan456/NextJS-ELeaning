'use server';

import Coupon, { ICoupon } from "@/database/coupon.model";
import { connectToDatabase } from "../mongoose";

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
        return newCoupon ? JSON.parse(JSON.stringify(newCoupon)) : null;
    } catch (error) {
        console.error('Error creating new coupon:', error);
    }
}