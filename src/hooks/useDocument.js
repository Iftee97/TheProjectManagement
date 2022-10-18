import { useEffect, useState } from "react"

// firebase imports
import { db } from "../firebase/config"
import { doc, onSnapshot } from "firebase/firestore"

export const useDocument = (firestoreCollection, id) => {
  const [document, setDocument] = useState(null)
  const [error, setError] = useState(null)

  // real-time data for a document
  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, firestoreCollection, id), (doc) => {
      console.log("Current data: ", doc.data())
      setDocument({ ...doc.data(), id: doc.id })
    }, (error) => {
      console.log(error)
      setError('could not fetch data')
    })

    return () => unsubscribe()
  }, [firestoreCollection, id])

  return {
    document,
    error
  }
}

// this hook is used to get a document (in real-time) from a firestore collection