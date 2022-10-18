import { useReducer, useEffect, useState } from "react"

// firebase imports
import { db } from "../firebase/config"
import { collection, Timestamp, doc, addDoc, deleteDoc, updateDoc } from "firebase/firestore"

let initialState = {
  document: null,
  isPending: false,
  error: null,
  success: null
}

const firestoreReducer = (state, action) => {
  switch (action.type) {
    case 'IS_PENDING':
      return {
        isPending: true,
        document: null,
        success: false,
        error: null
      }

    case 'ADDED_DOCUMENT':
      return {
        isPending: false,
        document: action.payload,
        success: true,
        error: null
      }

    case 'DELETED_DOCUMENT':
      return {
        isPending: false,
        document: null,
        success: true,
        error: null
      }

    case 'UPDATED_DOCUMENT':
      return {
        isPending: false,
        document: action.payload,
        success: true,
        error: null
      }

    case 'ERROR':
      return {
        isPending: false,
        document: null,
        success: false,
        error: action.payload
      }

    default:
      return state
  }
}

export const useFirestore = (firestoreCollection) => {
  const [response, dispatch] = useReducer(firestoreReducer, initialState)
  const [isCancelled, setIsCancelled] = useState(false)

  // only dispatch is not cancelled
  const dispatchIfNotCancelled = (action) => {
    if (!isCancelled) {
      dispatch(action)
    }
  }

  // add a document
  const addDocument = async (doc) => {
    dispatch({ type: 'IS_PENDING' })
    const ref = collection(db, firestoreCollection)

    try {
      const createdAt = Timestamp.fromDate(new Date())
      const addedDocument = await addDoc(ref, { ...doc, createdAt })
      dispatchIfNotCancelled({ type: 'ADDED_DOCUMENT', payload: addedDocument })
    } catch (err) {
      dispatchIfNotCancelled({ type: 'ERROR', payload: err.message })
    }
  }

  // delete a document
  const deleteDocument = async (id) => {
    dispatch({ type: 'IS_PENDING' })
    const ref = doc(db, firestoreCollection, id)

    try {
      await deleteDoc(ref)
      dispatchIfNotCancelled({ type: 'DELETED_DOCUMENT' })
    } catch (err) {
      dispatchIfNotCancelled({ type: 'ERROR', payload: 'could not delete' })
    }
  }

  // update documents
  const updateDocument = async (id, updates) => {
    dispatch({ type: 'IS_PENDING' })
    const ref = doc(db, firestoreCollection, id)

    try {
      const updatedDocument = await updateDoc(ref, updates)
      dispatchIfNotCancelled({ type: 'UPDATED_DOCUMENT', payload: updatedDocument })
      return updatedDocument
    } catch (err) {
      dispatchIfNotCancelled({ type: 'ERROR', payload: err.message })
      return null
    }
  }

  useEffect(() => {
    return () => setIsCancelled(true)
  }, [])

  return {
    addDocument,
    deleteDocument,
    updateDocument,
    response
  }
}

// this custom hook is used to access the firestore database
// to add and, update and delete documents