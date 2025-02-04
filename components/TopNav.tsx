import { IoMdSettings } from "react-icons/io";
import BackButton from "./BackButton";
import Link from "next/link";
import { ReactNode } from "react";

export default function TopNav({
  isMyProfile,
  children,
}: {
  isMyProfile?: boolean;
  children: string | ReactNode;
}) {
  return (
    <div className="relative flex h-10 items-center justify-between text-2xl">
      <BackButton />
      <div className="absolute left-1/2 flex -translate-x-1/2 items-center gap-1 text-xl font-bold md:text-2xl">
        {children}
      </div>
      {isMyProfile && (
        <Link href={"/settings"}>
          <IoMdSettings />
        </Link>
      )}
    </div>
  );
}
