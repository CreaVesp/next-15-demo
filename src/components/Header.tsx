import Link from 'next/link';
import {Navbar, NavbarBrand, NavbarContent, NavbarItem} from '@heroui/navbar';
import HeaderAuth from "@/components/HeaderAuth";
import SearchInput from "@/components/SearchInput";
import {Suspense} from "react";

export default async function Header() {

    // If some of the child components use searchParams hook,
    // it must be wrapped in <Suspense/>. Otherwise, page won't build.

    return <Navbar className={'shadow mb-6'}>
        <NavbarBrand>
            <Link href={'/'} className={'font-bold'}>Discuss</Link>
        </NavbarBrand>
        <NavbarContent justify={'center'}>
            <NavbarItem>
                <Suspense>
                    <SearchInput />
                </Suspense>
            </NavbarItem>
        </NavbarContent>
        <NavbarContent justify={'end'}>
            <HeaderAuth />
        </NavbarContent>
    </Navbar>
}