import { useState, useEffect } from 'react'
import { SparklesIcon } from '@heroicons/react/outline'
import Input from './Input'
import { onSnapshot, collection, query, orderBy } from 'firebase/firestore'
import { db } from 'firebase.js'
import Post from './Post'

const Feed = () => {
  const [posts, setPosts] = useState([])

  useEffect(
    () =>
      onSnapshot(
        query(collection(db, 'posts'), orderBy('timestamp', 'desc')),
        (snapshot) => setPosts(snapshot.docs)
      ),
    [db]
  )

  return (
    <div className='text-white border-l border-r flex-1 lg:flex-[0.67] border-gray-700'>
      <div className='text-[#d9d9d9] border-b border-gray-700 flex items-center sm:justify-between py-2 px-3 sticky top-0 bg-black z-50'>
        <h2 className='text-lg sm:text-xl font-bold'>Home</h2>
        <div className='hoverAnimation w-9 h-9 flex items-center justify-center xl:px-0 ml-auto'>
          <SparklesIcon className='h-5 text-white' />
        </div>
      </div>

      <Input />
      <div>
        {posts.map((post) => (
          <Post key={post.id} id={post.id} post={post.data()} />
        ))}
      </div>
    </div>
  )
}

export default Feed
