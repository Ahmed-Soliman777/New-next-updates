import Image from "next/image";
import { post, PostDetailsProps } from "../utils/types";
import Img from "../../../public/teaching.jpg";

export default async function PostDetailsPage({ params }: PostDetailsProps) {
    const resolvedParams = await params
    // console.log(resolvedParams.id);
    const id = resolvedParams.id

    const res = await fetch(`https://api.vercel.app/blog/${id}`)
    if (!res.ok) {
        throw new Error("Failed to fetch post details")
    }

    const post: post = await res.json()
    // console.log(post);

    return (
        <div>
            <Image src={Img} alt="Image" width={25} height={25}/>
            <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
            <p className="text-gray-600 mb-2">By {post.author} on {new Date(post.date).toLocaleDateString()}</p>
        </div>
    )
}
