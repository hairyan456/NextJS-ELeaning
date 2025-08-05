'use client';

import useQueryString from "@/hooks/useQueryString";
import { useSearchParams } from "next/navigation";

const CommentSorting = () => {
    const { createQueryString } = useQueryString();
    const params = useSearchParams();
    const sortValue = params.get("sort");
    const handleSortComment = () => {
        createQueryString("sort", sortValue === "recent" ? "oldest" : "recent");
    }
    return (
        <button type="button" className='flex items-center gap-2 text-sm font-medium' onClick={handleSortComment}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5 7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5" />
            </svg>
            <span>{sortValue !== "recent" ? "Oldest" : "Most recent"}</span>
        </button>
    );
};

export default CommentSorting;