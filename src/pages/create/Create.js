import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import { useCollection } from '../../hooks/useCollection'

// styles
import './Create.css'

const categories = [
  { value: 'development', label: 'Development' },
  { value: 'design', label: 'Design' },
  { value: 'sales', label: 'Sales' },
  { value: 'marketing', label: 'Marketing' },
]

const Create = () => {
  const { documents } = useCollection('users')
  const [users, setUsers] = useState([])

  const [name, setName] = useState('')
  const [details, setDetails] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [category, setCategory] = useState('')
  const [assignedUsers, setAssignedUsers] = useState([])

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

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(name, details, dueDate, category.value, assignedUsers)

    setName('')
    setDetails('')
    setDueDate('')
    setCategory('')
    setAssignedUsers([])
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
      </form>
    </div>
  )
}

export default Create
