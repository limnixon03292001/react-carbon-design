import { memo, useEffect, useRef, useState } from "react";
import ReactDOM from 'react-dom';
import Modalx from "../Modal/Modalx";

const WithStateManager3 = memo (function WithStateManager2({ searchedItem, trailId, stamp, setTimex, 
    
    setIsListedx, setLists, lists }) {

    const [open, setOpen] = useState(false);
    const button = useRef();
        
    // useEffect(() => {

    // console.log("hiyahh", s)
    // })

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
                <button ref={button} onClick={() => setOpen(true)} className='btn_img_slider searched_item_container'>
                    <div>
                    <img src={`https://image.tmdb.org/t/p/w500${searchedItem?.poster_path}`} className='searched_img'/>
                    </div>
                    <div>
                    <h5>{ searchedItem?.title || searchedItem?.name }</h5>
                    <p className='sub_title'>{searchedItem?.original_title || searchedItem?.name } </p>
                    </div>
                </button>
             </>
        )}>

        {
            ({open, setOpen }) => 
            open  && <Modalx mData={searchedItem} open={open} setOpen={setOpen} button={button} trailId={trailId} stamp={stamp} setTimex={setTimex} 
            
            setIsListedx={setIsListedx} setLists={setLists} lists={lists}/>
        }

        </ModalStateManager>
  
    )
});

export default WithStateManager3;