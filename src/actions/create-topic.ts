'use server';

import type {Topic} from "@prisma/client";
import {redirect} from "next/navigation";
import {revalidatePath} from "next/cache";
import {z} from 'zod'
import {auth} from "@/auth";
import {db} from "@/db";
import paths from "@/paths";

const createTopicSchema = z.object({
    name: z.string().min(3, {message: 'Must be at least 3 characters'}).regex(/^[a-z-]+$/, {message: 'Must be lowercase letters or dashes without spaces'}),
    description: z.string().min(10, {message: 'Must be at least 10 characters'})
})

interface CreateTopicFormState {
    errors: {
        name?: string[],
        description?: string[],
        _form?: string[]
    }
}

export async function createTopic(
    formState: CreateTopicFormState,
    formData: FormData
): Promise<CreateTopicFormState> {
    // if user is not logged in, throw error message
    const session = await auth()
    if (!session || !session.user) {
        return {
            errors: {
                _form: ['You must be signed in to create a topic']
            }
        }
    }

    // parse formdata with zod and validate
    const result = createTopicSchema.safeParse({
        name: formData.get('name'),
        description: formData.get('description')}
    )

    // if validation fails, return list of errors
    // flatten().fieldErrors returns an object with field names as keys and array of messages as values
    if (!result.success) {
        return {
            errors: result.error.flatten().fieldErrors
        }
    }

    // try to save it to db
    let topic: Topic
    try {
        topic = await db.topic.create({
            data: {
                slug: result.data.name,
                description: result.data.description
            }
        })
    } catch (e: unknown) {
        if (e instanceof Error) {
            return {errors: {_form: [e.message]}}
        } else {
            return {errors: {_form: ['Something went wrong']}}
        }
    }

    // revalidate main page and redirect to created topic view page
    revalidatePath('/')
    redirect(paths.topicShow(topic.slug))
}