import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";



export default function Home() {
    return (
        <main className="flex">
            <aside>
                <Sidebar />
            </aside>
            <aside className="flex-1 container  max-h-screen overflow-scroll bg-gradient-to-br from-cyan-100 to-blue-100">
                <Outlet />

            </aside>
        </main>
    )
}
