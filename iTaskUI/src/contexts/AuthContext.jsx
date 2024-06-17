import { createContext, useState, useContext, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";  
import Tostify from "../components/Tostify";

const AuthContext = createContext()

export const useAuth = ()=>{
  return useContext(AuthContext)
};

export const AuthProvider = ({ children }) => {
  const authTokenFromStorage = localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null;
  const userFromToken = authTokenFromStorage ? jwtDecode(authTokenFromStorage.access) : null;

  const [user, setUser] = useState(() => userFromToken);
  const [authToken, setAuthToken] = useState(() => authTokenFromStorage);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate()

  useEffect(()=>{
    if (loading) {
      updateToken();
    }

    let four_minutes = 1000 * 60 * 4
    let interval = setInterval(() => {
      if(authToken){
        updateToken()
      }
    }, four_minutes);

    return ()=> clearInterval(interval)
  },[authToken, loading])

  const tostify_msg =(type, message)=>{
    Tostify(type, message)
  }

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
        setUser(jwtDecode(response_data.access))
        setAuthToken(response_data)
        localStorage.setItem('authTokens', JSON.stringify(response_data))
        navigate('/todo')
      }
      else if (response.status === 401) {
        tostify_msg("error","Invalid credentials provided !" )
      }
      else {
        throw new Error('Network response was not OK!');
      }
    }
    catch(error){
      console.log(error)
    }

  }

  const logoutUser = ()=>{
    setUser(null)
    setAuthToken(null)
    localStorage.removeItem('authTokens')
    navigate('/login')
  }

  const updateToken = async () => {
    console.log("update token was called");
    const refresh_token = authToken?.refresh;
    
    if (!refresh_token) {
      console.log("No refresh token available");
      setLoading(false);
      return;
    }
  
    const URL = 'http://127.0.0.1:8000/api/token/refresh/';
    try {
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 'refresh': refresh_token })
      });
      
      if (response.ok) {
        const response_data = await response.json();
        setUser(jwtDecode(response_data.access));
        setAuthToken(response_data);
        localStorage.setItem('authTokens', JSON.stringify(response_data));
      } else {
        if (response.status === 401) {
          logoutUser();
        }
        throw new Error('Network response was not OK!');
      }
    }
    catch (error) {
      console.log("Error refreshing token:", error.message);
    }
    finally {
      if (loading) {
        setLoading(false);
      }
    }
  };
  
  const contextData = {
    user:user,
    authToken:authToken,
    loginUser:loginUser,
    logoutUser:logoutUser,
  }

  return (
    <AuthContext.Provider value={contextData}>
      {loading?null:children}
    </AuthContext.Provider>
  )
}