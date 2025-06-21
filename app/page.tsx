import prisma from "@/lib/prisma";
import Link from "next/link";

export default async function Home() {
  const users = await prisma.user.findMany();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center -mt-16">
      <h1 className="text-4xl font-bold mb-8 font-[family-name:var(--font-geist-sans)] text-[#333333]">
        Superblog
      </h1>
      <ol className="list-decimal list-inside font-[family-name:var(--font-geist-sans)]">
        {users.map((user) => (
          <li key={user.id} className="mb-2 text-black">
            {user.name}
          </li>
        ))}
      </ol>
      <Link href="/posts" className="bg-zinc-500 hover:bg-zinc-700 text-white py-2 px-4 rounded mt-4">Posts</Link>
    </div>
  );
}