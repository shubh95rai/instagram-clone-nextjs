"use client";

import { Follow } from "@prisma/client";
import { Button } from "./ui/button";
import { FaUserMinus, FaUserPlus } from "react-icons/fa";
import { useState } from "react";
import { followUserAction, unfollowUserAction } from "@/actions/actions";
import { useRouter } from "next/navigation";

export default function FollowButton({
  profileToFollowId,
  myFollow,
}: {
  profileToFollowId: string;
  myFollow?: Follow | null;
}) {
  const [isFollwing, setIsFollowing] = useState(!!myFollow);

  const router = useRouter();

  async function handleSubmit() {
    if (isFollwing) {
      await unfollowUserAction(profileToFollowId);
    } else {
      await followUserAction(profileToFollowId);
    }

    setIsFollowing((prev) => !prev);
    router.refresh();
  }
  return (
    <form action={handleSubmit}>
      <Button className="mt-2 px-6 py-5">
        {isFollwing ? <FaUserMinus /> : <FaUserPlus />}
        {isFollwing ? "Unfollow" : "Follow"}
      </Button>
    </form>
  );
}
