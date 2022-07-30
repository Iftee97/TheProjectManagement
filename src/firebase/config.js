import firebase from "firebase/app"
import "firebase/firestore"
import "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyBLvFuxcAGL2gA19lTUZfOajehQE1XIOF4",
  authDomain: "theprojectmanagementsite-59b95.firebaseapp.com",
  projectId: "theprojectmanagementsite-59b95",
  storageBucket: "theprojectmanagementsite-59b95.appspot.com",
  messagingSenderId: "673832428300",
  appId: "1:673832428300:web:c7bd1961f629091d361f29"
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig)

// Initialize Firestore & Auth
const projectFirestore = firebase.firestore()
const projectAuth = firebase.auth()

