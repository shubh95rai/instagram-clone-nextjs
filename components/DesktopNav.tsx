import Link from "next/link";
import Image from "next/image";
import {
  GoHome,
  GoPerson,
  GoPlusCircle,
  GoRows,
  GoSearch,
} from "react-icons/go";

export default function DesktopNav() {
  return (
    <nav className="hidden min-h-screen max-w-52 border-r-2 p-4 lg:block">
      <div className="sticky top-4">
        <div>
          <Image
            src={"/Instagram_logo.svg"}
            width={0}
            height={0}
            alt="logo"
            className="w-full px-2 dark:invert"
            priority
          />
        </div>
        <div className="mt-8 flex flex-col gap-6 pl-4 *:flex *:items-center *:gap-2">
          <Link href="/">
            <GoHome className="size-7" /> Home
          </Link>
          <Link href="/search">
            <GoSearch className="size-7" /> Search
          </Link>
          <Link href="/browse">
            <GoRows className="size-7" /> Browse
          </Link>
          <Link href="/profile">
            <GoPerson className="size-7" /> Profile
          </Link>
          <Link href="/create">
            <GoPlusCircle className="size-7" /> Create
          </Link>
        </div>
      </div>
    </nav>
  );
}
