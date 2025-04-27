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
      setDocument({ ...doc.data(), id: doc.id })
    }, (error) => {
      console.log(error)
      setError('could not fetch data')
    })

    return () => {
      unsubscribe()
    }
  }, [firestoreCollection, id])

  return {
    document,
    error
  }
}

// React hook for real-time updates of a single Firestore document.
// Accepts a collection name and document ID, and returns the document data and error state.
