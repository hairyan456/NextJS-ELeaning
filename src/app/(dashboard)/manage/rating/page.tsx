import { getAllRatings } from '@/lib/actions/rating.action';
import RatingManage from './RatingManage';

const page = async () => {
    const ratings = await getAllRatings();
    return (
        <RatingManage
            ratings={ratings || []}
        />
    );
};

export default page;