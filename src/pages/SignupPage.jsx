import React, { useState } from 'react'
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

  return (
      <div className='auth--container'>
      <div className='form--wrapper'>
        <h1>SignUp Page</h1>
        <form onSubmit={(e) => {handleUserSignup(e, credentials)}} className=''>
        <div className='field--wrapper'>
            <label htmlFor="">Name: </label>
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
            <label htmlFor="">Email: </label>
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
            <label htmlFor="">Password: </label>
            <input 
                  type="password"
                  required
                  name='password1'
                  placeholder='Enter Your password...'
                  value={credentials.password1}
                  onChange={handleInputChange}
                  
                  />
          </div>
          <div className='field--wrapper'>
            <label htmlFor="">Confirm Password: </label>
            <input 
                  type="password"
                  required
                  name='password2'
                  placeholder='Enter Your password...'
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
                  value='Login'
                  onChange={handleInputChange}
                  />
          </div>
        </form>

        <p>Already Have An Account? Login <Link to
        ='/login'>Here</Link></p>
      </div>
    </div>
  )
}

export default SignupPage