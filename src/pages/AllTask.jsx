import axios from "axios"
import { useEffect, useState } from "react"
import TaskCard from "./TaskCard"

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
        <div>
            {
                tasts.map(task => <TaskCard key={task.id} task={task} />)
            }
        </div>
    )
}
