import React, { useCallback, useContext, useEffect, useState } from "react";
import useAuthentication from '../composable/authentication';
import AXIOS from "../setting/axios";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState();
  const { login, register, authenticatedUser, logout } = useAuthentication()

  const loadAuthenticatedUser = useCallback(async() => {
    const token = localStorage.getItem('_token')
    if(token)
    {
     try {
      const response = await authenticatedUser();
      setCurrentUser(response.data);
     } catch (error) {
      localStorage.removeItem('_token')
      delete AXIOS.defaults.headers.Authorization
     }
    }

    setLoading(false)
  },[])

  useEffect(() => {
    loadAuthenticatedUser();
  }, []);

  // signup function
  async function signup(payload) {
    return await register(payload);
  }

  // login function
  async function userLogin(email, password) {
   return await login({email, password})
  }

  // logout function
 async function userLogout() {
   try {
    await logout();
    localStorage.removeItem('_token')
    delete AXIOS.defaults.headers.Authorization
    setCurrentUser(null);
   } catch (error) {
    
   }
  }

  // logout function
  function setLoginUser(user) {
    setCurrentUser(user)
  }
  

  const value = {
    currentUser,
    setLoginUser,
    signup,
    userLogin,
    userLogout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
