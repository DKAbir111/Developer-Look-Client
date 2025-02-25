const TaskCard = ({ task }) => {
    const statusColors = {
        Pending: "bg-yellow-100 text-yellow-700",
        "In Progress": "bg-blue-100 text-blue-700",
        Completed: "bg-green-100 text-green-700",
    };

    const priorityColors = {
        High: "bg-red-500",
        Medium: "bg-orange-500",
        Low: "bg-green-500",
    };

    return (
        <div className="max-w-md p-5 bg-white shadow-lg rounded-2xl border">
            <h2 className="text-xl font-bold text-gray-800">{task?.title}</h2>
            <p className="text-gray-600 text-sm mt-2">{task?.description}</p>
            <p className="text-sm text-gray-500 mt-3">
                <strong>Due Date:</strong> {new Date(task?.dueDate).toLocaleString()}
            </p>
            <span
                className={`mt-3 inline-block px-3 py-1 text-sm font-medium rounded-lg ${statusColors[task?.status]}`}
            >
                {task.status}
            </span>
            <div className="mt-4 flex items-center gap-2">
                <span
                    className={`w-3 h-3 rounded-full ${priorityColors[task?.priority]}`}
                ></span>
                <span className="text-sm font-medium text-gray-700">{task?.priority} Priority</span>
            </div>
        </div>
    );
};

export default TaskCard;
