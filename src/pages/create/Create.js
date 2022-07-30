import React, { useState } from 'react'
import Select from 'react-select'

// styles
import './Create.css'

const categories = [
  { value: 'development', label: 'Development' },
  { value: 'design', label: 'Design' },
  { value: 'sales', label: 'Sales' },
  { value: 'marketing', label: 'Marketing' },
]

const Create = () => {
  const [name, setName] = useState('')
  const [details, setDetails] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [category, setCategory] = useState('')
  const [assignedUsers, setAssignedUsers] = useState([])

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(name, details, dueDate, category.value)
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
          // value={option}
          />
        </label>
        <label>
          <span>Assign to:</span>
          {/* assignee select dropdown here */}
        </label>
        <button className='btn'>Add Project</button>
      </form>
    </div>
  )
}

export default Create
