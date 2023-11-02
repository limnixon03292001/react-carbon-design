import { Button } from "@carbon/react";
import { memo, useRef, useState } from "react";
import ReactDOM from 'react-dom';
import { PlayFilled } from '@carbon/icons-react';
import Modalx from "../Modal/Modalx";

const WithStateManager1 = memo (function WithStateManager1({ posterUrl, mData, trailId, stamp, setTimex, setIsListedx }) {
    const [open, setOpen] = useState(false);
    const button = useRef();

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
                   
            <Button itemRef={button}  renderIcon={(props) => <PlayFilled {...props}/>} kind="danger"
            onClick={() => setOpen(true)}>
                 Watch Trailer
             </Button>
              
         )}>

            {
            ({open, setOpen }) => 
            open  && <Modalx mData={mData} open={open} setOpen={setOpen} button={button} trailId={trailId} stamp={stamp} setTimex={setTimex} setIsListedx={setIsListedx}/>
            }

         </ModalStateManager>
  
    )
});

export default WithStateManager1;