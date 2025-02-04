import HomeTopRow from "./HomeTopRow";
import { getSessionId } from "@/actions/actions";
import { prisma } from "@/utils/prismaClient";
import HomePosts from "./HomePosts";

export default async function LoggedInUserHome() {
  const sessionId = await getSessionId();
  const myFollows = await prisma.follow.findMany({
    where: {
      followerId: sessionId,
    },
  });

  const followedProfiles = await prisma.profile.findMany({
    where: {
      userId: {
        in: myFollows.map((f) => {
          return f.followingId;
        }),
      },
    },
  });

  return (
    <div>
      <HomeTopRow followedProfiles={followedProfiles} />
      <HomePosts followedProfiles={followedProfiles} />
    </div>
  );
}
