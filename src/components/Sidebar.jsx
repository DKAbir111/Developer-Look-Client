import { Link, useNavigate } from "react-router-dom";
import { RiMenuFold2Line } from "react-icons/ri";
import useGoogleCalendar from "../hooks/useGoogleCalender";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { FaTasks } from "react-icons/fa";
import { MdFormatListBulletedAdd } from "react-icons/md";
import { IoMdLogOut, IoMdSettings } from "react-icons/io";
import { FcGoogle } from "react-icons/fc";
import logo from '../assets/logo.png'
export default function Sidebar() {
    const { handleAuthClick, gapiLoaded, gisLoaded } = useGoogleCalendar();
    const { logOut } = useContext(AuthContext);
    const navigate = useNavigate();

    return (
        <div className="drawer lg:drawer-open relative min-h-screen">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col items-center justify-center absolute top-2 left-2">
                <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">
                    <RiMenuFold2Line />
                </label>
            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu bg-gradient-to-b from-cyan-500 to-blue-500 text-white min-h-full w-80 p-6 flex flex-col justify-between">
                    {/* Sidebar Header */}
                    <div>
                        <div className="flex items-center space-x-3 mb-6">
                            <img src={logo} alt="logo" className="w-1/4" />
                            <h3 className="text-2xl font-semibold">Todo App</h3>
                        </div>

                        {/* Navigation Items */}
                        <div className="space-y-4">
                            <li className="hover:bg-cyan-700 rounded-lg transition-all">
                                <Link to="/task" className="flex items-center space-x-3">
                                    <FaTasks size={20} />
                                    <span>All Tasks</span>
                                </Link>
                            </li>
                            <li className="hover:bg-cyan-700 rounded-lg transition-all">
                                <Link to="/task/add" className="flex items-center space-x-3">
                                    <MdFormatListBulletedAdd size={20} />
                                    <span>Create New</span>
                                </Link>
                            </li>
                        </div>
                    </div>

                    {/* Settings Section */}
                    <div className="dropdown dropdown-top mt-8">
                        <div tabIndex={0} role="button" className="btn w-full justify-start text-lg font-medium bg-transparent text-white hover:bg-cyan-700">
                            <IoMdSettings size={22} />
                            <span className="ml-2">Settings</span>
                        </div>
                        <ul tabIndex={0} className="dropdown-content menu bg-gradient-to-r from-cyan-400 bg-opacity-10 backdrop-blur-lg to-blue-400 rounded-box shadow-lg w-52 p-3">
                            <li className="hover:bg-cyan-100 rounded-lg transition-all">
                                <a onClick={handleAuthClick} disabled={!gapiLoaded || !gisLoaded} className="flex items-center space-x-3">
                                    <FcGoogle size={20} />
                                    <span>Connect Google</span>
                                </a>
                            </li>
                            <li className="hover:bg-cyan-100 rounded-lg transition-all">
                                <a onClick={() => {
                                    localStorage.removeItem('auth_token');
                                    logOut();
                                    navigate('/');
                                }} className="flex items-center space-x-3">
                                    <IoMdLogOut size={20} />
                                    <span>Log Out</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </ul>
            </div>
        </div>
    );
}
