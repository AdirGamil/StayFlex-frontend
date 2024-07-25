import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'

import { userService } from '../services/user'
import { login } from '../store/actions/user.actions'

export function Login() {
  const [users, setUsers] = useState([])
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
    fullname: '',
  })

  const navigate = useNavigate()

  useEffect(() => {
    loadUsers()
  }, [])

  async function loadUsers() {
    const users = await userService.getUsers()
    setUsers(users)
  }

  async function onLogin(ev = null) {
    if (ev) ev.preventDefault()

    if (!credentials.username) return
    await login(credentials)
    navigate('/')
  }

  function handleChange(ev) {
    const field = ev.target.name
    const value = ev.target.value
    setCredentials({ ...credentials, [field]: value })
  }

  return (
    <form className="login-form" onSubmit={onLogin}>
        <h1 className="login-title">Welcome to StayFlex</h1>
      <label className="label" htmlFor="select-username">
        Select User
      </label>

      <select
        name="username"
        className="input select-input"
        value={credentials.username}
        onChange={handleChange}
      >
        <option value="">Select User</option>
        {users.map((user) => (
          <option key={user._id} value={user.username}>
            {user.fullname}
          </option>
        ))}
      </select>

      <label className="label" htmlFor="input-username">
        Username
      </label>
      <input
        id="input-username"
        className="input text-input"
        type="text"
        name="username"
        value={credentials.username}
        onChange={handleChange}
      />

      <label className="label" htmlFor="input-password">
        Password
      </label>
      <input
        id="input-password"
        className="input password-input"
        type="password"
        name="password"
        value={credentials.password}
        onChange={handleChange}
      />
      <button className='login-btn'>Login</button>
    </form>
  )
}
