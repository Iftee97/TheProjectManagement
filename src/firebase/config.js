import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyBLvFuxcAGL2gA19lTUZfOajehQE1XIOF4",
  authDomain: "theprojectmanagementsite-59b95.firebaseapp.com",
  projectId: "theprojectmanagementsite-59b95",
  storageBucket: "theprojectmanagementsite-59b95.appspot.com",
  messagingSenderId: "673832428300",
  appId: "1:673832428300:web:c7bd1961f629091d361f29"
}

// initialize firebase
initializeApp(firebaseConfig)

// initilize firebase services -- firestore and auth
const db = getFirestore()
const auth = getAuth()
const storage = getStorage()

export {
  db,
  auth,
  storage
}