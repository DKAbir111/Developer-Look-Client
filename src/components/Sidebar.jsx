import { Link } from "react-router-dom"
import { RiMenuFold2Line } from "react-icons/ri";
export default function Sidebar() {
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
                        <li><Link to={'/all-task'}>All Task</Link></li>
                        <li><Link to={'/add-task'}>Create New</Link></li>
                    </div>

                    <div className="dropdown dropdown-top">
                        <div tabIndex={0} role="button" className="btn m-1"> Settings</div>
                        <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                            <li><a>Connect Google</a></li>
                            <li><a>Log Out</a></li>
                        </ul>
                    </div>

                </ul>

            </div>
        </div >
    )
}
