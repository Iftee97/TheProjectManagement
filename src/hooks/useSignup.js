import { useState, useEffect } from 'react'
import { useAuthContext } from './useAuthContext'

// firebase imports
import { db, auth, storage } from "../firebase/config"
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import { doc, setDoc } from "firebase/firestore"
// import { collection, addDoc, } from "firebase/firestore"

export const useSignup = () => {
  const [isCancelled, setIsCancelled] = useState(false)
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const { dispatch } = useAuthContext()

  const signup = async (email, password, displayName, thumbnail) => {
    setError(null)
    setIsPending(true)

    try {
      // signup a user
      const response = await createUserWithEmailAndPassword(auth, email, password)
      if (!response) {
        throw new Error('Could not complete signup')
      }

      // // upload user thumbnail
      // const uploadPath = `thumbnails/${response.user.uid}/${thumbnail.name}`
      // const img = await projectStorage.ref(uploadPath).put(thumbnail)
      // const imgUrl = await img.ref.getDownloadURL()

      // // add displayName and photoURL to user
      // await response.user.updateProfile({ displayName, photoURL: imgUrl })

      // // create a user document in firestore database
      // await projectFirestore.collection('users').doc(response.user.uid).set({
      //   online: true,
      //   displayName,
      //   photoURL: imgUrl,
      // })

      const storageRef = ref(storage, `thumbnails/${response.user.uid}/${thumbnail.name}`)
      const uploadTask = uploadBytesResumable(storageRef, thumbnail)
      uploadTask.on('state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          console.log('Upload is' + progress + '% done')
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused')
              break

            case 'running':
              console.log('Upload is running')
              break

            default:
              break
          }
        },
        (error) => {
          console.log(error)
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(
            async (downloadURL) => {
              // await addDoc(collection(db, "users"), {
              //   online: true,
              //   displayName,
              //   photoURL: imgUrl,
              //   uid: response.user.uid
              // }) // adding user info to firestore database in "users" collection

              await setDoc(doc(db, "users", response.user.uid), {
                online: true,
                displayName,
                photoURL: downloadURL,
              }) // adding user info to firestore database in "users" collection

              await updateProfile(response.user, {
                displayName,
                photoURL: downloadURL
              }) // updating user profile with displayName and photoURL

              dispatch({ type: "LOGIN", payload: response.user }) // dispatch LOGIN action
            }
          )
        }
      )

      // update state as long as the component has not unmounted
      if (!isCancelled) {
        setIsPending(false)
        setError(null)
      }
    } catch (err) {
      if (!isCancelled) {
        setError(err.message)
        setIsPending(false)
      }
    }
  }

  useEffect(() => {
    return () => setIsCancelled(true)
  }, [])

  return {
    isPending,
    error,
    signup
  }
}
