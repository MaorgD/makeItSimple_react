import React, { useState } from 'react'

const Gallery = ({ images, videos ,display}) => {

   
   
    return (
        <div className=" w-full  ">
        
        <div className="  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 ">
          {(display === 'both' || display === 'images') &&
            images.map((image, index) => (
              <div key={index} className="">
                <img src={image} alt="" className="" />
              </div>
            ))}
          {(display === 'both' || display === 'videos') &&
            videos.map((video, index) => (
              <div key={index} className="">
                <video src={video} controls className="" />
              </div>
            ))}
        </div>
      </div>
    )
}

export default Gallery