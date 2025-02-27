import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
    const { user, loading } = useContext(AuthContext);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-blue-500"></div>
            </div>
        );
    }

    if (user) {
        return children;
    }

    return <Navigate to="/" />;
}
