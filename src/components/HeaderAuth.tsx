'use client';
import {useSession} from "next-auth/react";
import {signIn, signOut} from "@/actions";
import {NavbarItem} from '@heroui/navbar';
import {Button} from "@heroui/button";
import {Avatar} from "@heroui/avatar";
import {Popover, PopoverTrigger, PopoverContent} from "@heroui/popover";

export default function HeaderAuth() {
    const session = useSession()

    return session.status === 'loading'
        ? null
        : session?.data?.user
        ? <Popover placement={'left'}>
            <PopoverTrigger>
                <Avatar src={session.data?.user?.image || ''}/>
            </PopoverTrigger>
            <PopoverContent>
                <div className={'p-4 flex flex-col gap-2'}>
                    <div className={'flex gap-4 align-middle justify-between w-full'}>
                        <Avatar src={session.data?.user?.image || ''}/>
                        <div className={'flex flex-col gap-1'}>
                            <div className={'font-bold'}>{session.data?.user.name ?? ''}</div>
                            <div>{session.data?.user.email ?? ''}</div>
                        </div>
                    </div>
                    <form action={signOut}>
                        <Button type={'submit'}>Sign Out</Button>
                    </form>
                </div>
            </PopoverContent>
        </Popover>
        : <>
            <NavbarItem>
                <form action={signIn}>
                    <Button type={'submit'} color={'secondary'} variant={'bordered'}>
                        Sign In
                    </Button>
                </form>
            </NavbarItem>
            <NavbarItem>
                <form action={signIn}>
                    <Button type={'submit'} color={'primary'} variant={'flat'}>
                        Sign Up
                    </Button>
                </form>
            </NavbarItem>
        </>
}