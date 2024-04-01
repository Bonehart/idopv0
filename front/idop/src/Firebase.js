import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, query, where, getDocs, doc, updateDoc } from "firebase/firestore";
import { getAuth, sendPasswordResetEmail, createUserWithEmailAndPassword, signOut, updateProfile, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { addfrienddb } from "./useractions";
import { getDatabase, ref, set, update } from "firebase/database";

// function to get user and friend data out of firebase
// pass two hooks to the function one for the list of data who are friend with user one for a list of users who are not
// the ones who are not are included so that they can populate the list of potential friends

const getuserinfoData = async (user, hookVar, hookVar2) => {

  // reference to friends collection
  const friendsRef = collection(db, "friends");
  const usersDataRef = collection(db, "users");

  // query firebase for friends of user

  try {
    const friendQuery = query(friendsRef, where("user", "==", "user"));


    const querySnapshot = await getDocs(friendQuery);
    // create two empty lists which will be populated with the friends data
    var friendList = [];
    var userList = [];

    //friends id is used for quering the user table in the quaery clauses
    var friendids = [];

    // get back all of the friend_ids from the friends for the user
    querySnapshot.forEach((doc) => {
      friendids.push(doc.data().friend_id);
    });

    // bring back the user data based on the friends id that way we get back the user data for each friend
    const friendsDataQuery = query(usersDataRef, where("uid", "in", friendids));
    const friendsDataQuerysnapshot = await getDocs(friendsDataQuery);

    // bring back data where they're not friend
    const userDataQuery = query(usersDataRef, where("uid", "not-in", friendids));
    const userDataQuerysnapshot = await getDocs(friendsDataQuery);

    var friendData = [];

    // append friends data from firebase
    friendsDataQuerysnapshot.forEach((doc) => {
      friendData.push(doc.data());
    });

    // return a list of users who are friends and not friends
    hookVar(friendList);
    hookVar(userList);

  }
  catch (e) {
    console.log("no dice");
    console.log(e);
  }
};

// Get a database reference to our blog
const firebaseConfig = require('./firebaseConfig.json');

const getFriends = async (user, hookVar,friendrequestshook) => {

          const friendsRef = collection(db, "friends");

          var friendList = [];
          var friendids = [];

          try {
            console.log("getting friends for user:" + user);

            //get confirmed friends//
            const q = query(friendsRef, where("user", "==", user), where("status", "==", true) );
            const querySnapshot = await getDocs(q);

            querySnapshot.forEach((doc) => {
              friendList.push({ id: doc.id, ...doc.data() });
            });

            console.log("friends list c ame through like the council" );
            console.log(friendList);

            // friendids for use in filtering other queries//
            querySnapshot.forEach((doc) => {
              friendids.push(doc.data().friend_id);
            });

            console.log("now running friend IDS" + friendids);


            const friendsDataRef = collection(db, "users");

            // bring back user data for friends, but not the data of the user //
            const r = query(friendsDataRef, where("uid", "in", friendids), where("uid","!=",user ));
            const querySnapshot2 = await getDocs(r);

            var friendData = [];

            querySnapshot2.forEach((doc) => {
              friendData.push(doc.data());
            });

          }
          catch (e) {
            console.log("error in get friends method for some reason");
            console.log(e);
          }

          var friendrequestData = [];

          try{

            const r = query(friendsRef, where("friend_id", "==", user), where("status", "==", false));
            const querySnapshot3 = await getDocs(r);

            querySnapshot3.forEach((doc) => {


              friendrequestData.push(doc.data());
            });

          } catch(e) {
            console.log("something went wrong getting friend requets");
          }

          hookVar(friendList);
          friendrequestshook(friendrequestData);

};



const getUsers = async (hook1, hook2, currentUser) => {
  const friendsRef = collection(db, "friends");
  const friendList = [];

  try {
    const friendsQueryResult = query(friendsRef, where("user", "==", currentUser),where("status", "==", true) );
    const friendsQuerySnapshot = await getDocs(friendsQueryResult);

    friendsQuerySnapshot.forEach((doc) => {
      friendList.push(doc.data().friend_id);
    });
  } catch (e) {
    console.log(e);
  }

  const usersRef = collection(db, "users");
  let usersQueryResult; // Declare it here

  if (friendList.length === 0) {
    usersQueryResult = query(usersRef);
  } else {
    usersQueryResult = query(usersRef, where("uid", "not-in", friendList));
  }

  try {
    const userQuerySnapshot = await getDocs(usersQueryResult);
    var userList = [];

    userQuerySnapshot.forEach((doc) => {
      userList.push({ id: doc.id, ...doc.data() });
    });
    console.log("users is :");

    console.log(userList);

    await hook1(userList);
  } catch (error) {
    console.error("Error fetching users:", error);
  }

  await hook2(false);
};

const addFriend = async (user, friend, hookvar, refresh,friendName,userName  ) => {

  console.log("friendName name is ");
  console.log(friendName);
  // const datab = getDatabase();
  addDoc(collection(db, "friends"), {
    user: user,
    friend_id: friend,
    friendName: friendName,
    userName: userName,
    status: false
  });

  // await dbfunc(user, friend,displayName);

  hookvar(!refresh);

};

const confirmFriend = async (user, friend, friendName,username,setting,dbfunc) => {

  const friendsRef = collection(db, "friends");

  const valueQuery  = query(friendsRef, where("friend_id", "==", friend) );


  try {
    const querySnapshot = await getDocs(valueQuery);

    if (!querySnapshot.empty) {
      // Get the first matching document
      const document = querySnapshot.docs[0];

      // Update the 'status' field of the document
      const documentRef = doc(db, 'friends', document.id);
      await updateDoc(documentRef, { status: setting });

       // add a corresponding record so both users are friends //
        addDoc(collection(db, "friends"), {
          user: friend,
          friend_id: user,
          friendName: friendName ,
          status: true
        });
        await addfrienddb(user, friend,friendName,username);

    } else {
      console.log('No document found with the specified value.');
    }
  } catch (error) {
    console.error('Error updating status: 11', error);
  }


};


const resetpw = async (email) => {
  try {
    const auth = getAuth();
    sendPasswordResetEmail(auth, email)
      .then(() => {
        console.log("password rest");

        // Password reset email sent!
        // ..
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });

  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const registerWithEmailAndPassword = async (name, email, password) => {
  try {

    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;

    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      displayName: name,
      authProvider: "local",
      email,
    });


    await updateProfile(auth.currentUser, { displayName: name }).catch(
      (err) => console.log(err)
    );


  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password).then(console.log(
    )).then(() => {
      window.location.href = '/Home'; // Redirect to the dashboard page after login
    });

  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const logOut = async () => {
  signOut(auth).then(() => {

  }).catch((error) => {

  });
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
export default { app: app };

const checkauth = async (email, password) => {
  firebase.auth().onAuthStateChanged(function (userlog) {
    if (userlog) {
      console.log("user auth has been checked");
    } else {
      // No user is signed in.
    }
  });



};

export { app, checkauth, logOut, resetpw, addFriend, getuserinfoData, getFriends, confirmFriend, registerWithEmailAndPassword, logInWithEmailAndPassword, getUsers };