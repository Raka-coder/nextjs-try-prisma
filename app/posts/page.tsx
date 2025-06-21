import prisma from "@/lib/prisma";
import Link from "next/link";

export default async function Page({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
  let pageParam = searchParams.page;
  let pageStr: string;
  if (Array.isArray(pageParam)) {
    pageStr = pageParam[0] ?? "1";
  } else {
    pageStr = pageParam ?? "1";
  }
  const page = parseInt(pageStr, 10);
  const pageSize = 5;
  const skip = (page - 1) * pageSize;

  const [posts, total] = await Promise.all([
    prisma.post.findMany({
      include: { author: true },
      skip,
      take: pageSize,
      orderBy: { id: "asc" },
    }),
    prisma.post.count(),
  ]);

  const totalPages = Math.ceil(total / pageSize);

  return (
    <div className="flex flex-col items-center justify-center mt-16">
      <h1 className="text-4xl font-bold mb-8 font-[family-name:var(--font-geist-sans)] text-[#333333]">
        Posts
      </h1>
      <ul className="font-[family-name:var(--font-geist-sans)] max-w-2xl space-y-4 text-center">
        {posts.map((post) => (
          <li key={post.id} className="text-black">
            <Link href={`/posts/${post.id}`}>{post.title}</Link>
            <span className="text-sm text-gray-500 ml-2">
              by {post.author.name}
            </span>
          </li>
        ))}
      </ul>
      <div className="flex gap-2 mt-4">
        <Link
          href={`/posts?page=${page - 1}`}
          className={`py-2 px-4 rounded ${
            page <= 1
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-zinc-500 hover:bg-zinc-700 text-white"
          }`}
          aria-disabled={page <= 1}
          tabIndex={page <= 1 ? -1 : 0}
        >
          Prev
        </Link>
        <span className="py-2 px-4 text-zinc-500">
          {page} / {totalPages}
        </span>
        <Link
          href={`/posts?page=${page + 1}`}
          className={`py-2 px-4 rounded ${
            page >= totalPages
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-zinc-500 hover:bg-zinc-700 text-white"
          }`}
          aria-disabled={page >= totalPages}
          tabIndex={page >= totalPages ? -1 : 0}
        >
          Next
        </Link>
      </div>
      <Link
        href="/posts/new"
        className="bg-zinc-500 hover:bg-zinc-700 text-white py-2 px-4 rounded mt-4"
      >
        Create Post
      </Link>
      <Link href="/" className="bg-zinc-500 hover:bg-zinc-700 text-white py-2 px-4 rounded mt-4">
        Back
      </Link>
    </div>
  );
}
