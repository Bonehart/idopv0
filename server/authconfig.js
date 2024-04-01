const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');
const {getAuth } = require('firebase-admin/auth');
const { collection, getDocs } = require('firebase/firestore');

const serviceAccount = require('../keys.json');
console.log("uummm");
const app = initializeApp({
  credential: cert(serviceAccount)
});


const db = getFirestore(app);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

console.log("peanut butter jellyfish");

