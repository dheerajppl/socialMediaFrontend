import React from 'react'
import Post from './Post'
import { useSelector } from 'react-redux'

const Posts = () => {
  const {postslist} = useSelector(store=>store.post);
  return (
    <div>
        {
            postslist?.map((post) => <Post key={post?._id} post={post}/>)
        }
    </div>
  )
}

export default Posts