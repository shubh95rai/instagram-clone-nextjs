import SinglePostContent from "@/components/SinglePostContent";

type Params = Promise<{ postId: string }>;

export default async function SinglePostPage({ params }: { params: Params }) {
  const { postId } = await params;

  return <SinglePostContent postId={postId} />;
}
