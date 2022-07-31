import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import { useCollection } from '../../hooks/useCollection'
import { timestamp } from '../../firebase/config'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useFirestore } from '../../hooks/useFirestore'
import { useHistory } from 'react-router-dom'

// styles
import './Create.css'

const categories = [
  { value: 'development', label: 'Development' },
  { value: 'design', label: 'Design' },
  { value: 'sales', label: 'Sales' },
  { value: 'marketing', label: 'Marketing' },
]

const Create = () => {
  const { addDocument, response } = useFirestore('projects')
  const { documents } = useCollection('users')
  const [users, setUsers] = useState([])
  const { user } = useAuthContext()

  // form field values
  const [name, setName] = useState('')
  const [details, setDetails] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [category, setCategory] = useState('')
  const [assignedUsers, setAssignedUsers] = useState([])
  const [formError, setFormError] = useState(null)

  const history = useHistory()

  useEffect(() => {
    if (documents) {
      const options = documents.map(user => {
        return {
          value: user,
          label: user.displayName
        }
      })
      setUsers(options)
    }
  }, [documents])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormError(null)

    if (!category) {
      setFormError('Please select a project category')
      return
    }
    if (assignedUsers.length < 1) {
      setFormError('Please assign at least one user for the project')
      return
    }

    const createdBy = {
      displayName: user.displayName,
      photoURL: user.photoURL,
      id: user.uid
    }
    const assignedUsersList = assignedUsers.map(u => {
      return {
        displayName: u.value.displayName,
        photoURL: u.value.photoURL,
        id: u.value.id
      }
    })

    const project = {
      name,
      details,
      category: category.value,
      dueDate: timestamp.fromDate(new Date(dueDate)),
      comments: [],
      createdBy,
      assignedUsersList
    }

    // add the project to firestore database in 'projects' collection
    await addDocument(project)

    // redirect to dashboard
    if (!response.error) {
      history.push('/')
    }
  }

  return (
    <div className='create-form' onSubmit={handleSubmit}>
      <h2 className='page-title'>Create a new project</h2>
      <form>
        <label>
          <span>Project Name:</span>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <label>
          <span>Project Details:</span>
          <textarea
            type="text"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            required
          ></textarea>
        </label>
        <label>
          <span>Set Due Date:</span>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
          />
        </label>
        <label>
          <span>Project Category:</span>
          <Select
            options={categories}
            onChange={(option) => setCategory(option)}
          />
        </label>
        <label>
          <span>Assign to:</span>
          <Select
            options={users}
            onChange={(option) => setAssignedUsers(option)}
            isMulti
          />
        </label>
        <button className='btn'>Add Project</button>
        {formError && <p className='error'>{formError}</p>}
      </form>
    </div>
  )
}

export default Create
