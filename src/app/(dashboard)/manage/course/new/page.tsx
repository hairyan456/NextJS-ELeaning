import CourseAddNewForm from '@/components/course/CourseAddNewForm';
import Heading from '@/components/typography/Heading';
import { getUserInfo } from '@/lib/actions/user.actions';
import { auth } from '@clerk/nextjs/server';

const page = async () => {
    const { userId } = await auth();
    if (!userId)
        return null;
    const mongoUser = await getUserInfo({ userId });
    if (!mongoUser)
        return null;
    return (
        <div>
            <Heading>Tạo khóa học mới</Heading>
            <CourseAddNewForm
                user={JSON.parse(JSON.stringify(mongoUser))}
            />
        </div>
    );
};

export default page;