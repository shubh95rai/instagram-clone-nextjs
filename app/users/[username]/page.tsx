import PostsGrid from "@/components/PostsGrid";
import { prisma } from "@/utils/prismaClient";

type Params = Promise<{ username: string }>;

export default async function UserProfilePage({ params }: { params: Params }) {
  const { username } = await params;

  const profile = await prisma.profile.findFirstOrThrow({
    where: {
      username,
    },
  });

  const posts = await prisma.post.findMany({
    where: {
      author: {
        email: profile.email,
      },
    },
  });

  return (
    <div className="mt-4">
      {posts.length > 0 ? (
        <PostsGrid posts={posts} />
      ) : (
        <p className="text-center font-semibold text-gray-500">
          No posts to show.
        </p>
      )}
    </div>
  );
}
