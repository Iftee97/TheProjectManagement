import React, { useState } from 'react'

const filterList = ['all', 'mine', 'development', 'design', 'marketing', 'sales']

const ProjectFilter = () => {
  const [currentCategory, setCurrentCategory] = useState('all')

  const handleClick = (newCategory) => {
    console.log(newCategory)
    setCurrentCategory(newCategory)
  }

  return (
    <div className='project-filter'>
      <nav>
        <p>Filter by:</p>
        {filterList.map(category => (
          <button
            key={category}
            onClick={() => handleClick(category)}
            className={`${currentCategory === category ? 'active' : ''}`}
          >
            {category}
          </button>
        ))}
      </nav>
    </div>
  )
}

export default ProjectFilter
