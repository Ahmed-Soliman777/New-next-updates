import Link from "next/link"
import { post } from "./utils/types"

export default async function Home() {
  const data = await fetch('https://api.vercel.app/blog')
  if (!data.ok) {
    throw new Error("Failed to fetch")
  }
  const posts: post[] = await data.json()
  // console.log(posts)
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-8">Blog Posts</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
              {post.title}
            </h2>
            <Link href={`/${post.id}`}>Read more</Link>
          </div>
        ))}
      </div>
    </div>
  )
}