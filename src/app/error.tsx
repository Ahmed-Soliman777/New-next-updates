"use client"

import { ErrorProps } from "./utils/types"

export default function ErrorPage({ error, reset }: ErrorProps) {
    return (
        <div className="pt-5 text-center">
            <p className="text-red-600 font-bold text-2xl">Something went wrong!</p>
            <p className="text-gray-700 text-lg">Error message : {error.message}</p>
            <button className="mt-3 px-4 py-2 bg-blue-500 text-white rounded" onClick={() => reset()}>Try again</button>
        </div>
    )
}
