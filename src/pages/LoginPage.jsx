import React,  {useEffect, useState} from 'react'
import { useAuth } from '../utils/AuthContext'
import { useNavigate } from 'react-router-dom'

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
      <div className='form--wrapper'>
        <form onSubmit={(e) => {handleUserLogin(e, credentials)}} className=''>
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
            <label htmlFor="">Passowrd: </label>
            <input 
                  type="password"
                  required
                  name='password'
                  placeholder='Enter Your password...'
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
      </div>
    </div>
  )
}

export default LoginPage