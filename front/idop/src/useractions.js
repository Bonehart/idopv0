/* commented out old back end call*/

import { getAuth, createUserWithEmailAndPassword  } from "firebase/auth";
import { logInWithEmailAndPassword, logOut,getFriends } from './Firebase';
import firebase from 'firebase/compat/app';
import { useAuthState } from "react-firebase-hooks/auth";
import { server } from "./server.js"

export async function addfrienddb(uid, friend_uid,friendName,userName) {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  
  var raw = JSON.stringify({
    "uid": uid,
    "friend_uid": friend_uid,
    "friendName": friendName,
    "userName": userName
  });
  
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };
  
  fetch(server+ ":9000/addfriend/addfriend", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}

export function handleImageError(img) {
  var grandparent = this.parentElement; // Get the grandparent element
  this.parentElement.style.height = "200px"; // Set desired height if image is missing
}



 export async function getuserData(hookVar, user, token,hookload) {
     var apiUrl =  new URL(server+':9000/getactivities');
     var myHeaders = new Headers();
      myHeaders.append("Authorization", "Bearer "  + token);
      myHeaders.append('Content-Type', 'application/json');

     var requestOptions = {
       method: 'GET',
       headers: myHeaders,
       redirect: 'follow'
     };

      var data = { "username" : user};
      for (let k in data) { apiUrl.searchParams.append(k, data[k]); }
      let response = await  fetch(apiUrl, requestOptions)
      response = await response.json()
      await hookVar(response);
   }


    
   export async function getfriendsdata(hookVar, user, token) {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);
    myHeaders.append("Content-Type", "application/json");
    console.log("user for get friends data is :");
    console.log(user);
    // Convert parameters to query string if needed
    const params = new URLSearchParams({ username: "mKYLcOh65YcXdqNMb5l0l7FPv3J3" });

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    try {
        let response = await fetch(server + ":9000/getactivities/getfriendsdata?" + params, requestOptions);
        response = await response.json();
        console.log("response is : ");
        console.log(response);
        // Call your hook function here
        await hookVar(response);

    } catch (error) {
        console.log('error', error);
    }

}  


export async function getdatafromlistbyuid (uid, list, hook, viewhook, viewhook2){
  console.log("lidy is : ");
  console.log(list);
  var filtered = list.filter((list) => list.username == uid);
  console.log("filtereed is : ");
  console.log(filtered);
  viewhook(true);
  viewhook2(false);
  hook(filtered);

}

  export function handlepreview() {
    
    const preview = document.querySelector('#preview');
    const file = document.querySelector("input[type=file]").files[0];
    const reader = new FileReader();
  
    reader.addEventListener(
      "load",
      () => {
        // convert image file to base64 string
        preview.src = reader.result;
      },
      false
    );
  
    if (file) {
      reader.readAsDataURL(file);
    }
  }

// this one will get the data by _id 
  export async function deletedatabyid(id, hookVar) {
    var apiUrl =  new URL(server+':9000/getactivities/deletebyid');
    var data = { "id" : id};
    for (let k in data) { apiUrl.searchParams.append(k, data[k]); }
    let response = await  fetch(apiUrl)
     response = await response.json()
     await hookVar(true);
  }


   
// this one will get the data by _id 
export async function deleteimagebyid(id, hookVar) {
  var apiUrl =  new URL(server+':9000/getactivities/deleteimagebyid');
  var data = { "id" : id};
  for (let k in data) { apiUrl.searchParams.append(k, data[k]); }
  let response = await  fetch(apiUrl)
   response = await response.json()

}


  // this one will get the data by _id 
  export async function getdatabyid(hookVar, id) {
    var apiUrl =  new URL(server+':9000/getactivities/getbyid');
    var data = { "id" : id};
    for (let k in data) { apiUrl.searchParams.append(k, data[k]); }
    let response = await  fetch(apiUrl)
    response = await response.json()
    await hookVar(response);
  }

// update the record use for modify function once populated and changed (or not )

  export async function updatedata( data) {

    try{
      var apiUrl =  new URL(server+':9000/getactivities/updatebyid');

      var id = { "id" : data.id};
      var activity = { "activity" : data.activity};
      var detail = { "detail" : data.detail};
  
      for (let k in data) { apiUrl.searchParams.append(k, data[k]); }
  
      let response = await  fetch(apiUrl)
      response = await response.json()
    } 

    catch (e){

      console.log("error ius : " + e)
    }


  }

  export async function sendtestimage (activity, detail, id)  {
    const fileField = document.querySelector('input[type="file"]');

    var formDatar = new FormData();

    formDatar.append('activity', activity);
   
    formDatar.append('detail', detail);
    formDatar.append('id', id);
    formDatar.append('image', fileField.files[0]);

  }


  export async function sendFilenoimage (activity, detail, id)  {

    const fileField = document.querySelector('input[type="file"]');

    var formData = new FormData();
  
    var keyValue = id + Date.now();
    formData.append('key',keyValue.toUpperCase());
    formData.append('image', fileField.files[0]);
    formData.append('user', id);
    const x = sessionStorage.getItem("token");

    if (fileField.files[0] === undefined) {

      var myHeaders = new Headers();
      myHeaders.append("Authorization", "Bearer "  +  x);
      myHeaders.append('Content-Type', 'application/json');

      // console.log("didnt detect image");
      fetch(server+':9000/getactivities/updatebyid', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        mode: 'cors',
  
        // body: JSON.stringify(formDatar)
      body:JSON.stringify( { detail: detail, id: id, activity: activity})
       });
  } else {

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer "  +  x);
    myHeaders.append('Content-Type', 'application/json');
    
  fetch(server+':9000/getactivities/updatebyidimg', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },

    mode: 'cors',

      // body: JSON.stringify(formDatar)
    body:JSON.stringify( { detail: detail, id: id, activity: activity, image: keyValue.toUpperCase()   })
    }).then(
      fetch('http://172.105.254.65:9000/addimage', {
      method: 'POST',
      mode: 'cors',
      body: formData
    })
   );

  }
}

  export const modify = (activity, detail, id) => {

    var formDatar = new FormData();

    formDatar.append('activity', activity);
    
    formDatar.append('detail', detail);
    formDatar.append('id', id);

    const x = sessionStorage.getItem("token");

    // var myHeaders = new Headers();
    // myHeaders.append("Authorization", "Bearer "  +  x);
    // myHeaders.append('Content-Type', 'application/json');

    fetch(server+':9000/getactivities/updatebyid', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        headers: { 'Content-Type': 'application/json' , 'Authorization': "Bearer "  +  x }
      },
      mode: 'cors',

      // body: JSON.stringify(formDatar)
    body:JSON.stringify( { detail: detail, id: id, activity: activity})
     }) ;
  }


  export async function sendFile(uid)  {
     console.log("saving/updating image");
    var apiUrl = server+':9000/getactivities/updateimagebyid';
    var keyValue = uid + Date.now();
  // Simple POST request with a JSON body using fetch

  const x = sessionStorage.getItem("token");
  
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' ,  'Authorization': "Bearer "  +  x },
    body: JSON.stringify({ username: uid,  image: keyValue.toUpperCase() })
  };


    const formData = new FormData();
    const fileField = document.querySelector('input[type="file"]');
    formData.append('key',keyValue.toUpperCase());
    formData.append('image', fileField.files[0]);
    formData.append('user', uid);



    await fetch(apiUrl, requestOptions).then(
      fetch(server+':9000/addimage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        headers: { 'Content-Type': 'application/json' , 'Authorization': "Bearer "  +  x }
      },
      mode: 'cors',
      
      body: formData
    })
     );
  }


  function setHeader(time) {
    let message;
    switch ("frienddataview") {
      case 'morning':
        message = 'Viewing friend data';
        break;
      case 'afternoon':
        message = 'Good afternoon!';
        break;
      case 'evening':
        message = 'Good evening!';
        break;
      default:
        message = 'Hello!';
    }
    return message;
  }
  

  function toggleMenu() {
    var menu = document.getElementById("menuItems");
    menu.style.display = menu.style.display === "none" ? "block" : "none";
  }

  

  export default {getuserData,sendFilenoimage,sendtestimage, addfrienddb,deletedatabyid,sendFile,getdatafromlistbyuid,setHeader,toggleMenu,handleImageError}
