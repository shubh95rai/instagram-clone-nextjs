import Link from "next/link";
import { GoHome } from "react-icons/go";
import { GoSearch } from "react-icons/go";
import { GoPlusCircle } from "react-icons/go";
import { GoRows } from "react-icons/go";
import { GoPerson } from "react-icons/go";

export default function MobileNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 border-t-2 bg-background px-8 py-4 lg:hidden">
      <div className="mx-auto flex max-w-lg justify-between">
        <Link href="/">
          <GoHome className="size-7" />
        </Link>
        <Link href="/search">
          <GoSearch className="size-7" />
        </Link>
        <Link href="/create">
          <GoPlusCircle className="size-7" />
        </Link>
        <Link href="/browse">
          <GoRows className="size-7" />
        </Link>
        <Link href="/profile">
          <GoPerson className="size-7" />
        </Link>
      </div>
    </nav>
  );
}
