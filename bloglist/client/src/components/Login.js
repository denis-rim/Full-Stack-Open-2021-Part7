import React, { useState } from 'react'
import Notification from './Notification'
import { useDispatch } from 'react-redux'
import { setLoginUser } from '../store/actions/login'

const Login = () => {
  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()
    dispatch(setLoginUser(username, password))
  }

  return (
    <div className="login">
      <div>
        <h3>Login to Blog App</h3>
        <Notification />
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              id="username"
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              id="password"
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button id="login-button" type="submit">
            login
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
