import BlogList from "@/components/BlogList";
import PreviewProvider from "@/components/PreviewProvider";
import { getClient } from "@/sanity/lib/client";
import { groq } from "next-sanity";
import { draftMode } from "next/headers";

const query = groq`*[_type== 'post'] {
  ...,
  author->, 
  categories []->
  } | order(_createdAt desc)`;

export default async function Home() {
  const preview = draftMode().isEnabled
    ? { token: process.env.NEXT_PUBLIC_SANITY_READ_TOKEN }
    : undefined;

  if (preview) {
    return (
      <PreviewProvider previewToken={preview.token}>
        <div> Preview mode </div>
        {/* <PreviewBlogList/>  */}
      </PreviewProvider>
    );
  }
  const posts = await getClient().fetch(query);
  return <BlogList posts={posts} />;
}
