import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import AuthContext from "../context/AuthContext";
import auth from "../firebase/firebase.init";
import { useEffect, useState } from "react";

export default function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    //monitor user
    useEffect(() => {
        const useSubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser)
        })
        return () => useSubscribe() //cleanup function
    }, [])

    //create new user
    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    }
    const userInfo = {
        createUser
    }
    return (
        <AuthContext.Provider value={userInfo}>
            {children}
        </AuthContext.Provider>
    )
}
