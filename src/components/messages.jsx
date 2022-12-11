import React from 'react'
import { Link, useSearchParams } from 'react-router-dom'
const Messages = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const error = searchParams.get("error");
  const message = searchParams.get("message");
  const name = searchParams.get("name");

  return (
    <div>
      {error &&
        <div className='flex justify-center items-center text-center h-screen  bg-red-700  '>
          <div className='p-24 shadow-2xl rounded-3xl space-x-4 space-y-4  border-2  bg-red-900'>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="85" height="85"
              fill="white"
              className="bi bi-x-circle-fill mx-auto animated swing"
              viewBox="0 0 16 16"
            >
              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
            </svg>
            <h2 className='text-white font-medium text-3xl'>{message}</h2>

            <h3 className='text-white font-normal text-2xl'>Please try again!</h3>
            <h2><Link className='text-white font-normal text-2xl hover:text-black' to={"/"}>go to the site</Link></h2>

          </div>
        </div>}

      {!name
        ?
        <div className='flex justify-center items-center text-center h-screen  bg-green-800 '>
          <div className='p-24 shadow-2xl rounded-3xl space-x-4 space-y-4  border-2  bg-lime-600'>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="85"
              height="85"
              fill="white"
              className="mx-auto bi bi-check-circle-fill animated swing"
              viewBox="0 0 16 16"
            >
              <path
                d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"
              />
            </svg>
            <h2 className='text-white font-medium text-3xl'>Email has been verified</h2>

            <h3 className='text-white font-normal text-3xl'>You can now log in</h3>

            <h2><Link className='text-white font-normal text-3xl hover:text-black' to={"/"}>go to the site</Link></h2>
          </div>
        </div>
        :
        <div className='flex justify-center items-center text-center h-screen bg-slate-200 '>
          <div className='p-24 shadow-2xl rounded-3xl space-x-4 space-y-4  border-2  bg-sky-700'>
            <svg 
           xmlns="http://www.w3.org/2000/svg"
           width="85"
           height="85"
           fill="white"
           className="mx-auto bi bi-envelope-at animated swing"
           viewBox="0 0 16 16">
              <path d="M2 2a2 2 0 0 0-2 2v8.01A2 2 0 0 0 2 14h5.5a.5.5 0 0 0 0-1H2a1 1 0 0 1-.966-.741l5.64-3.471L8 9.583l7-4.2V8.5a.5.5 0 0 0 1 0V4a2 2 0 0 0-2-2H2Zm3.708 6.208L1 11.105V5.383l4.708 2.825ZM1 4.217V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v.217l-7 4.2-7-4.2Z" />
              <path d="M14.247 14.269c1.01 0 1.587-.857 1.587-2.025v-.21C15.834 10.43 14.64 9 12.52 9h-.035C10.42 9 9 10.36 9 12.432v.214C9 14.82 10.438 16 12.358 16h.044c.594 0 1.018-.074 1.237-.175v-.73c-.245.11-.673.18-1.18.18h-.044c-1.334 0-2.571-.788-2.571-2.655v-.157c0-1.657 1.058-2.724 2.64-2.724h.04c1.535 0 2.484 1.05 2.484 2.326v.118c0 .975-.324 1.39-.639 1.39-.232 0-.41-.148-.41-.42v-2.19h-.906v.569h-.03c-.084-.298-.368-.63-.954-.63-.778 0-1.259.555-1.259 1.4v.528c0 .892.49 1.434 1.26 1.434.471 0 .896-.227 1.014-.643h.043c.118.42.617.648 1.12.648Zm-2.453-1.588v-.227c0-.546.227-.791.573-.791.297 0 .572.192.572.708v.367c0 .573-.253.744-.564.744-.354 0-.581-.215-.581-.8Z" />
            </svg>
            <h2 className='text-white font-medium text-3xl'>thank you {name} for sign up</h2>

            <h3 className='text-white font-normal text-3xl'>please go to your email to Verify the account</h3>
            <h3 className='text-white font-normal text-3xl'>must Verify to login</h3>

          </div>
        </div>
      }



    </div>
  )
}

export default Messages