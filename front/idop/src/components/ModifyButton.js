
import React from 'react';
import ReactDOM from 'react-dom';

import Button from '@mui/material/Button';
import { handleImageError } from "./../useractions";
import { sendFilenoimage} from "./useractions";


export const ModifyButton = props => {

    const examplefunc = () => {
    }

    return (

       props.modify ? (
            <Button variant="contained" onClick={() => {
              sendFilenoimage(
                document.getElementById('activity').value,
                document.getElementById('activitydetail').value, currentpost._id);

                setmodify(false);
                setdetailed(false);
      
              props.setsavetext("changed saved");
            }} >Save changes

            </Button>
          )
            :
            (
              " "
            )

    )
}

export default ModifyButton;