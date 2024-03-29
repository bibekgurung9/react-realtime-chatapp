import React,  {useEffect, useState} from 'react'
import { useAuth } from '../utils/AuthContext'
import { useNavigate, Link  } from 'react-router-dom'

const LoginPage = () => {
  const { user, handleUserLogin } = useAuth()
  const navigate = useNavigate()
  
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  })

  useEffect(() => {
    if(user){
      navigate("/")
    }
  }, [])

  const handleInputChange = (e) => {
    let name = e.target.name
    let value = e.target.value
    setCredentials({...credentials, [name]:value})
  }

  return (
    <div className='auth--container'>
      <div className='demo--id'>
        <h2>Please use the demo accounts. <br /> As creating new accounts has been disabled for the demo.</h2>
        <div className='demo'>
          <h3>Demo Account 1</h3>
          <p><span>Email:</span> demouser1@email.com</p>
          <p><span>Password:</span> Demouser1</p>        
        </div>
        <div className='demo'>
          <h3>Demo Account 1</h3>
          <p><span>Email:</span> demouser2@email.com</p>
          <p><span>Password:</span> Demouser2</p>        
        </div>
      </div>

      <div className='form--wrapper'>
      <h1 className='form--header'>Login Page</h1>
        <form onSubmit={(e) => {handleUserLogin(e, credentials)}} className=''>
          <div className='field--wrapper'>
            <label className='form--input'>Email: </label>
            <input 
                  type="email"
                  required
                  name='email'
                  placeholder='Enter Your Email...'
                  value={credentials.email}
                  onChange={handleInputChange}
                  
                  />
          </div>
          <div className='field--wrapper'>
            <label className='form--input'>Password: </label>
            <input 
                  type="password"
                  required
                  name='password'
                  placeholder='Enter Your Password...'
                  value={credentials.password}
                  onChange={handleInputChange}
                  
                  />
          </div>
          <div className='field--wrapper'>
            <input 
                  type="submit"
                  required
                  name='password'
                  className='btn btn--lg btn--main'
                  value='Login'
                  onChange={handleInputChange}
                  />
          </div>
        </form>

        <p className='form-link'>Don't Have An Account? Signup <Link to
        ='/signup' >Here</Link></p>
      </div>
    </div>
  )
}

export default LoginPage