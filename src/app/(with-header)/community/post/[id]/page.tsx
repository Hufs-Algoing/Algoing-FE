import CodeReviewDetail from "../../components/code-reivew-detail";

export default async function CodeReviewDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <CodeReviewDetail postId={id} />;
}
