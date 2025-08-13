'use client';

import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

import { createNewOrder } from '@/lib/actions/order.action';
import { Button } from '@/shared/components/ui/button';
import { useUserContext } from '@/shared/contexts';
import { createOrderCode } from '@/utils';

interface IButtonEnrollProps {
  courseId: string;
  amount: number;
  coupon: string;
}

const ButtonEnroll = ({ amount, coupon, courseId }: IButtonEnrollProps) => {
  const { userInfo } = useUserContext();

  const router = useRouter();
  const handleEnrollCourse = async () => {
    if (!userInfo?._id) {
      toast.error('Vui lòng đăng nhập để mua khóa học');

      return;
    }

    // handle when login
    const newOrder = await createNewOrder({
      code: createOrderCode(), // create new order with `DH-` + current time
      user: userInfo._id,
      course: courseId,
      total: amount,
      amount: amount,
      coupon,
    });

    if (newOrder?._id) {
      router.push(`/order/${newOrder?.code}`);
    }
  };

  return (
    <Button
      className="w-full"
      variant={'primary'}
      onClick={handleEnrollCourse}
    >
      Mua khóa học
    </Button>
  );
};

export default ButtonEnroll;
