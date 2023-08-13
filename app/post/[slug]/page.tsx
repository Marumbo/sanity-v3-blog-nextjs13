import { getClient } from "@/sanity/lib/client";
import urlFor from "@/sanity/lib/urlFor";
import { groq } from "next-sanity";
import React from "react";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import { RichTextComponents } from "@/components/RichTextComponent";

type Props = {
  params: {
    slug: string;
  };
};

async function Post({ params: { slug } }: Props) {
  const query = groq` *[_type=='post' && slug.current == "${slug}"][0]
  {
     ...,
    author->, 
    categories []->
  }
  `;

  const post: Post = await getClient().fetch(query, { slug });

  return (
    <article className="px-10 pb-28">
      <section className="space-y-2 border border-[#F7AB0A] text-white">
        <div className="relative min-h-56 flex flex-col md:flex-row justify-between">
          <div className="absolute top-0 w-full h-full opacity-10 blur-sm p-10">
            <Image
              className="obiect-cover object-center mx-auto"
              src={urlFor(post.mainImage).url()}
              alt={post.author.name}
              fill
            />
          </div>{" "}
          <section className="p-5 bg-[#F7AB0A] w-full">
            <div className="flex flex-col md:flex-row justify-between gap-y-5">
              <h1 className="text-4xl font-extrabold">{post.title}</h1>
              <p>
                {new Date(post._createdAt).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>{" "}
              <div className="flex items-center space-x-2 ">
                <Image
                  className=" rounded-full"
                  src={urlFor(post.author.image).url()}
                  alt={post.author.name}
                  height={40}
                  width={40}
                />
                <div className="w-64">
                  {" "}
                  <h3 className="text-lg font-bold">{post.author.name}</h3>{" "}
                  <div>{/* TODO: Author BIO */}</div>
                </div>{" "}
              </div>
            </div>{" "}
            <div>
              <h2 className="italic pt-10">{post.description}</h2>
              <div className="flex items-center justify-end mt-auto space-x-2">
                {post.categories.map((category) => (
                  <p
                    key={category._id}
                    className="bg-gray-800 text-white px-3 py-1 rounded-full text-sm font-semibold mt-4"
                  >
                    {category.title}
                  </p>
                ))}
              </div>{" "}
            </div>
          </section>
        </div>{" "}
      </section>
      <PortableText
        value={post.body}
        components={{
          ...RichTextComponents.types,
          types: {
            image: ({ value }: any) => {
              return (
                <div className="relative w-full h-96 m-10 mx-auto">
                  <Image
                    className="object-contain"
                    src={urlFor(value).url()}
                    alt="Blog Post Image"
                    fill
                  />
                </div>
              );
            },
          },
        }}
      />
    </article>
  );
}

export default Post;
