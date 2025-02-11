import type {Comment} from "@prisma/client";
import {cache} from "react";
import {db} from "@/db";

export type CommentWithAuthor = (Comment & {user: {name: string | null, image: string | null}})

export function fetchCommentsByPostId(postId: string): Promise<CommentWithAuthor[]> {
    return db.comment.findMany({
        where: {postId},
        include: {user: {select: {name: true, image: true}}}
    })
}

/* if the function argument is the same for several invocations,
then the result will be cached and the actual call to a db will be only performed once.
*/
export const cachedFetchCommentsByPostId = cache(
    (postId: string): Promise<CommentWithAuthor[]> => {
        console.log('fetching comments')
        return db.comment.findMany({
            where: {postId},
            include: {user: {select: {name: true, image: true}}}
        })
    }
)