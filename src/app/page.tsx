import * as actions from "@/actions";
import {auth} from "@/auth";
import {Button} from "@heroui/button";
import Profile from "@/components/profile";

export default async function Home() {
    const session = await auth()

    return (
        <div>
            <form action={actions.signIn}>
                <Button type={'submit'}>Sign In</Button>
            </form>
            <form action={actions.signOut}>
                <Button type={'submit'}>Sign Out</Button>
            </form>

            {
                session?.user ? <div>Signed In as {JSON.stringify(session.user.name)}</div> :
                    <div>Signed Out</div>
            }
            <Profile/>
        </div>
    );
}
