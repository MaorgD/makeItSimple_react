import React from 'react'

const Gallery = (props) => {

    const { images, videos } = props;
    const [display, setDisplay] = React.useState('both');
    const handleChange = (event) => {
        setDisplay(event.target.value);
    }
    return (
        <div>
        <label htmlFor="display-select">Display:</label>
        <select
          id="display-select"
          value={display}
          onChange={handleChange}
        >
          <option value="both">Both</option>
          <option value="images">Images</option>
          <option value="videos">Videos</option>
        </select>
        <div className="flex flex-wrap">
          {(display === 'both' || display === 'images') &&
            images.map((image, index) => (
              <div key={index} className="w-full md:w-1/2 p-4">
                <img src={image} alt="" className="w-full h-auto" />
              </div>
            ))}
          {(display === 'both' || display === 'videos') &&
            videos.map((video, index) => (
              <div key={index} className="w-full md:w-1/2 p-4">
                <video src={video} controls className="w-full h-auto" />
              </div>
            ))}
        </div>
      </div>
    )
}

export default Gallery