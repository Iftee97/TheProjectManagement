import { useEffect, useState } from "react"
import { db } from "../firebase/config"
import { doc, getDoc } from "firebase/firestore"

export const useDocument = (firestoreCollection, id) => {
  const [document, setDocument] = useState(null)
  const [error, setError] = useState(null)

  // real-time data for document -- needs work
  useEffect(() => {
    const getDocument = async () => {
      const docRef = doc(db, firestoreCollection, id);
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data())
        setDocument({ ...docSnap.data(), id: docSnap.id })
      } else {
        setError("No such document!")
      }
    }
    getDocument()
  }, [firestoreCollection, id])

  return {
    document,
    error
  }
}

// this hook is used to get a document (in real-time) from a firestore collection