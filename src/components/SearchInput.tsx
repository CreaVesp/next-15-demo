'use client';

import {search} from "@/actions";
import {useSearchParams} from "next/navigation";
import {Input} from "@heroui/input";

export default function SearchInput() {
    const searchParams = useSearchParams()

    // This component is using searchParams hook
    // So it must be wrapped in <Suspense/> in parent component.

    return <form action={search}>
        <Input name={'term'} defaultValue={searchParams.get('term') ?? ''}/>
    </form>
}