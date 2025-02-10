'use server';

import {z} from 'zod'

const createTopicSchema = z.object({
    name: z.string().min(3, {message: 'Must be at least 3 characters'}).regex(/^[a-z-]+$/, {message: 'Must be lowercase letters or dashes without spaces'}),
    description: z.string().min(10, {message: 'Must be at least 10 characters'})
})

interface CreateTopicFormState {
    errors: {
        name?: string[],
        description?: string[]
    }
}

export async function createTopic(
    formState: CreateTopicFormState,
    formData: FormData
): Promise<CreateTopicFormState> {
    const result = createTopicSchema.safeParse({
        name: formData.get('name'),
        description: formData.get('description')}
    )
    if (!result.success) {
        return {
            errors: result.error.flatten().fieldErrors
        }
    }
    return {
        errors: {}
    }
    // TODO: revalidate homepage after creating new topic
}