import { useEffect, useState, useRef } from "react"

// firebase imports
import { db } from "../firebase/config"
import { collection, onSnapshot, query, where, orderBy } from 'firebase/firestore'

export const useCollection = (firestoreCollection, _query, _orderBy) => {
  const [documents, setDocuments] = useState(null)
  const [error, setError] = useState(null)

  // if we don't use a ref --> infinite loop in useEffect
  // because _query and _orderBy are arrays (reference types) and are different on every function call
  const queryRef = useRef(_query).current
  const orderByRef = useRef(_orderBy).current

  useEffect(() => {
    let ref = collection(db, firestoreCollection)

    if (queryRef && orderByRef) {
      ref = query(ref, where(...queryRef), orderBy(...orderByRef))
    }

    // get real-time documents
    const unsubscribe = onSnapshot(ref, (snapshot) => {
      const results = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id
      }))
      setDocuments(results)
      setError(null)
    }, (error) => {
      console.log(error)
      setError('could not fetch data')
    })

    // unsubscribe on unmount
    return () => {
      unsubscribe()
    }

  }, [firestoreCollection, queryRef, orderByRef])

  return {
    documents,
    error
  }
}

// this custom hook is used to access the stored documens in the firestore database
// and use them in the application frontend