import { Follow, Profile } from "@prisma/client";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import Image from "next/image";
import FollowButton from "./FollowButton";
import TopNav from "./TopNav";

export default function ProfilePageInfo({
  profile,
  isMyProfile,
  myFollow,
}: {
  profile: Profile;
  isMyProfile?: boolean;
  myFollow?: Follow | null;
}) {
  return (
    <div>
      <TopNav isMyProfile={isMyProfile}>
        {profile.username}
        <RiVerifiedBadgeFill className="text-sky-600" />
      </TopNav>
      <section className="mt-8 flex justify-center">
        <div className="rounded-full bg-gradient-to-tr from-amber-500 to-fuchsia-600 p-2">
          <div className="rounded-full bg-white p-2 dark:bg-neutral-900">
            <Image
              src={profile.avatar || ""}
              alt="display picture"
              width={500}
              height={500}
              priority
              className="aspect-square size-48 rounded-full object-cover"
            ></Image>
          </div>
        </div>
      </section>
      <section className="mt-4 space-y-1 text-center">
        <h1 className="text-xl font-bold">{profile.name}</h1>
        <p className="text-gray-500">Personal account</p>
        <p>{profile.subtitle}</p>
        <p>{profile.bio}</p>
        <div>
          {!isMyProfile && (
            <FollowButton
              profileToFollowId={profile.userId}
              myFollow={myFollow}
            />
          )}
        </div>
      </section>
    </div>
  );
}
