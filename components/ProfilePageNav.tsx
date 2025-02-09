"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ProfilePageNav({
  isMyProfile,
  username,
}: {
  isMyProfile?: boolean;
  username: string | null;
}) {
  const pathname = usePathname();

  const bookmarkActive = pathname.includes("/bookmark");
  const highlightActive = pathname.includes("/highlight");
  const profileActive = !bookmarkActive && !highlightActive;

  return (
    <section className="mt-8">
      <div className="flex justify-center gap-4 font-bold">
        <Link
          href={isMyProfile ? "/profile" : `/users/${username}`}
          className={profileActive ? "text-primary" : "text-muted-foreground"}
        >
          Posts
        </Link>

        <Link
          href={
            isMyProfile ? "/profile/highlight" : `/users/${username}/highlight`
          }
          className={highlightActive ? "text-primary" : "text-muted-foreground"}
        >
          Highlights
        </Link>

        {isMyProfile && (
          <Link
            href={"/profile/bookmark"}
            className={
              bookmarkActive ? "text-primary" : "text-muted-foreground"
            }
          >
            Bookmarks
          </Link>
        )}
      </div>
    </section>
  );
}
