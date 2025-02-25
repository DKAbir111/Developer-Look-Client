import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";


export default function Home() {
    return (
        <main className="flex">
            <aside>
                <Sidebar />
            </aside>
            <aside className="flex-1 container p-5">
                <Outlet />
            </aside>
        </main>
    )
}
