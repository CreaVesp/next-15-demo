import {Skeleton} from "@heroui/skeleton";

export default function PostShowLoading() {
    return <div className={'m-4'}>
        <div className={'my-2'}>
            <Skeleton className={'h-8 w-48'}/>
        </div>
        <div className={'p-4 border rounded-xl space-y-2'}>
            <Skeleton className={'h-6 w-full'}/>
            <Skeleton className={'h-6 w-1/2'}/>
            <Skeleton className={'h-6 w-1/3'}/>
        </div>
    </div>
}