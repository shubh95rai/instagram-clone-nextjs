import { Post } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

export default function PostsGrid({ posts }: { posts: Post[] }) {
  return (
    <section>
      <div className="grid grid-cols-2 place-items-center gap-4 pb-10 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5">
        {posts.map((post) => {
          return (
            <Link href={`/posts/${post.id}`} key={post.id}>
              <Image
                src={post.imageUrl}
                width={500}
                height={500}
                alt="image"
                className="aspect-square rounded-md object-cover"
                priority
              />
            </Link>
          );
        })}
      </div>
    </section>
  );
}
