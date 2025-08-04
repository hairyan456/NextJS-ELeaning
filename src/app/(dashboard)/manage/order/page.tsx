
import { EOrderStatus } from "@/types/enums";
import OrderManage from "./OrderManage";
import { fetchOrders } from "@/lib/actions/order.action";
import { ITEMS_PER_PAGE } from "@/constants";

const page = async ({
    searchParams,
}: {
    searchParams: {
        page: number;
        search: string;
        status: EOrderStatus;
    };
}) => {
    const data = await fetchOrders({
        page: searchParams.page || 1,
        limit: ITEMS_PER_PAGE,
        search: searchParams.search,
        status: searchParams.status,
    });
    if (!data) return null;
    const { orders, total } = data;
    const totalPages = Math.ceil(total / ITEMS_PER_PAGE);

    return (
        <OrderManage
            orders={orders ? JSON.parse(JSON.stringify(orders)) : []}
            totalPages={totalPages}
        />
    );
};

export default page;