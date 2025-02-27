import axios from "axios";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { toast } from "react-toastify";
import useGoogleCalendar from "../hooks/useGoogleCalender";

const AddTask = () => {
    const { user } = useContext(AuthContext)
    const { addEvent } = useGoogleCalendar()
    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const title = form.title.value;
        const description = form.description.value;
        const dueDate = form.dueDate.value;
        const status = form.status.value;
        const priority = form.priority.value;

        const newTask = { title, description, dueDate, status, priority, email: user?.email }
        console.log(newTask)
        axios.post('http://localhost:5001/api/todos', newTask, {
            withCredentials: true
        })
            .then(res => {
                if (res.data?._id) {
                    toast.success('Task added successfully')
                    addEvent(res.data)
                    form.reset();
                }

            })
            .catch((error) => {
                toast.error(error.message)
                console.log(error);
            });
    };

    return (
        <div className="min-h-screen flex flex-col items-center p-5 justify-center">
            <div className="card w-full max-w-md bg-base-100 shadow-xl border p-5">
                <h2 className="card-title text-lg font-semibold">Add New Task</h2>

                <form className="space-y-4 mt-2" onSubmit={handleSubmit}>
                    {/* Title */}
                    <input
                        type="text"
                        name="title"
                        placeholder="Task Title"
                        className="input input-bordered w-full"
                        required
                    />

                    {/* Description */}
                    <textarea
                        placeholder="Task Description"
                        className="textarea textarea-bordered w-full"
                        name="description"
                        required
                    ></textarea>

                    {/* Due Date */}
                    <input
                        type="datetime-local"
                        className="input input-bordered w-full"
                        name="dueDate"
                        required
                    />

                    {/* Status */}
                    <select required name="status" className="select select-bordered w-full">
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                    </select>

                    {/* Priority */}
                    <select required name="priority" className="select select-bordered w-full">
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                    </select>

                    {/* Submit Button */}
                    <button type="submit" className="btn btn-primary w-full">
                        Add Task
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddTask;
