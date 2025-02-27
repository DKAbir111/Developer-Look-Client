import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import AuthContext from "../context/AuthContext";
import auth from "../firebase/firebase.init";
import { useEffect, useState } from "react";
import axios from "axios";

export default function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const provider = new GoogleAuthProvider();
    // state observer
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            if (currentUser?.email) {
                const user = { email: currentUser.email }
                axios.post('https://todo-server-tau-gilt.vercel.app/api/jwt', user, {
                    withCredentials: true,
                })
                    .then(res => {
                        if (res.data) {
                            setLoading(false);
                        }
                    })
            }

            else {
                axios.post('https://todo-server-tau-gilt.vercel.app/api/logout', {}, {
                    withCredentials: true
                })
                    .then(res => {
                        // console.log('logout', res.data);
                        if (res.data) {
                            setLoading(false);
                        }
                    })
            }
            setLoading(false)
        })
        return () => unsubscribe();
    }, [])

    // console.log(user)
    //create new user
    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password);
    }

    //sign in user
    const signIn = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password);
    }

    //sign in with google
    const signInWithGoogle = () => {
        setLoading(true)
        return signInWithPopup(auth, provider);
    }
    //sign out user
    const logOut = () => {
        setLoading(true)
        return signOut(auth)
    }

    const userInfo = {
        createUser,
        user,
        loading,
        signIn,
        logOut,
        signInWithGoogle,
    }
    return (
        <AuthContext.Provider value={userInfo}>
            {children}
        </AuthContext.Provider>
    )
}
