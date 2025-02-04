import { auth } from "@/auth";
import LoggedInUserHome from "@/components/LoggedInUserHome";


export default async function Home() {
  const session = await auth();

  return (
    <main>
      {session && <LoggedInUserHome />}

      {/* {!session && (
        <form
          action={signInAction}
          className="flex min-h-[calc(100vh-88px)] items-center justify-center"
        >
          <Button>
            <FaGoogle /> Log in with Google
          </Button>
        </form>
      )} */}
    </main>
  );
}
