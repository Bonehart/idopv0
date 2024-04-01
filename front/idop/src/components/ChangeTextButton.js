import React, { useState } from 'react';
import { addfrienddb } from '../useractions';
export function ChangeTextButton({onClick, userid,uid,setrefresh,refresh, friendName, userName}) {
  const [buttonText, setButtonText] = useState('Add New Friend');

  const handleClick = () => {
    if(buttonText !=="Friend Added")
    setButtonText("Friend Added");
  };

  if( buttonText == "Friend Added")
  {
   return (
    <button onClick= { () => {handleClick(); }}  >
    {buttonText}
  </button>)
  }
  else {
    return (
      <button onClick= { () => {handleClick(); onClick(userid,uid,setrefresh,refresh, friendName,userName);  }}  >
      {buttonText}
    </button>)
  }
}
export default ChangeTextButton;
