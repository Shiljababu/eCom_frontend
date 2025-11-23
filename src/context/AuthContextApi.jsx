import React, { createContext, useState, useEffect } from "react"
import { getSingleUserApi, loginUserApi, logoutUserApi } from "../service/allAPI"


export const userContext = createContext()

const AuthContextApi = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const verifySession = async () => {
      try {
        const res = await getSingleUserApi()
        console.log("res",res);
        
        if (res.status === 200 && res.data.user) {
          setUser(res.data.user)
          setIsLoggedIn(true)
        } else {
          setUser(null)
          setIsLoggedIn(false)
        }
      } catch (err) {
        if(err.response && err.response.status === 403){
          alert("Your account has been disabled by the Admin.")
        }
        setUser(null)
        setIsLoggedIn(false)
      }
    }

    verifySession()
  }, [])

  const login = async (userData) => {
    try {
      const response = await loginUserApi(userData)
      console.log("response",response);
      
      if (response.status === 200) {
        const loggedUser = response.data.user
        console.log("logged user", loggedUser);
        
        if (loggedUser.status === "Inactive") {
          alert("Your account is deactivated. Please contact admin.")
          return { success: false }
        }

        setIsLoggedIn(true)
        setUser(loggedUser)
        return { success: true }
      }

      return { success: false, message: response.data.message }
    } catch (error) {
      console.log("Login error:", error)
      return { success: false, message: "Login failed" }
    }
  }

  const logout = async () => {
    try {
      await logoutUserApi()
    } catch (err) {
      console.error("Logout error:", err)
    }
    setIsLoggedIn(false)
    setUser(null)
  }

  return (
    <userContext.Provider value={{ isLoggedIn, user, login, logout }}>
      {children}
    </userContext.Provider>
  )
}

export default AuthContextApi
