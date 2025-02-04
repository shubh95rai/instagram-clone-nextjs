"use client";

import { bookmarkAction, unbookmarkAction } from "@/actions/actions";
import { Bookmark, Post } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { GoBookmark } from "react-icons/go";
import { GoBookmarkFill } from "react-icons/go";

export default function BookmarkInfo({
  post,
  sessionBookmark,
}: {
  post: Post;
  sessionBookmark: Bookmark | null;
}) {
  const [bookmarkedByMe, setBookmarkedByMe] = useState(!!sessionBookmark);
  const router = useRouter();

  async function handleSubmit(formData: FormData) {
    if (bookmarkedByMe) {
      await unbookmarkAction(formData);
    } else {
      await bookmarkAction(formData);
    }
    setBookmarkedByMe((prev) => !prev);
    router.refresh();
  }
  return (
    <div>
      <form action={handleSubmit}>
        <button>
          {bookmarkedByMe ? <GoBookmarkFill size={24}/> : <GoBookmark size={24} />}
        </button>
        <input type="hidden" name="postId" value={post.id} />
      </form>
    </div>
  );
}
