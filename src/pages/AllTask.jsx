import axios from "axios"
import { useEffect, useState } from "react"
import TaskCard from "./TaskCard"
import { MdAdd } from "react-icons/md";
import { Link } from "react-router-dom";
export default function AllTask() {
    const [tasts, setTasks] = useState([])
    useEffect(() => {
        axios.get('/Todos.json')
            .then(res => {
                setTasks(res.data)
            })
    }, [])
    console.log(tasts)
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {
                tasts.map(task => <TaskCard key={task.id} task={task} />)

            }
            {/* Add more task cards here */}
            <Link className="card w-full max-w-md bg-base-100 shadow-xl border flex justify-center items-center" to={'/add-task'}>

                <MdAdd className="text-7xl" />

            </Link>

        </div>
    )
}
