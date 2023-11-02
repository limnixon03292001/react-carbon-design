import { useRef, useState, memo, useCallback, useMemo, useEffect } from "react";
import { Column, Grid } from "@carbon/react";
import axios from "axios";
import ReactDOM from 'react-dom';
import LinesEllipsis from "react-lines-ellipsis";
import { useQuery } from "react-query";
import ReactPlayer from 'react-player/lazy'
import YouTube from "react-youtube";
import Modalx  from "../Modal/Modalx";

const WithStateManager = memo (function WithStateManager({ posterUrl, mData, trailId, stamp, setTimex, type }) {
    /**
     * Simple state manager for modals.
     */
   
    const button = useRef();
    const [open, setOpen] = useState(false);
 
    // const [trailerx, setTrailer] = useState({});
    
    // useEffect(() => {
    //   const trailer = data?.data?.videos?.results?.find((video) =>  video.type === 'Trailer');
    //   setTrailer(trailer)
    //   console.log("x", data?.data)
    // },[]);

    // function trailerBreaker () {
    //   const trailer = data?.data?.videos?.results?.find((video) =>  video.type === 'Trailer');
    //   console.log("xxx", trailer.key)
    //   return trailer?.key
    // }

    // console.log("trailer", trailer)

 
    const ModalStateManager = ({ renderLauncher: LauncherContent, children: ModalContent }) => {
      return(
        <>
          {!ModalContent || typeof document === 'undefined' ? null : ReactDOM.createPortal(<ModalContent open={open} setOpen={setOpen} />, document.body)}
          {LauncherContent && <LauncherContent open={open} setOpen={setOpen} />}
        </>
      )
    };

    return (
      
      <ModalStateManager renderLauncher={({ setOpen }) => (
        <button className="btn_img_slider" ref={button} onClick={() => setOpen(true)}>
          <img src={`https://image.tmdb.org/t/p/w500${posterUrl}`} alt={`${mData.title}_poster`}
          className="img_movie_slider"  unselectable="on" />
        </button>
      )}>

      {
        ({open, setOpen }) => 
          open  && <Modalx mData={mData} open={open} setOpen={setOpen} button={button} trailId={trailId} stamp={stamp} setTimex={setTimex} type={type}/>
      }

      </ModalStateManager>

    )
});

export default WithStateManager;

