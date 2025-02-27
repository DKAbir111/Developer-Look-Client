import { useContext } from "react"
import AuthContext from "../context/AuthContext"
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
    const { user, loading } = useContext(AuthContext)
    if (loading) {
        return <div>Loading...</div>
    }
    if (user?.email) {
        return children;
    }
    return (

        <Navigate to={'/'}>

        </Navigate>
    )
}
