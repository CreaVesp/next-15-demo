import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import {PrismaAdapter} from "@auth/prisma-adapter";
import {db} from '@/db';

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET

if (!GITHUB_CLIENT_ID || !GITHUB_CLIENT_SECRET) {
    throw new Error('Missing GITHUB oatuh credentials');
}

export const {handlers: {GET, POST}, auth, signOut, signIn} = NextAuth({
    adapter: PrismaAdapter(db),
    providers: [
        GitHub({
            clientId: GITHUB_CLIENT_ID,
            clientSecret: GITHUB_CLIENT_SECRET,
        }),
    ],
    callbacks: {
        // if there is a bug with the session, this will fix it
        async session({session, user}) {
            if (session && user && (!session?.user?.id || session?.user?.id !== user?.id)) {
                session.user.id = user.id
            }
            return session
        }
    }
})