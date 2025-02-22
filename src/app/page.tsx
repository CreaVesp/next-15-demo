import TopicCreateForm from "@/components/topics/TopicCreateForm";
import TopicsList from "@/components/topics/TopicsList";
import {Divider} from "@heroui/divider";
import PostList from "@/components/posts/PostList";
import {fetchTopPosts} from "@/db/queries/posts";

export default function Home() {
    return <div className={'grid grid-cols-4 gap-4 p-4'}>
        <div className={'col-span-3'}>
            <h1 className={'text-xl m-2'}>Top Posts</h1>
            <PostList fetchData={() => fetchTopPosts()}/>
        </div>
        <div className={'border shadow py-3 px-2 rounded-xl flex flex-col'}>
            <TopicCreateForm />
            <Divider className={'my-2'}/>
            <h3 className={'text-lg'}>Topics</h3>
            <TopicsList />
        </div>
    </div>
}
