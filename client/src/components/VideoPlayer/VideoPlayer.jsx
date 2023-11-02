import React, { memo, useEffect, useRef, useState } from 'react'
import ReactPlayer from 'react-player'
import { api } from '../../utils/axios-config';
import decode from 'jwt-decode';

const  VideoPlayer =  memo (function VideoPlayer ({ mData, data, stamp, setTimex }) {
    
    const trailer = data?.data?.videos?.results?.find((video) => video.type === 'Trailer');
    const player = useRef(null);
    const [timeCache, setTimeCache] = useState()
    const decodedToken = decode(localStorage.token);

  useEffect(() => {
        return () => {
            stamp(mData?.id)
        }
  },[])

  useEffect(() => {   
  
    getSaveTimestamp()
 
  },[])

  const getSaveTimestamp = async () => {
    const { data } = await api.get(`/netflix/getSave?movieId=${mData?.id}&email=${decodedToken?.email}`)
    console.log("cache", data?.timeStamp);
    setTimeCache(data?.timeStamp)
  }

  return (
    <div>
          <ReactPlayer controls={true} url={`https://www.youtube.com/watch?v=${trailer?.key}&t=${timeCache}`} 
                config={{
                    youtube: {
                    playerVars: { showinfo: 1 }
                    }
                }}

                onProgress={(p) => {
                    setTimex({ stamp: p?.playedSeconds, movieId: mData?.id })
                }}

                ref={player}
                    
                style={{ width: '100%', maxWidth: '100%', marginTop: '1rem'}}
                />
    </div>
  )
})

export default VideoPlayer
