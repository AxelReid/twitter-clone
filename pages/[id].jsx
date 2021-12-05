import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
} from '@firebase/firestore'
import { getProviders, getSession, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Post from 'components/Post'
import { db } from 'firebase.js'
import { ArrowLeftIcon } from '@heroicons/react/solid'
import Comment from 'components/Comment'
import Login from 'components/Login'
import Hoc from 'components/Hoc'

const PostPage = (providers) => {
  const { data: session } = useSession()
  const [post, setPost] = useState()
  const [comments, setComments] = useState([])
  const router = useRouter()
  const { id } = router.query

  useEffect(
    () =>
      onSnapshot(doc(db, 'posts', id), (snapshot) => {
        setPost(snapshot.data())
      }),
    [db]
  )

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, 'posts', id, 'comments'),
          orderBy('timestamp', 'desc')
        ),
        (snapshot) => setComments(snapshot.docs)
      ),
    [db, id]
  )

  if (!session) {
    return <Login providers={providers} />
  }

  return (
    <Hoc title={post?.username + ' on Twitter: ' + post?.text}>
      <div className='flex-grow border-l border-r border-1 max-w-3xl'>
        <div className='flex items-center px-1.5 py-2 border-b border-1 color-2 font-semibold text-xl gap-x-4 sticky top-0 z-50 bg-1'>
          <div
            className='hoverAnimation w-9 h-9 flex items-center justify-center p-0'
            onClick={() => router.push('/')}
          >
            <ArrowLeftIcon className='h-5 text-sm color-1' />
          </div>
          Tweet
        </div>
        <Post id={id} post={post} postPage />
        {comments.length > 0 && (
          <div>
            {comments.map((comment) => (
              <Comment
                key={comment.id}
                id={comment.id}
                comment={comment.data()}
              />
            ))}
          </div>
        )}
      </div>
    </Hoc>
  )
}

export async function getServerSideProps(context) {
  const trendingResults = await fetch('https://jsonkeeper.com/b/NKEV').then(
    (res) => res.json()
  )
  const followResults = await fetch('https://jsonkeeper.com/b/WWMJ').then(
    (res) => res.json()
  )
  const providers = await getProviders()
  const session = await getSession(context)

  return {
    props: {
      trendingResults,
      followResults,
      providers,
      session,
    },
  }
}
export default PostPage
