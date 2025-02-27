import { Link } from "react-router-dom"
import { RiMenuFold2Line } from "react-icons/ri";
import useGoogleCalendar from "../hooks/useGoogleCalender";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
export default function Sidebar() {
    const { handleAuthClick, gapiLoaded, gisLoaded } = useGoogleCalendar();
    const { logOut } = useContext(AuthContext)
    return (
        <div className="drawer lg:drawer-open relative min-h-screen">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col items-center justify-cente absolute top-2 left-2">
                {/* Page content here */}
                <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">
                    <RiMenuFold2Line />
                </label>
            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4 flex justify-between">
                    {/* Sidebar content here */}
                    <div>
                        <li><Link to={'/task'}>All Task</Link></li>
                        <li><Link to={'/task/add'}>Create New</Link></li>
                    </div>

                    <div className="dropdown dropdown-top">
                        <div tabIndex={0} role="button" className="btn m-1"> Settings</div>
                        <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                            <li><a onClick={handleAuthClick} disabled={!gapiLoaded || !gisLoaded}>Connect Google</a></li>
                            <li><a onClick={() => {
                                localStorage.removeItem('auth_token');
                                logOut();
                            }}>Log Out</a></li>
                        </ul>
                    </div>

                </ul>

            </div>
        </div >
    )
}
