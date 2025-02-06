import Link from 'next/link';
import {Navbar, NavbarBrand, NavbarContent, NavbarItem} from '@heroui/navbar';
import {Input} from "@heroui/input";
import HeaderAuth from "@/components/HeaderAuth";

export default async function Header() {

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
            <HeaderAuth />
        </NavbarContent>
    </Navbar>
}