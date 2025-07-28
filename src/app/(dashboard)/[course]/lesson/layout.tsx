import PageNotFound from "@/app/not-found";
import { getUserInfo } from "@/lib/actions/user.actions";
import { auth } from "@clerk/nextjs/server";
import { Suspense } from "react";
import LoadingPlayer from "./@player/LoadingPlayer";
import LoadingOutline from "./@outline/LoadingOutline";

const Layout = async ({ player, outline }: { player: React.ReactNode; outline: React.ReactNode; }) => {
    // Authenticate user
    const { userId } = await auth();
    if (!userId) return <PageNotFound />;
    const findUser = await getUserInfo({ userId: userId || "" });
    if (!findUser?._id) return <PageNotFound />;

    return (
        <div className="block xl:grid xl:grid-cols-[minmax(0,2fr),minmax(0,1fr)] gap-10 min-h-screen items-start">
            <Suspense fallback={<LoadingPlayer />}>{player}</Suspense>
            <Suspense fallback={<LoadingOutline />}>{outline}</Suspense>
        </div>
    );
};

export default Layout;