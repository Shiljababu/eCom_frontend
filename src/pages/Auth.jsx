import React, { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { userContext } from "../context/AuthContextApi"
import { registerUserApi } from "../service/allAPI"

  const Auth = ({ insideRegister }) => {
  const [userData, setUserData] = useState({ name: "", email: "", password: "" })
  const navigate = useNavigate()
  const { login } = useContext(userContext)

  const handleRegister = async (e) => {
    e.preventDefault()
    if (userData.name && userData.email && userData.password) {
      try {
        const response = await registerUserApi(userData)
        if (response.status === 201) {
          alert(`Welcome ${response.data.user.name}, registered successfully!`)
          setUserData({ name: "", email: "", password: "" })
          navigate("/login")
        } else if (response.status === 409) {
          alert(response.data.message)
        }
      } catch (error) {
        console.log(error)
        alert("Something went wrong. Please try again.")
      }
    }
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    if (userData.email && userData.password) {
      try {
        const result = await login({ email: userData.email, password: userData.password })
        console.log("result",result);
        
        if (result.success) {
          alert("Login successful!")
          setUserData({ name: "", email: "", password: "" })
          navigate("/")
        } else {
          alert(result.message || "Invalid credentials")
        }
      } catch (error) {
        console.error("Login error:", error)
        alert("Login failed. Please try again.")
      }
    }
  }

  return (
    <div className="flex font-poppins items-center justify-center">
      <div className="flex justify-center items-center dark:bg-gray-900 min-h-screen">
        <div className="grid gap-8">
          <div id="back-div" className="bg-linear-to-r from-blue-500 to-purple-500 rounded-[26px] m-4">
            <div className="border-20 border-transparent rounded-[20px] dark:bg-gray-900 bg-white shadow-lg xl:p-2 2xl:p-10 lg:p-10 md:p-10 sm:p-2 m-2">
              <h1 className="pt-2 pb-2 font-bold dark:text-gray-400 text-5xl text-center cursor-default">
                {insideRegister ? "Sign Up" : "Log In"}
              </h1>

              <form className="space-y-4">
                {insideRegister && (
                  <div>
                    <label className="mb-2 dark:text-gray-400 text-lg">Name</label>
                    <input
                      className="border p-3 dark:bg-indigo-700 dark:text-gray-300 shadow-md border-gray-300 rounded-lg w-full"
                      type="text"
                      placeholder="Name"
                      value={userData.name}
                      onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                    />
                  </div>
                )}

                <div>
                  <label className="mb-2 dark:text-gray-400 text-lg">Email</label>
                  <input
                    className="border p-3 dark:bg-indigo-700 dark:text-gray-300 shadow-md border-gray-300 rounded-lg w-full"
                    type="email"
                    placeholder="Email"
                    value={userData.email}
                    onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                  />
                </div>

                <div>
                  <label className="mb-2 dark:text-gray-400 text-lg">Password</label>
                  <input
                    className="border p-3 shadow-md dark:bg-indigo-700 dark:text-gray-300 border-gray-300 rounded-lg w-full"
                    type="password"
                    placeholder="Password"
                    value={userData.password}
                    onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                  />
                </div>

                {insideRegister ? (
                  <button
                    onClick={handleRegister}
                    className="bg-linear-to-r dark:text-gray-300 from-blue-500 to-purple-500 shadow-lg mt-6 p-2 text-white rounded-lg w-full hover:scale-105 transition duration-300 ease-in-out"
                  >
                    Sign Up
                  </button>
                ) : (
                  <button
                    onClick={handleLogin}
                    className="bg-linear-to-r dark:text-gray-300 from-blue-500 to-purple-500 shadow-lg mt-6 p-2 text-white rounded-lg w-full hover:scale-105 transition duration-300 ease-in-out"
                  >
                    Log In
                  </button>
                )}
              </form>

              <div className="flex flex-col mt-4 items-center justify-center text-sm">
                {insideRegister ? (
                  <h3 className="dark:text-gray-300">
                    Already have an account?{" "}
                    <a href="/login" className="text-blue-400 hover:underline">
                      Login
                    </a>
                  </h3>
                ) : (
                  <h3 className="dark:text-gray-300">
                    Don't have an account?{" "}
                    <a href="/register" className="text-blue-400 hover:underline">
                      Sign Up
                    </a>
                  </h3>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Auth
