import { useState, useEffect } from 'react'
import { useAuthContext } from './useAuthContext'

// firebase imports
import { auth, db } from '../firebase/config'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { doc, updateDoc } from "firebase/firestore"

export const useLogin = () => {
  const [isCancelled, setIsCancelled] = useState(false)
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const { dispatch } = useAuthContext()

  const login = async (email, password) => {
    setError(null)
    setIsPending(true)

    try {
      // login
      const response = await signInWithEmailAndPassword(auth, email, password)
      if (!response) {
        throw new Error("could not complete login")
      }

      // update online status
      // await projectFirestore.collection('users').doc(res.user.uid).update({ online: true })

      const userRef = doc(db, "users", response.user.uid)
      await updateDoc(userRef, { online: true })

      // dispatch login action
      dispatch({ type: 'LOGIN', payload: response.user })

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
    return () => {
      setIsCancelled(true)
    }
  }, [])

  return {
    isPending,
    error,
    login,
  }
}