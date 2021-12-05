import { useState, useEffect } from 'react'
import { SparklesIcon, MoonIcon, SunIcon } from '@heroicons/react/outline'
import Input from './Input'
import { onSnapshot, collection, query, orderBy } from 'firebase/firestore'
import { db } from 'firebase.js'
import Post from './Post'
import { themeState } from 'atoms/modalAtom'
import { useRecoilState } from 'recoil'

const Feed = ({ fluid }) => {
  const [posts, setPosts] = useState([])
  const [theme, setTheme] = useRecoilState(themeState)

  useEffect(
    () =>
      onSnapshot(
        query(collection(db, 'posts'), orderBy('timestamp', 'desc')),
        (snapshot) => setPosts(snapshot.docs)
      ),
    [db]
  )

  const themeSwitch = () => {
    const theme = document.documentElement.classList
    if (theme.value === '') {
      theme.add('dark')
      localStorage.setItem('theme', 'dark')
      setTheme('dark')
    } else {
      theme.remove('dark')
      localStorage.setItem('theme', 'light')
      setTheme('')
    }
  }

  return (
    <div
      className={`color-1 border-l border-r flex-1 border-1 ${
        !fluid && 'lg:flex-[0.67]'
      }`}
    >
      <div className='color-2 border-b border-1 flex items-center sm:justify-between py-2 px-3 sticky top-0 bg-1 z-50'>
        <h2 className='text-lg sm:text-xl font-bold'>Home</h2>
        <div
          className='hoverAnimation w-9 h-9 flex items-center justify-center xl:px-0 ml-auto'
          onClick={() => themeSwitch()}
        >
          {theme === 'dark' ? (
            <SunIcon className='h-5 color-1' />
          ) : (
            <MoonIcon className='h-5 color-1' />
          )}
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
