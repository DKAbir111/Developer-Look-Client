import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import AuthContext from "../context/AuthContext";
import auth from "../firebase/firebase.init";
import { useEffect, useState } from "react";

export default function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    // state observer
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            setLoading(false)
        })
        return () => unsubscribe();
    }, [])

    console.log(user)

    //create new user
    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    }
    const userInfo = {
        createUser,
        user,
        loading
    }
    return (
        <AuthContext.Provider value={userInfo}>
            {children}
        </AuthContext.Provider>
    )
}
