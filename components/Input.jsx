import { useRef, useState } from 'react'
import {
  CalendarIcon,
  ChartBarIcon,
  EmojiHappyIcon,
  PhotographIcon,
  XIcon,
} from '@heroicons/react/outline'
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'
import { db, storage } from 'firebase.js'
import { getDownloadURL, ref, uploadString } from '@firebase/storage'
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from '@firebase/firestore'
import { useSession } from 'next-auth/react'

const Input = () => {
  const filePickerRef = useRef(null)
  const [loading, setLoading] = useState(false)
  const [input, setInput] = useState('')
  const [selectedFile, setSelectedFile] = useState('')
  const [showEmojis, setShowEmojis] = useState(false)
  const { data: session } = useSession()

  const sendPost = async () => {
    if (loading) return
    setLoading(true)

    // ------------------------------
    const docRef = await addDoc(collection(db, 'posts'), {
      id: session.user.uid,
      username: session.user.name,
      userImg: session.user.image,
      tag: session.user.tag,
      text: input,
      timestamp: serverTimestamp(),
    })

    const imageRef = ref(storage, `posts/${docRef.id}/image`)

    if (selectedFile) {
      await uploadString(imageRef, selectedFile, 'data_url').then(async () => {
        const downloadURL = await getDownloadURL(imageRef)
        await updateDoc(doc(db, 'posts', docRef.id), {
          image: downloadURL,
        })
      })
    }
    // ----------------------------------

    setLoading(false)
    setInput('')
    setSelectedFile(null)
    setShowEmojis(false)
  }

  const adddImageToPost = (e) => {
    const reader = new FileReader()
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0])
    }

    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target.result)
    }
  }

  const addEmoji = (e) => {
    setInput(input + e.native)
  }

  return (
    <div
      className={`border-b border-gray-700 p-3 flex space-x-3 ${
        loading && 'opacity-60'
      }`}
    >
      <img
        src={session.user.image}
        alt=''
        className='rounded-full w-11 h-11 cursor-pointer'
      />
      <div className='w-full divide-y divide-gray-700'>
        <div className={`${selectedFile && 'pb-7'} ${input && 'space-y-2.5'}`}>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows='2'
            className='bg-transparent outline-none text-[#d9d9d9] placeholder-gray-500 tracking-wide w-full min-h-[50px]'
            placeholder='What is happening?'
          />

          {selectedFile && (
            <div className='relative'>
              <div
                className='absolute w-8 h-8 bg-[#15181c] hover:bg-[#171c16] bg-opacity-75 rounded-full flex items-center justify-center top-1 left-1 cursor-pointer'
                onClick={() => setSelectedFile(null)}
              >
                <XIcon className='h-5' />
              </div>
              <img
                src={selectedFile}
                alt=''
                className='object-contain max-h-80 rounded-2xl'
              />
            </div>
          )}
        </div>

        {!loading && (
          <div className='flex items-center justify-between pt-2.5'>
            <div className='relative flex items-center'>
              <div
                className='icon'
                onClick={() => filePickerRef.current.click()}
              >
                <PhotographIcon className='h-[22px] text-[#1d9bf0]' />
                <input
                  onChange={adddImageToPost}
                  ref={filePickerRef}
                  type='file'
                  hidden
                />
              </div>
              <div className='icon rotate-90'>
                <ChartBarIcon className='text-[#1d9bf0] h-[22px]' />
              </div>
              <div className='icon' onClick={() => setShowEmojis(!showEmojis)}>
                <EmojiHappyIcon className='text-[#1d9bf0] h-[22px]' />
              </div>
              <div className='icon'>
                <CalendarIcon className='text-[#1d9bf0] h-[22px]' />
              </div>

              {showEmojis && (
                <Picker
                  onSelect={addEmoji}
                  theme='dark'
                  style={{
                    position: 'absolute',
                    top: '100%',
                    left: '-40px',
                    maxWidth: '320px',
                    borderRadius: '20px',
                  }}
                />
              )}
            </div>
            <button
              className='bg-[#1d9bf0] text-white rounded-full px-4 py-1.5 font-bold shadow-md hover:bg-[#1a8cd8] disabled:hover:bg-[#1d9bf0] disabled:opacity-50 disabled:cursor-default'
              disabled={!input.trim() && !selectedFile}
              onClick={() => sendPost()}
            >
              Tweet
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Input
