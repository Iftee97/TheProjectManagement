import React from 'react'

const filterList = ['all', 'mine', 'development', 'design', 'marketing', 'sales']

const ProjectFilter = ({ currentCategory, changeCategory }) => {
  const handleClick = (newCategory) => {
    changeCategory(newCategory)
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