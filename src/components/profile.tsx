'use client';
import {useSession} from "next-auth/react";

export default function Profile() {
    const session = useSession()

    return session?.data?.user
        ? <div>From client component: UserID - {JSON.stringify(session.data.user.id)}</div>
        : <div>From client component: user is signed out</div>
}