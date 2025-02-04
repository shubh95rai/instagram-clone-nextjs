import { getSessionEmail } from "@/actions/actions";
import PostsGrid from "@/components/PostsGrid";
import { prisma } from "@/utils/prismaClient";

export default async function ProfilePage() {
  const sessionEmail = await getSessionEmail();
  const sessionUser = await prisma.user.findFirst({
    where: {
      email: sessionEmail,
    },
  });

  const posts = await prisma.post.findMany({
    where: {
      authorId: sessionUser?.id,
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
