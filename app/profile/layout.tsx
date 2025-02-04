import { ReactNode } from "react";
import { getSessionEmail, getSessionId } from "@/actions/actions";
import ProfilePageContent from "@/components/ProfilePageContent";
import { prisma } from "@/utils/prismaClient";
import { redirect } from "next/navigation";

export default async function ProfileLayout({
  children,
}: {
  children: ReactNode;
}) {
  const sessionEmail = await getSessionEmail();
  const sessionId = await getSessionId();

  const profile = await prisma.profile.findFirst({
    where: {
      email: sessionEmail,
    },
  });

  if (!profile) {
    redirect("/settings");
  }

  const myFollow = await prisma.follow.findFirst({
    where: {
      followerId: sessionId,
      followingId: profile.id,
    },
  });

  return (
    <div>
      <ProfilePageContent
        profile={profile}
        myFollow={myFollow}
        isMyProfile={sessionEmail === profile.email}
      />

      {children}
    </div>
  );
}
