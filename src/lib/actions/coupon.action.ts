'use server';

import Coupon, { ICoupon } from "@/database/coupon.model";
import { connectToDatabase } from "../mongoose";
import { revalidatePath } from "next/cache";
import { TCouponParams, TCreateCouponParams, TUpdateCouponParams } from "@/types";

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
        return coupon ? JSON.parse(JSON.stringify(coupon)) : undefined;
    } catch (error) {
        console.error('Error fetching all coupons:', error);
    }
};

export async function getValidateCoupon(params: { code: string }): Promise<TCouponParams | undefined> {
    try {
        connectToDatabase();
        const findCoupon = await Coupon
            .findOne({ code: params.code })
            .populate({
                path: "course",
                select: "_id title",
            })
        const coupon = findCoupon ? JSON.parse(JSON.stringify(findCoupon)) : null;
        let isActive = true;
        // check coupon có còn Active không
        if (!coupon?.active) isActive = false;
        // check số lần sử dụng (used & limit)
        if (coupon?.used >= coupon?.limit) isActive = false;
        // check còn hạn sử dụng không
        if (coupon?.start_date && new Date(coupon?.start_date) > new Date()) isActive = false;
        if (coupon?.end_date && new Date(coupon?.end_date) < new Date()) isActive = false;

        return isActive ? coupon : undefined;
    } catch (error) {
        console.error('Error fetching all coupons:', error);
    }
};

export async function createNewCoupon(params: TCreateCouponParams) {
    try {
        connectToDatabase();
        const existingCoupon = await Coupon.findOne({ code: params.code });
        if (existingCoupon?._id) {
            return { success: false, message: "Mã giảm giá đã tồn tại" };
        }
        const couponRegex = /^[A-Z0-9]{3,10}$/;
        if (!couponRegex.test(params.code)) {
            return { success: false, message: "Mã giảm giá chỉ từ 3-10 kí tự và không có kí tự đặc biệt" };
        }
        const newCoupon = await Coupon.create(params);
        revalidatePath('/manage/coupon');
        return newCoupon ? JSON.parse(JSON.stringify(newCoupon)) : null;
    } catch (error) {
        console.error('Error creating new coupon:', error);
    }
}

export async function updateCoupon(params: TUpdateCouponParams) {
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