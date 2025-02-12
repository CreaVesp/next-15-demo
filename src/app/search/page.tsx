import {redirect} from "next/navigation";
import {searchPosts} from "@/db/queries/posts";
import PostList from "@/components/posts/PostList";

interface SearchProps {
    searchParams: Promise<{term: string}>
}

export default async function Search({searchParams}: SearchProps) {
    const {term} = await searchParams

    if (!term) {
        redirect('/')
    }

    return <div>
        <PostList fetchData={() => searchPosts(term)}/>
    </div>
}