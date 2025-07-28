import PageNotFound from "@/app/not-found";
import { getUserInfo } from "@/lib/actions/user.actions";
import { auth } from "@clerk/nextjs/server";
import { Suspense } from "react";
import LoadingPlayer from "./@player/LoadingPlayer";
import LoadingOutline from "./@outline/LoadingOutline";
import LessonWrapper from "./LessonWrapper";

const Layout = async ({ player, outline }: { player: React.ReactNode; outline: React.ReactNode; }) => {
    // Authenticate user
    const { userId } = await auth();
    if (!userId) return <PageNotFound />;
    const findUser = await getUserInfo({ userId: userId || "" });
    if (!findUser?._id) return <PageNotFound />;

    return (
        <LessonWrapper>
            <Suspense fallback={<LoadingPlayer />}>{player}</Suspense>
            <Suspense fallback={<LoadingOutline />}>{outline}</Suspense>
        </LessonWrapper>
    );
};

export default Layout;