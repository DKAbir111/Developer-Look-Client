import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { toast } from "react-toastify";
import { FaGoogle } from "react-icons/fa";
import useGoogleCalendar from "../hooks/useGoogleCalender";

export default function Login() {
    const { signIn, logOut, signInWithGoogle } = useContext(AuthContext);
    const { handleAuthClick, gapiLoaded, gisLoaded } = useGoogleCalendar();
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        signIn(email, password)
            .then((res) => {
                const user = res?.user;
                if (user?.email) {
                    if (user.emailVerified) {
                        toast.success("User logged in successfully!");
                        navigate('/task')
                        form.reset();
                    } else {
                        toast.error("Please verify your email before logging in!");
                        logOut();
                    }
                }
            })
            .catch((error) => {
                toast.error(error.message);
                console.log(error);
            });
    };


    const handleGoogleLogin = () => {
        signInWithGoogle()
            .then((res) => {
                if (res?.user) {
                    toast.success("User logged in successfully");
                    navigate('/task')
                    if (gapiLoaded && gisLoaded) {
                        handleAuthClick();
                    } else {
                        console.warn("Google API not loaded yet.");
                    }
                }
            })
            .catch((error) => {
                toast.error(error.message);
                console.error("Google sign-in error:", error);
            });
    };

    return (
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <form className="card-body" onSubmit={handleSubmit}>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input type="email" name="email" placeholder="email" className="input input-bordered" required />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Password</span>
                    </label>
                    <input type="password" name="password" placeholder="password" className="input input-bordered" required />
                    <label className="label">
                        <span>
                            Don&apos;t have an account?{" "}
                            <Link to={"/register"} className="label-text-alt link link-hover">
                                Register
                            </Link>
                        </span>
                    </label>
                </div>
                <div className="form-control mt-6">
                    <button className="btn btn-primary">Login</button>
                </div>
            </form>
            <button className="btn mb-3" onClick={handleGoogleLogin} disabled={!gapiLoaded || !gisLoaded}>
                <FaGoogle /> Login with Google
            </button>
        </div>
    );
}
