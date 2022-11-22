import React, { useState } from 'react'
import { useCollection } from '../../hooks/useCollection'
import ProjectList from '../../components/ProjectList'
import ProjectFilter from './ProjectFilter'
import { useAuthContext } from '../../hooks/useAuthContext'

// styles
import './Dashboard.css'

const Dashboard = () => {
  const { documents, error } = useCollection('projects')
  const [currentCategory, setCurrentCategory] = useState('all')
  const { user } = useAuthContext()

  const changeCategory = (newCategory) => {
    setCurrentCategory(newCategory)
  }

  const projects = documents ? documents.filter((document) => {
    switch (currentCategory) {
      case 'all':
        return true

      case 'mine': // for projects that are assigned to the current logged in user
        let assignedToMe = false
        document.assignedUsersList.forEach((u) => {
          if (user.uid === u.id) {
            assignedToMe = true
          }
        })
        return assignedToMe

      case 'development':
      case 'design':
      case 'sales':
      case 'marketing':
        console.log(document.category, currentCategory)
        return document.category === currentCategory

      default:
        return true
    }
  }) : null

  return (
    <div>
      <h2 className='page-title'>Dashboard</h2>
      {error && <p className='error'>{error}</p>}
      {documents && (
        <ProjectFilter
          currentCategory={currentCategory}
          changeCategory={changeCategory}
        />
      )}
      {projects && <ProjectList projects={projects} />}
    </div>
  )
}

export default Dashboard