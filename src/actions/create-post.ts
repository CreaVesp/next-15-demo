'use server';

import type {Post} from "@prisma/client";
import {revalidatePath} from "next/cache";
import {redirect} from "next/navigation";
import {z} from 'zod';
import {auth} from "@/auth";
import {db} from "@/db";
import paths from "@/paths";

const createPostSchema = z.object({
    title: z.string().min(3),
    content: z.string().min(10)
})

interface CreatePostFormState {
    errors: {
        title?: string[],
        content?: string[],
        _form?: string[]
    }
}

export async function createPost(
    slug: string,
    formState: CreatePostFormState,
    formData: FormData
): Promise<CreatePostFormState> {
    const session = await auth()
    if (!session || !session.user || !session.user.id) {
        return {
            errors: {
                _form: ['You must be signed in']
            }
        }
    }

    const result = createPostSchema.safeParse({
        title: formData.get('title'),
        content: formData.get('content')
    })

    if (!result.success) {
        return {
            errors: result.error.flatten().fieldErrors
        }
    }

    let post: Post
    try {
        const topic = await db.topic.findFirst({
            where: {slug},
            select: {id: true}
        })

        if (!topic) {
            throw new Error('Topic not found')
        }

        post = await db.post.create({
            data: {
                title: result.data.title,
                content: result.data.content,
                userId: session.user.id,
                topicId: topic.id
            }
        })
    } catch (e) {
        if (e instanceof Error) {
            return {
                errors: {_form: [e.message]}
            }
        } else {
            return {
                errors: {_form: ['Something went wrong']}
            }
        }
    }

    revalidatePath(paths.topicShow(slug))
    redirect(paths.postShow(slug, post.id))
}