import { ReactNode } from "react";
import { getSessionEmail, getSessionId } from "@/actions/actions";
import { prisma } from "@/utils/prismaClient";
import ProfilePageContent from "@/components/ProfilePageContent";

type Params = Promise<{ username: string }>;

export default async function UserProfileLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Params;
}) {
  const { username } = await params;

  const sessionEmail = await getSessionEmail();
  const sessionId = await getSessionId();

  const profile = await prisma.profile.findFirstOrThrow({
    where: {
      username,
    },
  });

  const myFollow = await prisma.follow.findFirst({
    where: {
      followerId:sessionId,
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
