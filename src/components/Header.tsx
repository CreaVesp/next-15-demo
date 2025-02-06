import {auth} from "@/auth";
import {signIn, signOut} from "@/actions";
import Link from 'next/link';
import {Navbar, NavbarBrand, NavbarContent, NavbarItem} from '@heroui/navbar';
import {Input} from "@heroui/input";
import {Button} from "@heroui/button";
import {Avatar} from "@heroui/avatar";
import {Popover, PopoverTrigger, PopoverContent} from "@heroui/popover";

export default async function Header() {
    const session = await auth()
    let authContent: React.ReactNode

    if (session?.user) {
        authContent = <Popover placement={'left'}>
            <PopoverTrigger>
                <Avatar src={session?.user?.image || ''}/>
            </PopoverTrigger>
            <PopoverContent>
                <div className={'p-4 flex flex-col gap-2'}>
                    <div className={'flex gap-4 align-middle justify-between w-full'}>
                        <Avatar src={session?.user?.image || ''}/>
                        <div className={'flex flex-col gap-1'}>
                            <div className={'font-bold'}>{session.user.name ?? ''}</div>
                            <div>{session.user.email ?? ''}</div>
                        </div>
                    </div>
                    <form action={signOut}>
                        <Button type={'submit'}>Sign Out</Button>
                    </form>
                </div>
            </PopoverContent>
        </Popover>
    } else {
        authContent = <>
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

    return <Navbar className={'shadow mb-6'}>
        <NavbarBrand>
            <Link href={'/'} className={'font-bold'}>Discuss</Link>
        </NavbarBrand>
        <NavbarContent justify={'center'}>
            <NavbarItem>
                <Input />
            </NavbarItem>
        </NavbarContent>
        <NavbarContent justify={'end'}>
            {authContent}
        </NavbarContent>
    </Navbar>
}