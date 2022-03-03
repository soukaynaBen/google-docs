import React, { useRef } from 'react'
import Tooltips from "@material-tailwind/react/Tooltips";
import TooltipsContent from "@material-tailwind/react/TooltipsContent";

export default function Tooltip({children,placement=left,text=""}) {
    const buttonRef = useRef();
  return (
    
              <>
                  <span color="lightBlue" ref={buttonRef} ripple="light">
                            {children}
                  </span>
                  <Tooltips placement={placement} ref={buttonRef}>
                      <TooltipsContent>{text}</TooltipsContent>
                  </Tooltips>
              </>
          

  )
}
