import axios from "axios"
import { useEffect, useState } from "react"

export default function AllTask() {
    const [tast, setTask] = useState([])
    useEffect(() => {
        axios.get('/Todos.json')
            .then(res => {
                setTask(res.data)
            })
    }, [])
    console.log(tast)
    return (
        <div>
            All Task
        </div>
    )
}
