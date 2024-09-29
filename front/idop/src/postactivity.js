
import { server } from "./server.js";

export async function postactivity(tokenid, userid, activity, detail, displayName) {
  var apiUrl = server + ':9000/newactivity';
  var myHeaders = new Headers();
  var imageString;
  myHeaders.append("Authorization", "Bearer " + tokenid);
  myHeaders.append('Content-Type', 'application/json');

  const fileField = document.querySelector('input[type="file"]');
  var keyValue = userid + Date.now();
  var extension = fileField[0].type


  if (fileField.value == "") {
    imageString = "";
  } else {
    imageString = keyValue.toUpperCase();
    console.log("file extension is  :")
    console.log(extension);
  }

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: JSON.stringify({ 
      username: userid, 
      activity: activity, 
      detail: detail, 
      displayName: displayName, 
      image: imageString 
    })
  };

  const formData = new FormData();

  if (fileField.value !== "") {
    try {
      formData.append('username', userid);
      formData.append('key', keyValue.toUpperCase());
      formData.append('image', fileField.files[0]);
      formData.append('displayName', displayName);

      console.log(formData);

      await fetch(server + ':9000/addimage', {
        method: 'POST',
        mode: 'cors',
        body: formData
      });

      await fetch(apiUrl, requestOptions);
    } catch (error) { console.log(error) };
  } else {
    try { 
      console.log('no image was found');
      await fetch(apiUrl, requestOptions);
    } catch (error) { console.log(error) };
  }
};

export default postactivity;