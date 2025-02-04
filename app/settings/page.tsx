import { signOutAction } from "@/actions/actions";
import { auth } from "@/auth";
import SettingsForm from "@/components/SettingsForm";
import { Button } from "@/components/ui/button";
import { LuLogOut } from "react-icons/lu";

import { prisma } from "@/utils/prismaClient";
import BackButton from "@/components/BackButton";
import { ModeToggle } from "@/components/ModeToggle";

export default async function SettingPage() {
  const session = await auth();
  const email = session?.user?.email as string;

  const profile = await prisma.profile.findFirst({
    where: {
      email,
    },
  });

  return (
    <div>
      <section className="relative flex h-10 items-center justify-between text-2xl">
        <BackButton />
        <div className="absolute left-1/2 -translate-x-1/2 text-center">
          <h1 className="mt-2 text-xl font-bold md:text-2xl">
            Profile Settings
          </h1>
          <p className="mt-1 text-xs text-neutral-500 md:text-sm">{email}</p>
        </div>

        <div className="flex gap-1">
          {/* <ThemeToggle /> */}
          <ModeToggle />
          <form action={signOutAction}>
            <Button variant={"outline"}>
              <LuLogOut />
              <p className="hidden md:block">Logout</p>
            </Button>
          </form>
        </div>
      </section>
      <section className="mx-auto mt-10 max-w-md">
        <SettingsForm profile={profile} />
      </section>
    </div>
  );
}
