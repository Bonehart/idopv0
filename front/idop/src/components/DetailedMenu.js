
import ReactDOM from 'react-dom';
import { PageContext } from '../PageContext.js';

import React, { useState,useContext, createContext,useEffect } from "react";
export const DetailedMenu = props => {



const { currentpost,setdetailed, setmodify, sethamburger,detailed, setDetailed, hamburger, setHamburger, modify } = useContext(PageContext);


      var detailedmenuelements = [
        { Edit: "Edit", hook: props.edit },
        { Edit: "Back", hook: props.back },
        { Edit: "Modify Image", hook: props.modify },
        { Edit: "Delete", hook: props.delete }
      ];

    return (
        <div class="detailed-card-menu">
  <div class="detailed-menu-item-first"  onClick={() => { setdetailed(false); setmodify(false); sethamburger(!hamburger)  ;}} >
              Back
  </div> 
  
  <div class="detailed-menu-item-first"  onClick={() => {  setmodify(true);setdetailed(false); sethamburger(!hamburger); }}  >
              Modify
  </div>



          {/* {detailedmenuelements.map((item, index) => (
            <div
              class={
                index == 0 ? "detailed-menu-item-first" : "detailed-menu-item"
              }
              onClick={item.hook}
            >
              {" "}
              {item.Edit}
            </div>
          ))} */}
        </div>
    )
}

export default DetailedMenu;