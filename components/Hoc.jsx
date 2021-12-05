import Head from 'next/head'
import { useRecoilState } from 'recoil'
import Sidebar from './Sidebar'
import { modalState } from 'atoms/modalAtom'
import Modal from './Modal'

const Hoc = ({ children, title = 'Twitter Clone' }) => {
  const [isOpen, setIsOpen] = useRecoilState(modalState)

  return (
    <main className='min-h-screen max-w-[1500px] mx-auto flex'>
      <Head>
        <title>{title}</title>
      </Head>
      <Sidebar />
      {children}
      {isOpen && <Modal />}
    </main>
  )
}

export default Hoc
