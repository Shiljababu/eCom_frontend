import { useContext } from "react"
import { userContext } from "../context/AuthContextApi"
import { Navigate } from "react-router-dom"

const ProtectedRoute = ({children}) => {
    const {isLoggedIn} = useContext(userContext)
    if (!isLoggedIn){
        return <Navigate to="/login" replace />
    }
    return children
}

export default ProtectedRoute