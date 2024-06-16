import { createContext, useState, useContext} from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext()

export const useAuth = ()=>{
  return useContext(AuthContext)
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const[authToken, setAuthToken] = useState(null)

  const navigate = useNavigate()

  const loginUser = async (e)=>{
    e.preventDefault()
    const data = {
      username: e.target.username.value,
      password: e.target.password.value
    }

    const URL = 'http://127.0.0.1:8000/api/token/'
    try{
      const response = await fetch(URL, {
        method:"POST", 
        headers : {
          "Content-Type":"application/json",
        },
        body : JSON.stringify(data)
      })
      if(response.ok){
        const response_data = await response.json()
        setUser(response_data.access)
        setAuthToken(response_data)
        localStorage.setItem('AuthToken', JSON.stringify(response_data))
        navigate('/todo')
      }
      else {
        throw new Error('Network response was not OK!');
      }
    }
    catch(error){
      console.log(error)
    }

  }

  const contextData = {
    user:user,
    loginUser:loginUser,
    authToken:authToken
  }

  return (
    <AuthContext.Provider value={contextData}>
      {children}
    </AuthContext.Provider>
  )
}