'use server';

import * as auth from '@/auth';

export async function signIn() {
    // This function receives a provider name (which was defined in auth.ts) in NextAuth instance
    return auth.signIn('github')
}