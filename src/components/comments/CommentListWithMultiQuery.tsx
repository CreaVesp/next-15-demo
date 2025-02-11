import {cachedFetchCommentsByPostId} from "@/db/queries/comments";
import CommentShowWithQuery from "@/components/comments/CommentShowWithQuery";

interface CommentListProps {
    postId: string
}

export default async function CommentListWithMultiQuery({postId}: CommentListProps) {
    const comments = await cachedFetchCommentsByPostId(postId);

    const topLevelComments = comments.filter(
        (comment) => comment.parentId === null
    );
    const renderedComments = topLevelComments.map((comment) => {
        return (
            <CommentShowWithQuery
                key={comment.id}
                commentId={comment.id}
                postId={postId}
            />
        );
    });

    return (
        <div className="space-y-3">
            <h1 className="text-lg font-bold">All {comments.length} comments</h1>
            {renderedComments}
        </div>
    );
}
