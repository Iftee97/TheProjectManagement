import React, { useState } from 'react'
import { useLogin } from '../../hooks/useLogin'

// styles
import './Login.css'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login, isPending, error } = useLogin()

  const handleSubmit = (e) => {
    e.preventDefault()
    // console.log(email, password)
    login(email, password)

    setEmail('')
    setPassword('')
  }

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h2>login</h2>
      <label>
        <span>email:</span>
        <input
          required
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <label>
        <span>password:</span>
        <input
          required
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      {!isPending && <button className='btn'>Login</button>}
      {isPending && <button className='btn' disabled>Loading...</button>}
      {error && <div className='error'>{error}</div>}
    </form>
  )
}

export default Login