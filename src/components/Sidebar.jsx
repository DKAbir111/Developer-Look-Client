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
                <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                    {/* Sidebar content here */}
                    <li><Link to={'/all-task'}>All Task</Link></li>
                    <li><Link to={'/add-task'}>Create New</Link></li>
                </ul>
            </div>
        </div >
    )
}
