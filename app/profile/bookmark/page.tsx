import { getSessionEmail } from "@/actions/actions";
import PostsGrid from "@/components/PostsGrid";
import { prisma } from "@/utils/prismaClient";

export default async function Bookmark() {
  const sessionEmail = await getSessionEmail();

  const myBookmarks = await prisma.bookmark.findMany({
    where: {
      user: {
        email: sessionEmail,
      },
    },
  });

  const posts = await prisma.post.findMany({
    where: {
      id: {
        in: myBookmarks.map((b) => {
          return b.postId;
        }),
      },
    },
  });

  return (
    <div className="mt-4">
      {posts.length > 0 ? (
        <PostsGrid posts={posts} />
      ) : (
        <div className="mt-4">
          <p className="text-center font-semibold text-gray-500">
            No bookmarks to show.
          </p>
        </div>
      )}
    </div>
  );
}
