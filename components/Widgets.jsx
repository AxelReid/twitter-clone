import Image from 'next/image'
import { SearchIcon } from '@heroicons/react/outline'
import Trending from './Trending'

const Widgets = ({ trendingResults, followResults }) => {
  return (
    <div className='hidden lg:inline flex-[0.33] space-y-5 px-[2%]'>
      <div className='sticky top-0 py-1.5 bg-black z-50 w-full'>
        <div className='relative flex items-center bg-[#202327] p-3 rounded-full'>
          <SearchIcon className='text-gray-500 h-5 z-50' />
          <input
            type='text'
            className='bg-transparent placeholder-gray-500 outline-none border border-transparent w-full text-[#d9d9d9] inset-0 absolute pl-11 focus:bg-black rounded-full focus:border-[#1d9bf0] focus:shadow-lg'
            placeholder='Search Tweet'
          />
        </div>
      </div>

      <div className='text-[#d9d9d9] space-y-3 bg-[#15181c] pt-2 rounded-xl w-full'>
        <h4 className='font-bold text-xl px-4'>What&apos;s happening</h4>
        {trendingResults.map((result, i) => (
          <Trending key={i} result={result} />
        ))}
        <button className='hover:bg-white hover:bg-opacity-[0.03] px-4 py-3 cursor-pointer transition duration-200 ease-out flex items-center justify-between w-full text-[#1d9bf0] font-light'>
          Show more
        </button>
      </div>

      <div className='text-[#d9d9d9] space-y-3 bg-[#15181c] pt-2 rounded-xl w-full'>
        <h4 className='font-bold text-xl px-4'>Who to follow</h4>
        {followResults.map((result, index) => (
          <div
            className='hover:bg-white hover:bg-opacity-[0.03] px-4 py-2 cursor-pointer transition duration-200 ease-out flex items-center'
            key={index}
          >
            <Image
              src={result.userImg}
              width={50}
              height={50}
              objectFit='cover'
              className='rounded-full'
            />
            <div className='ml-4 leading-5 group'>
              <h4 className='font-bold group-hover:underline'>
                {result.username}
              </h4>
              <h5 className='text-gray-500 text-[15px]'>{result.tag}</h5>
            </div>
            <button className='ml-auto bg-white text-black rounded-full font-bold text-sm py-1.5 px-3.5'>
              Follow
            </button>
          </div>
        ))}
        <button className='hover:bg-white hover:bg-opacity-[0.03] px-4 py-3 cursor-pointer transition duration-200 ease-out flex items-center justify-between w-full text-[#1d9bf0] font-light'>
          Show more
        </button>
      </div>
    </div>
  )
}

export default Widgets
