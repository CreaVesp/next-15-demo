import {fetchCommentsByPostId} from "@/db/queries/comments";
import Link from "next/link";
import PostShow from "@/components/posts/PostShow";
import CommentList from "@/components/comments/CommentList";
import CommentCreateForm from "@/components/comments/CommentCreateForm";
import paths from "@/paths";
import type {Metadata} from "next";
// import CommentListWithMultiQuery from "@/components/comments/CommentListWithMultiQuery";

export const metadata: Metadata = {
    title: "Post page",
    description: "Selected post",
    keywords: ['topic', 'post', 'comments'],
};

interface PostShowPageProps {
    params: Promise<{
        slug: string;
        postId: string;
    }>;
}

export default async function PostShowPage({params}: PostShowPageProps) {
    const {slug, postId} = await params;

    return (
        <div className="space-y-3">
            <Link className="underline decoration-solid" href={paths.topicShow(slug)}>
                {"< "}Back to {slug}
            </Link>
            <PostShow postId={postId}/>
            <CommentCreateForm postId={postId} startOpen/>
            <CommentList fetchData={() => fetchCommentsByPostId(postId)}/>
            {/*<CommentListWithMultiQuery postId={postId}/>*/}
        </div>
    );
}
