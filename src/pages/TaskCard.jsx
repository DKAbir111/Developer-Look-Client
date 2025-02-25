import { useState } from "react";
import { Trash2 } from "lucide-react";

const TaskCard = ({ task }) => {
    const statusBgColors = {
        Pending: "bg-yellow-100 border-yellow-400",
        "In Progress": "bg-blue-100 border-blue-400",
        Completed: "bg-green-100 border-green-400",
    };

    const priorityColors = {
        High: "badge-error",
        Medium: "badge-warning",
        Low: "badge-success",
    };

    const [status, setStatus] = useState(task?.status);

    const handleStatusChange = (e) => {
        const newStatus = e.target.value;
        setStatus(newStatus);

    };

    const onDelete = (id) => {
        console.log(`Delete ${id}`);
    }

    return (
        <div className={`card w-full max-w-md shadow-xl border relative ${statusBgColors[status]} transition`}>
            <div className="card-body">
                <h2 className="card-title text-lg font-semibold">{task?.title}</h2>
                <p className="text-gray-700 text-sm">{task?.description}</p>

                <p className="text-sm text-gray-600 mt-2">
                    <strong>Due Date:</strong> {new Date(task?.dueDate).toLocaleString()}
                </p>

                {/* Status Dropdown */}
                <div className="mt-3">
                    <select
                        value={status}
                        onChange={handleStatusChange}
                        className="select select-bordered select-sm w-full"
                    >
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                    </select>
                </div>

                {/* Priority Badge */}
                <div className="mt-3 flex items-center gap-2">
                    <div className={`badge ${priorityColors[task?.priority]} px-3`}>
                        {task?.priority} Priority
                    </div>
                </div>

                {/* Delete Button */}
                <button
                    onClick={() => onDelete(task.id)}
                    className="absolute top-3 right-3  flex items-center gap-1 hover:text-red-600 cursor-pointer"
                >
                    <Trash2 size={16} />
                </button>
            </div>
        </div>
    );
};

export default TaskCard;
