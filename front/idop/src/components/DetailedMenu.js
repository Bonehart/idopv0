
import ReactDOM from 'react-dom';
import { PageContext } from '../PageContext.js';

import React, { useState,useContext, createContext,useEffect } from "react";
export const DetailedMenu = props => {



  var {currentpost,
    setdetailed,
    sethamburger,
    detailed,
    hamburger,
    modify,
    setmodify,
    setnewtask,
    setinteraction} = useContext(PageContext);


    return (
        <div class="detailed-card-menu">
          
  <div class="detailed-menu-item-first"  onClick={() => { setdetailed(false); setmodify(false);  setnewtask(false); setinteraction(false); sethamburger(!hamburger)  ;}} >
              Back
  </div> 
  
  <div class="detailed-menu-item-first"  onClick={() => {  setmodify(true);setdetailed(false);  sethamburger(!hamburger); }}  >
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