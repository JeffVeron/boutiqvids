import videos from "./videos"; 
import { COLOURS } from './colours';
import React, { useRef, useEffect, useState } from "react";
import "./VideoCard.css";
import './mainFeed.css'
import { Link } from 'react-router-dom';

 const KEY =  'AIzaSyCaqq0MHzqz_eGD7KegCcYrNeixMvNIjCc'
const SEARCH_QUERY = "Item For Sale"; 




function MainFeed (){
 const [videos, setVideos] = useState([]);


 useEffect(() => {
    fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${SEARCH_QUERY}&type=video&maxResults=6&key=${KEY}`
    )
      .then((res) => res.json())
      .then((data) => setVideos(data.items))
      .catch((err) => console.error("Error fetching videos:", err));
  }, []);




    return (
        
  
    <div className="app">
      {/*   <div className="videoFeed">
        {videos.map((video) => (
          <VideoCard
            key={video.id}
            src={video.src}
            caption={video.caption}
            user={video.user}
          />
        ))}



      </div> */}


       <h1 
        style={{
      //  backgroundColor: '#6f1d1b',
        color: COLOURS.primary.color3,
        padding: '20px',
        borderRadius: '8px',
        textAlign: 'center'
      }}
       
       >BoutiqVids Video Feed</h1>
      <div className="video-grid">
      {/*   {videos.map((video) => (
          <div key={video.id.videoId} className="video-card">
            <iframe
              src={`https://www.youtube.com/embed/${video.id.videoId}`}
              title={video.snippet.title}
              allowFullScreen
            ></iframe>
            <h3
            style = {{
              color: COLOURS.primary.color3,
              fontWeigt: 'bold',
              fontSize: '1rem',
              margin: '8px 0 4px 0',
            }}
            >{video.snippet.title}</h3>
            <p
                        style = {{
              color: COLOURS.primary.color3,
              fontWeigt: 'bold',
              margin: '8px 0 4px 0',
            }}
            >{video.snippet.channelTitle}</p>
          </div>
        ))} */}


         {videos.map((video) => (
        <Link
          key={video.id.videoId}
          to={`/video/${video.id.videoId}`}
          state={{ video }} // 👈 Pass the full video object here
          style={{ textDecoration: 'none' }}
        >
          <div className="video-card">
            <iframe
              src={`https://www.youtube.com/embed/${video.id.videoId}`}
              title={video.snippet.title}
              allowFullScreen
            ></iframe>

            <h3
              style={{
                color: COLOURS.primary.color3,
                fontWeight: 'bold',
                fontSize: '1rem',
                margin: '8px 0 4px 0',
              }}
            >
              {video.snippet.title}
            </h3>

            <p
              style={{
                color: COLOURS.primary.color3,
                fontWeight: 'bold',
                margin: '8px 0 4px 0',
              }}
            >
              {video.snippet.channelTitle}
            </p>
          </div>
        </Link>
      ))}
      
      </div>
     
   
        </div>
    )
}

export default MainFeed

 

const VideoCard = ({ src, caption, user }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          videoRef.current.play();
        } else {
          //videoRef.current.pause();
        }
      },
      { threshold: 0.6 }
    );

    observer.observe(videoRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="videoCard">
      <video
        ref={videoRef}
        src={src}
        autoPlay ={true}
        loop
        muted
        playsInline
        className="video"
      />
      <div className="videoInfo">
        <h4>{user}</h4>
        <p>{caption}</p>
      </div>
    </div>
  );
};

 