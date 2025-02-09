import { prisma } from "@/utils/prismaClient";
import Avatar from "./Avatar";
import Link from "next/link";
import PostsGrid from "./PostsGrid";

export default async function SearchResults({ query = "" }: { query: string }) {
  const profiles = await prisma.profile.findMany({
    where: {
      OR: [
        { username: { contains: query, mode: "insensitive" } },
        { name: { contains: query, mode: "insensitive" } },
      ],
    },
    take: 10,
  });

  const posts = await prisma.post.findMany({
    where: {
      description: { contains: query, mode: "insensitive" },
    },
    take: 100,
  });

  return (
    <div className="mt-4 space-y-4">
      {query && <p>Search results for "{query}"</p>}

      {!profiles.length ? (
        <div className="text-gray-500">No profiles found.</div>
      ) : (
        <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
          {profiles.map((profile) => {
            return (
              <Link
                href={`/users/${profile.username}`}
                key={profile.id}
                className="flex gap-2 rounded-full bg-muted p-2"
              >
                <div className="flex-shrink-0">
                  <Avatar src={profile.avatar || ""} />
                </div>
                <div className="truncate">
                  <p className="truncate">{profile.name}</p>
                  <p className="text-sm text-muted-foreground">@{profile.username}</p>
                </div>
              </Link>
            );
          })}
        </div>
      )}

      <div>
        <PostsGrid posts={posts} />
      </div>
    </div>
  );
}
