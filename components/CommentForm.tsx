import { auth } from "@/auth";
import { Textarea } from "./ui/textarea";
import { prisma } from "@/utils/prismaClient";
import Avatar from "./Avatar";
import { Button } from "./ui/button";
import { postCommentAction } from "@/actions/actions";

export default async function CommentForm({ postId }: { postId: string }) {
  const session = await auth();
  const userEmail = session?.user?.email as string;

  const profile = await prisma.profile.findFirstOrThrow({
    where: {
      email: userEmail,
    },
  });

  return (
    <div>
      <form className="flex gap-4" action={postCommentAction}>
        <input type="hidden" name="postId" value={postId} />
        <div>
          <Avatar src={profile.avatar || ""} />
        </div>
        <div className="flex flex-1 flex-col items-end gap-4">
          <Textarea
            name="comment"
            placeholder="Tell me what you think"
            className="resize-none bg-background"
          />
          <Button>Post Comment</Button>
        </div>
      </form>
    </div>
  );
}
