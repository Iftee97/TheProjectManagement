import { useEffect, useState } from "react"
import { projectFirestore } from "../firebase/config"

export const useDocument = (collection, id) => {
  const [document, setDocument] = useState(null)
  const [error, setError] = useState(null)

  // realtime data for document
  useEffect(() => {
    const ref = projectFirestore.collection(collection).doc(id) // document ref

    const unsubscribe = ref.onSnapshot((snapshot) => {
      if (snapshot.data()) {
        setDocument({ ...snapshot.data(), id: snapshot.id })
        setError(null)
      } else {
        setError('no such document exists')
      }
    }, (err) => {
      console.log(err.message)
      setError('failed to get document')
    })

    // clean up
    return () => {
      unsubscribe()
    }
  }, [collection, id])

  return {
    document,
    error
  }
}

// this hook is used to get a document from a firestore collection
