"use client";

import { deletePostAction } from "@/actions/actions";
import { Post } from "@prisma/client";
import { useRouter } from "next/navigation";
import { BsThreeDotsVertical } from "react-icons/bs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export default function OptionButton({
  post,
  setEditFlag,
}: {
  post: Post;
  setEditFlag: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const router = useRouter();

  async function handleDelete(formdata: FormData) {
    await deletePostAction(formdata);
    router.back();
  }

  return (
    <button>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <BsThreeDotsVertical />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            onClick={() => {
              setEditFlag((prev: boolean) => {
                return !prev;
              });
            }}
          >
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem>
            <form action={handleDelete}>
              <input type="hidden" name="postId" value={post.id} />
              <button className="flex items-center gap-2">Delete</button>
            </form>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </button>
  );
}
