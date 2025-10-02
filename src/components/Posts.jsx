import React from 'react'
import Post from './Post'
import { useSelector } from 'react-redux'

const Posts = () => {
  const { posts } = useSelector(store => store.post);
  console.log("posts", posts)
  return (
    <div>
      {posts?.docs?.length > 0 ? (
        posts.docs.map((post) => <Post key={post?._id} post={post} />)
      ) : (
        <div className="flex flex-col items-center justify-center py-16 text-center text-gray-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 mb-4 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 5h18M3 12h18M3 19h18"
            />
          </svg>
          <h2 className="text-lg font-semibold text-gray-600">No Posts Yet</h2>
          <p className="text-sm text-gray-400">Start by creating your first post 🎉</p>
        </div>
      )}
    </div>
  )
}

export default Posts