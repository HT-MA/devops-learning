import { TopicContent } from "./topic-content";
import topicsData from "@/data/topics.json";

export function generateStaticParams() {
  return topicsData.topics.map((topic) => ({
    slug: topic.slug,
  }));
}

export default function TopicPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return <TopicPageInner params={params} />;
}

async function TopicPageInner({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <TopicContent slug={slug} />;
}