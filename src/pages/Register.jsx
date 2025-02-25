import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { toast } from "react-toastify";

export default function Register() {

    const { createUser } = useContext(AuthContext)
    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        createUser(email, password)
            .then((res) => {
                if (res?.user?.email) {
                    toast.success('User registered successfully!')
                    form.reset();
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
                        <span >Already have an account?<Link to={'/login'} className="label-text-alt link link-hover"> Login</Link> </span>
                    </label>
                </div>
                <div className="form-control mt-6">
                    <button className="btn btn-primary">Register</button>
                </div>
            </form>
        </div>
    )
}
