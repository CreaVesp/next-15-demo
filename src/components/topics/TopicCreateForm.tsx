'use client'

import {useActionState, startTransition} from "react";
import {createTopic} from "@/actions";
import {Form} from "@heroui/form";
import {Input} from "@heroui/input";
import {Button} from "@heroui/button";
import {Textarea} from "@heroui/input";
import {Popover, PopoverTrigger, PopoverContent} from "@heroui/popover";

export default function TopicCreateForm() {
    const [formState, action] = useActionState(createTopic, {errors: {}})

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        startTransition(() => action(formData))
    }

    return <Popover placement={'left'}>
        <PopoverTrigger>
            <Button color={'primary'}>Create a Topic</Button>
        </PopoverTrigger>
        <PopoverContent>
            <Form onSubmit={handleSubmit}>
                <div className={'flex flex-col gap-4 p-4 w-80'}>
                    <h3 className={'text-lg'}>Create a Topic</h3>
                    <Input
                        name={'name'}
                        label={'Name'}
                        labelPlacement={'outside'}
                        placeholder={'Name'}
                        isInvalid={!!formState.errors?.name}
                        errorMessage={formState.errors?.name?.join('. ')}
                    />
                    <Textarea
                        name={'description'}
                        label={'Description'}
                        labelPlacement={'outside'}
                        placeholder={'Describe your topic'}
                        isInvalid={!!formState.errors?.description}
                        errorMessage={formState.errors?.description?.join('. ')}
                    />
                    <Button type={'submit'} color={'primary'}>Submit</Button>
                </div>
            </Form>
        </PopoverContent>
    </Popover>
}