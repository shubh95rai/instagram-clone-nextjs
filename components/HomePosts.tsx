import { prisma } from "@/utils/prismaClient";
import { Profile } from "@prisma/client";
import { getSessionEmail } from "@/actions/actions";
import HomePostsContent from "./HomePostsContent";

export default async function HomePosts({
  followedProfiles,
}: {
  followedProfiles: Profile[];
}) {
  const sessionEmail = await getSessionEmail();

  const sessionProfile = await prisma.profile.findFirst({
    where: {
      email: sessionEmail,
    },
  });

  const profiles = [...followedProfiles, sessionProfile] as Profile[];

  const profilesEmails = [
    ...followedProfiles.map((f) => {
      return f.email as string;
    }),
    sessionEmail,
  ];

  const posts = await prisma.post.findMany({
    where: {
      author: {
        // in: followedProfiles.map((f) => {
        //   return f.email;
        // }),
        email: {
          in: profilesEmails,
        },
      },
    },
    include: {
      likes: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 100,
  });

  const myLikes = await prisma.like.findMany({
    where: {
      author: {
        email: sessionEmail,
      },
      postId: {
        in: posts.map((p) => {
          return p.id;
        }),
      },
    },
  });

  const myBookmarks = await prisma.bookmark.findMany({
    where: {
      user: {
        email: sessionEmail,
      },
      postId: {
        in: posts.map((p) => {
          return p.id;
        }),
      },
    },
  });

  return (
    <div className="mt-8 flex flex-col gap-8 border-t-2 pb-16 pt-8">
      <HomePostsContent
        posts={posts}
        profiles={profiles}
        myLikes={myLikes}
        myBookmarks={myBookmarks}
      />
    </div>
  );
}
