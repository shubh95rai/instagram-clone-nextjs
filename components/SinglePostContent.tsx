import { getSessionEmail } from "@/actions/actions";
import BookmarkInfo from "@/components/BookmarkInfo";
import Comment from "@/components/Comment";
import CommentForm from "@/components/CommentForm";
import Description from "@/components/Description";
import LikesInfo from "@/components/LikesInfo";
import { prisma } from "@/utils/prismaClient";
import Image from "next/image";
import TopNav from "./TopNav";

export default async function SinglePostContent({
  postId,
}: {
  postId: string;
}) {
  const sessionEmail = await getSessionEmail();

  const post = await prisma.post.findFirstOrThrow({
    where: { id: postId },
  });

  const authorProfile = await prisma.profile.findFirst({
    where: { userId: post.authorId },
  });

  const comments = await prisma.comment.findMany({
    where: {
      postId,
    },
  });

  const allAuthorsId = comments.map((comment) => {
    return comment.authorId;
  });

  const uniqueAuthorsId = [...new Set(allAuthorsId)];

  const profileOfAuthors = await prisma.profile.findMany({
    where: {
      userId: { in: uniqueAuthorsId },
    },
  });

  const sessionLike = await prisma.like.findFirst({
    where: {
      author: {
        email: sessionEmail,
      },
      postId: post.id,
    },
  });

  const sessionBookmark = await prisma.bookmark.findFirst({
    where: {
      user: {
        email: sessionEmail,
      },
      postId: post.id,
    },
  });

  const postLikes = await prisma.like.count({
    where: {
      postId: post.id,
    },
  });

  return (
    <main className="mx-auto max-w-md rounded-md pb-10 md:max-w-4xl">
      <TopNav>Post</TopNav>
      <div className="mt-8 grid items-start gap-4 md:grid-cols-2">
        <section className="flex flex-col justify-between rounded-md bg-gray-100 p-4 shadow dark:bg-neutral-800">
          <div className="my-auto flex aspect-square size-full items-center">
            <Image
              src={post.imageUrl}
              alt="image"
              width={500}
              height={500}
              className="size-full object-contain"
              priority
            />
          </div>
          <div className="mt-4 flex justify-between border-t-2 border-neutral-700 pt-4">
            <LikesInfo
              post={post}
              postLikes={postLikes}
              sessionLike={sessionLike}
            />
            <BookmarkInfo post={post} sessionBookmark={sessionBookmark} />
          </div>
        </section>
        <section>
          <div className="flex flex-col gap-4">
            <Description
              post={post}
              authorProfile={authorProfile}
              sessionEmail={sessionEmail}
            />

            <div className="rounded-md bg-gray-100 p-4 shadow dark:bg-neutral-800">
              <CommentForm postId={postId} />

              {comments.map((comment) => {
                return (
                  <Comment
                    key={comment.id}
                    comment={comment.text}
                    createdAt={comment.createdAt}
                    authorProfile={profileOfAuthors.find((author) => {
                      return author.userId === comment.authorId;
                    })}
                  />
                );
              })}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
