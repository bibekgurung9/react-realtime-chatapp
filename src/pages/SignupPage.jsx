import React, { useEffect, useState } from 'react'
import { useAuth } from '../utils/AuthContext'
import { Link } from 'react-router-dom'

const SignupPage = () => {
  const { handleUserSignup } = useAuth()

  const [credentials, setCredentials] = useState({
  email: '',
  password1: '',
  password2: '',
  })

  const handleInputChange = (e) => {
    let name = e.target.name
    let value = e.target.value
    setCredentials({...credentials, [name]:value})
  }

  const diplayFull = () => {
    alert("Adding New Users Has Been Disabled. Please use the demo accounts in the login page to use this project.")
  }

  return (
      <div className='auth--container'>
      <div className='form--wrapper'>
        <h1  className='form--header'>Sign Up Page</h1>
        <form onSubmit={(e) => {handleUserSignup(e, credentials)}} className=''>
        <div className='field--wrapper'>
            <label className='form--input'>Name: </label>
            <input 
                  type="text"
                  required
                  name='name'
                  placeholder='Enter Your Name...'
                  value={credentials.name}
                  onChange={handleInputChange}
                  
                  />
          </div>
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
                  name='password1'
                  placeholder='Enter Your Password...'
                  value={credentials.password1}
                  onChange={handleInputChange}
                  
                  />
          </div>
          <div className='field--wrapper'>
            <label className='form--input'>Confirm Password: </label>
            <input 
                  type="password"
                  required
                  name='password2'
                  placeholder='Enter Your Password...'
                  value={credentials.password2}
                  onChange={handleInputChange}
                  
                  />
          </div>
          <div className='field--wrapper'>
            <input 
                  type="submit"
                  required
                  name='Signup'
                  className='btn btn--lg btn--main'
                  value='Sign Up'
                  onChange={handleInputChange}
                  onClick={diplayFull}
                  />
          </div>
        </form>

        <p className='form-link'>Already Have An Account? Login <Link to
        ='/login'>Here</Link></p>
      </div>
    </div>
  )
}

export default SignupPage