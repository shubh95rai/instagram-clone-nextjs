import Avatar from "./Avatar";
import { FaPlus } from "react-icons/fa6";
import { Profile } from "@prisma/client";

export default async function HomeTopRow({
  followedProfiles,
}: {
  followedProfiles: Profile[];
}) {
  return (
    <div className="no-scrollbar flex max-w-full gap-2 overflow-x-auto">
      <div>
        <button className="flex size-24 items-center justify-center rounded-full bg-gradient-to-tr from-amber-500 to-fuchsia-600 text-2xl text-white">
          <FaPlus />
        </button>
        <p className="mt-2 text-center text-sm">New Story</p>
      </div>

      {followedProfiles.map((profile) => {
        return (
          <div key={profile.id} className="w-24 flex-shrink-0 text-center">
            <div className="inline-block rounded-full bg-gradient-to-tr from-amber-500 to-fuchsia-600 p-1">
              <div className="rounded-full bg-background p-1">
                <Avatar src={profile.avatar || ""} size={"size-20"} />
              </div>
            </div>
            <p className="mt-[2px] truncate text-center text-sm">
              {profile.username}
            </p>
          </div>
        );
      })}
    </div>
  );
}
