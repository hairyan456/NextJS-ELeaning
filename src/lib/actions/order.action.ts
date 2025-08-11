'use server';

import { FilterQuery } from 'mongoose';
import { revalidatePath } from 'next/cache';

import Coupon from '@/database/coupon.model';
import Course from '@/database/course.model';
import Order from '@/database/order.model';
import User from '@/database/user.model';
import { connectToDatabase } from '@/shared/lib/mongoose';
import { ICreateOrderParams } from '@/shared/types';
import { EOrderStatus } from '@/shared/types/enums';

export async function fetchOrders(params: any) {
  try {
    connectToDatabase();
    const { limit = 10, page = 1, search, status } = params;
    const skip = (page - 1) * limit;
    const query: FilterQuery<typeof Course> = {};

    if (search) query.$or = [{ code: { $regex: search, $options: 'i' } }];
    if (status) query.status = status;
    const orders = await Order.find(query)
      .populate({
        model: Course,
        select: 'title',
        path: 'course',
      })
      .populate({
        path: 'user',
        model: User,
        select: 'name',
      })
      .populate({
        path: 'coupon',
        model: Coupon,
        select: 'code',
      })
      .sort({ created_at: -1 })
      .skip(skip)
      .limit(limit);
    const total = await Order.countDocuments(query);

    return {
      orders: orders ? JSON.parse(JSON.stringify(orders)) : null,
      total,
    };
  } catch (error) {
    console.log(error);
  }
}

export async function getOrderDetail({ code }: { code: string }) {
  try {
    connectToDatabase();
    const order = await Order.findOne({ code }).populate({
      path: 'course',
      model: Course,
      select: 'title',
    });

    return order ? JSON.parse(JSON.stringify(order)) : null;
  } catch (error) {
    console.error('Error fetching order detail:', error);
  }
}

export async function createNewOrder(params: ICreateOrderParams) {
  try {
    connectToDatabase();
    // const newOrder = await Order.create({
    //   ...params,
    //   coupon: params.coupon ? params.coupon : null,
    // });
    if (!params?.coupon) delete params.coupon; // cách fix khác nếu không truyền coupon khi tạo Đơn hàng.
    const newOrder = await Order.create(params);

    if (params?.coupon) {
      await Coupon.findByIdAndUpdate(params.coupon, {
        // increment used times
        $inc: { used: 1 },
      });
    }
    revalidatePath('/manage/order');

    return newOrder ? JSON.parse(JSON.stringify(newOrder)) : null;
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
}

export async function updateOrder({
  orderId,
  status,
}: {
  orderId: string;
  status: EOrderStatus;
}) {
  try {
    connectToDatabase();
    const findOrder = await Order.findById(orderId)
      .populate({
        path: 'course',
        model: Course,
        select: '_id',
      })
      .populate({
        path: 'user',
        model: User,
        select: '_id',
      });

    if (!findOrder?._id) return;
    if (findOrder.status === EOrderStatus.CANCELED) return;

    const findUser = await User.findById(findOrder.user._id);

    await Order.findByIdAndUpdate(orderId, { status }, { new: true });
    // Trường hợp đơn hàng được hoàn thành và chưa có khóa học nào được cấp cho người dùng
    if (
      status === EOrderStatus.COMPLETED &&
      findOrder.status === EOrderStatus.PENDING
    ) {
      // Add course for User
      findUser.courses.push(findOrder.course._id);
      await findUser.save();
    }
    // Trường hợp đơn hàng bị hủy và đã hoàn thành trước đó
    if (
      status === EOrderStatus.CANCELED &&
      findOrder.status === EOrderStatus.COMPLETED
    ) {
      // Remove course for User
      findUser.courses = findUser.courses.filter(
        (element: any) =>
          element.toString() !== findOrder.course._id.toString(),
      );
      await findUser.save();
    }
    revalidatePath('/manage/order');

    return { success: true };
  } catch (error) {
    console.error('Error updating order:', error);
  }
}
