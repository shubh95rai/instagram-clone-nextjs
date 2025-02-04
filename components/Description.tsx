"use client";

import { Post, Profile } from "@prisma/client";
import Avatar from "./Avatar";
import OptionButton from "./OptionButton";
import { Input } from "./ui/input";
import { useState } from "react";
import { editDescriptionAction } from "@/actions/actions";

export default function Description({
  post,
  authorProfile,
  sessionEmail,
}: {
  post: Post;
  authorProfile: Profile | null;
  sessionEmail: string;
}) {
  const [editFlag, setEditFlag] = useState(false);
  const [description, setDescription] = useState(post.description);

  async function handleEditDescription(formdata: FormData) {
    await editDescriptionAction(formdata);
    setEditFlag(false);
  }
  return (
    <div className="flex gap-4 rounded-md bg-gray-100 p-4 shadow dark:bg-neutral-800">
      <div>
        <Avatar src={authorProfile?.avatar || ""} />
      </div>

      <div className="flex-1">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold">{authorProfile?.name}</h3>
            <p className="text-sm text-gray-500">@{authorProfile?.username}</p>
          </div>
          {sessionEmail === authorProfile?.email && (
            <OptionButton post={post} setEditFlag={setEditFlag} />
          )}
        </div>
        {editFlag ? (
          <form action={handleEditDescription} className="mt-2">
            <Input
              className="bg-neutral-900"
              name="description"
              value={description || ""}
              autoFocus
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
            <input type="hidden" name="postId" value={post.id} />
          </form>
        ) : (
          <p className="mt-2">{post.description}</p>
        )}
        <div className="mt-2 space-x-1 text-right text-xs text-gray-400">
          <span>
            {post.createdAt.toLocaleDateString("en-gb", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </span>
          <span>·</span>
          <span suppressHydrationWarning>
            {post.createdAt.toLocaleTimeString([], {
              timeStyle: "short",
              timeZone: "Asia/Kolkata",
            })}
          </span>
        </div>
      </div>
    </div>
  );
}
