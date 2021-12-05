import { useEffect } from 'react'
import Feed from 'components/Feed'
import { getProviders, getSession, useSession } from 'next-auth/react'
import Login from 'components/Login'
import { themeState } from 'atoms/modalAtom'
import { useRecoilState } from 'recoil'
import Widgets from 'components/Widgets'
import Hoc from 'components/Hoc'

export default function Home({ trendingResults, followResults, providers }) {
  const { data: session } = useSession()
  const [theme, setTheme] = useRecoilState(themeState)

  useEffect(() => {
    console.log('ufff')
    const savedTheme = localStorage.getItem('theme')
    const html = document.documentElement.classList
    if (savedTheme === 'light') {
      html.remove('dark')
      setTheme('')
      return
    }
    html.add('dark')
    setTheme('dark')
  }, [])

  if (!session) {
    return <Login providers={providers} />
  }
  return (
    <Hoc>
      <Feed />
      <Widgets
        trendingResults={trendingResults}
        followResults={followResults}
      />
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
