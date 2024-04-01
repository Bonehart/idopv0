export async function postactivity(tokenid, userid, activity, detail, displayName) {

  var apiUrl = 'http://localhost:9000/newactivity';
  var myHeaders = new Headers();
  var imageString;
  myHeaders.append("Authorization", "Bearer" + " " + tokenid);
  myHeaders.append('Content-Type', 'application/json');

  const fileField = document.querySelector('input[type="file"]');
  var keyValue = userid + Date.now();
  console.log("file field is :");
  console.log(fileField.files[0]);

  if (fileField.value == "") {

    imageString = "";
  }

  else {

    imageString = keyValue.toUpperCase();
  }


  // Simple POST request with a JSON body using fetch
  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: JSON.stringify({ username: userid, activity: activity, detail: detail, displayName: displayName, image: imageString })
  };

  const formData = new FormData();

  if (fileField.value !== "") {
    try {

      formData.append('username', userid);
      formData.append('key', keyValue.toUpperCase());
      formData.append('image', fileField.files[0]);
      formData.append('displayName', displayName);

      await fetch(apiUrl, requestOptions).then(
        fetch('http://localhost:9000/addimage', {
          method: 'POST',
          mode: 'cors',

          body: formData
        })
      );

    } catch (error) { console.log(error) };

  } else {

    console.log('no image was found');
    formData.append('username', userid);
    formData.append('key', keyValue.toUpperCase());
    formData.append('displayName', displayName);

    await fetch(apiUrl, requestOptions);

  }

};

export default postactivity;