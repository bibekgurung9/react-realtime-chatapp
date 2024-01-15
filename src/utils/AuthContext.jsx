import { createContext, useState, useEffect, useContext } from "react";
import  { account }  from "../appwriteConfig";
import { useNavigate } from "react-router-dom";
import { ID } from "appwrite";

const AuthContext = createContext()

export const AuthProvider = ({children}) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const navigate = useNavigate()

  useEffect(() => {
    // Load user details on component mount
    getUserOnLoad()
  }, []);

  const getUserOnLoad = async () => {
    try{
      // Fetch user account details
      const accountDetails = await account.get();
      console.log('Account Details: ', accountDetails)
      setUser(accountDetails)
    } catch(error){
      console.info(error);
    }
    setLoading(false)
  }

  const handleUserLogin = async (e, credentials) => {
      e.preventDefault()
      console.log("Credentials: ", credentials)
      try{
        // Create email session and get user details on successful login
        const response = await account.createEmailSession(credentials.email, credentials.password);
        console.log("Logged In: ", response)
        const accountDetails = await account.get();
        setUser(accountDetails)

        navigate('/')
      } catch(error){
        console.error(error);
      }
  }

  const handleUserLogout = async () => {
    // Delete the current session and set the user to null on logout
    await account.deleteSession('current')
    setUser(null)
  }

  const handleUserSignup = async (e, credentials) => {
    e.preventDefault()
    // Check if passwords match
    if(credentials.password1 !== credentials.password2){
      alert('passwords do not match')
    }

    try{
      // Create a new user account, log in, and get user details on successful signup
      let response = await account.create(
        ID.unique(),
        credentials.email,
        credentials.password1,
        credentials.name,
      )
      console.log("user signup", response);
      await account.createEmailSession(credentials.email, credentials.password1)

      const accountDetails = await account.get();
      console.log('Account Details: ', accountDetails)
      setUser(accountDetails)
      navigate('/')
    } catch(error){
      console.info(error);
    }
  }

  const contextData = {
    user,
    handleUserLogin,
    handleUserLogout,
    handleUserSignup,
  }

  return(
    <AuthContext.Provider value={contextData}>
      {loading ? <p>Loading...</p> : children}
    </AuthContext.Provider>
  )
}
export const useAuth = () => { return useContext(AuthContext) }

export default AuthContext;