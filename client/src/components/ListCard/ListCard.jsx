import { memo, useEffect, useRef, useState } from "react";
import ReactDOM from 'react-dom';
import Modalx from "../Modal/Modalx";

const WithStateManager2 = memo (function WithStateManager2({  mData, trailId, stamp, setTimex, 
    
    setIsListedx, setLists, lists }) {

    const [open, setOpen] = useState(false);
    const button = useRef();

    // useEffect(() => {

    // console.log("hiyahh")
    // },[])

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
            <>
                <button ref={button} className="btn_img_slider card" onClick={() => setOpen(true)}>
                    <img className="list-img" src={`https://image.tmdb.org/t/p/w500${mData?.poster}`} 
                    alt={`${mData?.title || mData?.name}_poster`}/>
                    <br />
                    <br />
                    <div>
                    <p className='list-title'>{mData?.title || mData?.name}</p>
                    </div>
                </button>
               
            </>
        )}>

        {
            ({open, setOpen }) => 
            open  && <Modalx mData={mData} open={open} setOpen={setOpen} button={button} trailId={trailId} stamp={stamp} setTimex={setTimex} 
            
            setIsListedx={setIsListedx} setLists={setLists} lists={lists}/>
        }

        </ModalStateManager>
  
    )
});

export default WithStateManager2;