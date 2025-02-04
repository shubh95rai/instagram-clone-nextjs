import { Profile } from "@prisma/client";
import Avatar from "./Avatar";

export default function Comment({
  comment,
  authorProfile,
  createdAt,
}: {
  comment: string;
  authorProfile?: Profile;
  createdAt: Date;
}) {
  return (
    <div className="mt-4 flex gap-4 border-t-2 border-neutral-700 pt-4">
      <div>
        <Avatar src={authorProfile?.avatar || ""} />
      </div>
      <div className="flex-1">
        <div className="flex gap-2">
          <h3 className="font-semibold">{authorProfile?.name}</h3>
          <p className="text-sm text-gray-500">@{authorProfile?.username}</p>
        </div>

        <p className="mt-2">{comment}</p>
        <div className="mt-2 space-x-1 text-right text-xs text-gray-400">
          <span>
            {createdAt.toLocaleDateString("en-gb", {
              year: "numeric",
              month: "short",
              day: "numeric",
              
            })}
          </span>
          <span>·</span>
          <span>
            {createdAt.toLocaleTimeString([], {
              timeStyle: "short",
              timeZone: "Asia/Kolkata",
            })}
          </span>
        </div>
      </div>
    </div>
  );
}
