import { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { toast } from "react-toastify";
import { sendEmailVerification } from "firebase/auth";
import auth from "../firebase/firebase.init";
import axios from "axios";
import { FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa";
import logo from "../assets/logo.png";
import welcome2 from "../assets/welcome2.png";
import AOS from "aos";
import "aos/dist/aos.css"; 
import useGoogleCalendar from "../hooks/useGoogleCalender";

export default function Register() {
    const { createUser, logOut, signInWithGoogle } = useContext(AuthContext);
    const navigate = useNavigate();
    const { handleAuthClick, gapiLoaded, gisLoaded } = useGoogleCalendar();

    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        AOS.init();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        createUser(email, password)
            .then((res) => {
                if (res?.user?.email) {
                    sendEmailVerification(auth.currentUser);
                    axios.post('https://todo-server-tau-gilt.vercel.app/api/users', { email })
                        .then((res) => {
                            if (res.data) {
                                toast.success('Email verification sent!');
                                if (gapiLoaded && gisLoaded) {
                                    handleAuthClick();
                                } else {
                                    console.warn("Google API not loaded yet.");
                                }
                            }
                        });
                    logOut();
                    form.reset();
                    navigate('/');
                }
            })
            .catch((error) => {
                toast.error(error.message);
            });
    };

    const handleGoogleLogin = () => {
        signInWithGoogle()
            .then((res) => {
                if (res?.user) {
                    toast.success("User registered successfully with Google");
                    navigate('/task');
                }
            })
            .catch((error) => {
                toast.error(error.message);
                console.error("Google sign-in error:", error);
            });
    };

    return (
        <div className="min-h-screen bg-gradient-to-tl from-cyan-100 to-blue-100 flex items-center justify-center p-4">
            <div className="max-w-5xl w-full bg-white rounded-lg flex flex-col md:flex-row items-center space-x-6 p-6 md:p-10">

                {/* left side with register form */}
                <div
                    className="w-full md:w-1/2 bg-white rounded-lg p-6 space-y-6"
                    data-aos="fade-up" 
                    data-aos-delay="200" 
                >
                    <div className="text-center mb-6">
                        <img src={logo} alt="App Logo" className="w-24 mx-auto mb-4" />
                        <h1 className="text-3xl font-semibold text-cyan-400">ToDo App</h1>
                    </div>
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div className="form-control">
                            <label className="label text-lg font-semibold text-gray-700">Email</label>
                            <input
                                type="email"
                                name="email"
                                placeholder="Enter your email"
                                className="input input-bordered w-full p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                required
                            />
                        </div>
                        <div className="form-control">
                            <label className="label text-lg font-semibold text-gray-700">Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    placeholder="Enter your password"
                                    className="input input-bordered w-full p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    required
                                />
                                <button
                                    type="button"
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <FaEyeSlash className="text-gray-500" /> : <FaEye className="text-gray-500" />}
                                </button>
                            </div>
                            <label className="label mt-2 text-sm text-gray-600">
                                <span>
                                    Already have an account?{" "}
                                    <Link to="/" className="font-medium text-cyan-500">
                                        Login
                                    </Link>
                                </span>
                            </label>
                        </div>
                        <div className="form-control mt-4">
                            <button className="btn w-full p-3 rounded-md bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-blue-500 hover:to-cyan-500 text-white font-semibold">
                                Register
                            </button>
                        </div>
                    </form>
                    <div className="mt-6 text-center">
                        <button
                            className="btn w-full p-3 rounded-md border border-gray-300 flex items-center justify-center gap-2 mt-4 hover:bg-gray-100 transition-all"
                            onClick={handleGoogleLogin}
                            disabled={!gapiLoaded || !gisLoaded}
                        >
                            <FaGoogle className="text-lg" />
                            Register with Google
                        </button>
                    </div>
                </div>
                {/* right side with welcome image */}
                <div
                    className="w-full md:w-1/2 order-first md:order-last md:flex justify-center hidden"
                    data-aos="fade-left" 
                    data-aos-delay="400" 
                >
                    <img
                        src={welcome2}
                        alt="Welcome Image"
                        className="object-cover w-2/5"
                    />
                </div>
            </div>
        </div>
    );
}
