import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { toast } from "react-toastify";
import { sendEmailVerification } from "firebase/auth";
import auth from "../firebase/firebase.init";
import axios from "axios";

export default function Register() {

    const { createUser, logOut } = useContext(AuthContext)
    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        createUser(email, password)
            .then((res) => {
                if (res?.user?.email) {
                    sendEmailVerification(auth.currentUser)
                    toast.success('Email verification sent!')
                    axios.post('http://localhost:5001/api/users', { email })
                        .then(res => {
                            console.log(res.data)
                        })
                    logOut()
                    form.reset();
                    navigate('/')
                }
            })
            .catch((error) => {
                toast.error(error.message)
                console.log(error);
            });


    }
    return (
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <form className="card-body" onSubmit={handleSubmit}>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input type="email" placeholder="email" name="email" className="input input-bordered" required />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Password</span>
                    </label>
                    <input type="password" name="password" placeholder="password" className="input input-bordered" required />
                    <label className="label">
                        <span >Already have an account?<Link to={'/'} className="label-text-alt link link-hover"> Login</Link> </span>
                    </label>
                </div>
                <div className="form-control mt-6">
                    <button className="btn btn-primary">Register</button>
                </div>
            </form>
        </div>
    )
}
