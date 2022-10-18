import { useEffect, useState } from 'react'
import { useAuthContext } from './useAuthContext'

// firebase imports
import { db, auth } from '../firebase/config'
import { doc, updateDoc } from "firebase/firestore"
import { signOut } from 'firebase/auth'

export const useLogout = () => {
  const [isCancelled, setIsCancelled] = useState(false)
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const { dispatch, user } = useAuthContext()

  const logout = async () => {
    setError(null)
    setIsPending(true)

    try {
      // update online to false status
      const { uid } = user // destructuring uid from user
      // await projectFirestore.collection('users').doc(uid).update({ online: false })
      const userRef = doc(db, "users", uid)
      await updateDoc(userRef, { online: false })

      // sign the user out
      await signOut(auth)

      // dispatch logout action
      dispatch({ type: 'LOGOUT' })

      // update state
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
    error,
    isPending,
    logout
  }
}