import { createContext, useState, useEffect, useContext } from "react";
import  { account }  from "../appwriteConfig";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext()

export const AuthProvider = ({children}) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const navigate = useNavigate()

  useEffect(() => {
    setLoading(false)
  }, []);


  const handleUserLogin = async (e, credentials) => {
      e.preventDefault()
      console.log("Credentials: ", credentials)
      try{
        const response = await account.createEmailSession(credentials.email, credentials.password);
        console.log("Logged In: ", response)
        const accountDetails = account.get();
        setUser(accountDetails)

        navigate('/')
      } catch(error){
        console.error(error);
      }
  }

  const contextData = {
    user,
    handleUserLogin,
  }

  return(
    <AuthContext.Provider value={contextData}>
      {loading ? <p>Loading...</p> : children}
    </AuthContext.Provider>
  )
}
export const useAuth = () => { return useContext(AuthContext) }

export default AuthContext;