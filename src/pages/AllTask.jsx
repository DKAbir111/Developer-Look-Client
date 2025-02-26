import axios from "axios";
import { useContext } from "react";
import TaskCard from "./TaskCard";
import { MdAdd } from "react-icons/md";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useQuery } from "@tanstack/react-query";

export default function AllTask() {
    const { user, loading } = useContext(AuthContext);

    // Fetch tasks using React Query
    const { data: tasks = [], isLoading, error, refetch } = useQuery({
        queryKey: ['tasks', user?.email],
        queryFn: async () => {
            const res = await axios.get(`http://localhost:5001/api/todos?email=${user?.email}`);
            return res.data;
        },
        enabled: !!user?.email,
    });

    if (error) return <p className="text-red-500">Error fetching tasks: {error.message}</p>;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {isLoading || loading
                ? [...Array(5)].map((_, index) => (
                    <div key={index} className="card w-full max-w-md shadow-xl border p-4 min-h-[274px] space-y-3">
                        <Skeleton height={24} width="75%" />
                        <Skeleton height={18} count={2} className="mt-2" />
                        <Skeleton height={18} width="50%" className="mt-2" />
                        <Skeleton height={30} width="100%" className="mt-3" />
                        <Skeleton height={20} width={80} className="mt-3" />
                    </div>
                ))
                : tasks.map(task => <TaskCard key={task.id} task={task} refetch={refetch} />)}

            {/* Add Task Button */}
            <Link className="card w-full max-w-md bg-base-100 shadow-xl border flex justify-center items-center min-h-[274px]" to={'/add-task'}>
                <MdAdd className="text-7xl" />
            </Link>
        </div>
    );
}
