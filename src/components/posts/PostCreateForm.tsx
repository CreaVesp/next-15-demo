'use client';

import {useActionState} from "react";
import {Input, Textarea} from "@heroui/input";
import {Button} from "@heroui/button";
import {Popover, PopoverTrigger, PopoverContent} from "@heroui/popover";
import {createPost} from "@/actions";
import FormButton from "@/components/common/FormButton";

interface PostCreateFormProps {
    slug: string
}

export default function PostCreateForm({slug}: PostCreateFormProps) {
    // bind passes the slug as the 1st arg
    const [formState, action, isPending] = useActionState(createPost.bind(null, slug), {errors: {}})

    return (
        <Popover placement={'left'}>
            <PopoverTrigger>
                <Button color={'primary'}>Create a Post</Button>
            </PopoverTrigger>
            <PopoverContent>
                <form action={action}>
                    <div className={'flex flex-col gap-4 p-4 w-80'}>
                        <h3 className={'text-lg'}>Create a Post</h3>
                        <Input
                            name={'title'}
                            label={'Title'}
                            labelPlacement={'outside'}
                            placeholder={'Title'}
                            isInvalid={!!formState?.errors?.title}
                            errorMessage={formState?.errors?.title?.join('. ')}
                        />
                        <Textarea
                            name={'content'}
                            label={'Content'}
                            labelPlacement={'outside'}
                            placeholder={'Content'}
                            isInvalid={!!formState?.errors?.content}
                            errorMessage={formState?.errors?.content?.join('. ')}
                        />
                        {
                            formState.errors?._form
                                ? <div className={'rounded-xl p-2 bg-red-200 border border-red-400'}>
                                    {formState?.errors?._form?.join('. ')}
                                </div>
                                : null
                        }
                        <FormButton isLoading={isPending}>Create Post</FormButton>
                    </div>
                </form>
            </PopoverContent>
        </Popover>
    )
}