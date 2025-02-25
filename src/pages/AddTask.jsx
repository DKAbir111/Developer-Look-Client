const AddTask = () => {
    return (
        <div className="min-h-screen bg-gray-100 p-5 flex flex-col items-center gap-6">
            {/* Add Task Form */}
            <div className="max-w-md p-5 bg-white shadow-lg rounded-2xl border w-full">
                <h2 className="text-lg font-bold text-gray-800 mb-3">Add New Task</h2>

                <form className="space-y-3">
                    {/* Title */}
                    <input
                        type="text"
                        placeholder="Task Title"
                        className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-300"
                    />

                    {/* Description */}
                    <textarea
                        placeholder="Task Description"
                        className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-300"
                    ></textarea>

                    {/* Due Date */}
                    <input
                        type="datetime-local"
                        className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-300"
                    />

                    {/* Status */}
                    <select className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-300">
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                    </select>

                    {/* Priority */}
                    <select className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-300">
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                    </select>

                    {/* Submit Button */}
                    <button
                        type="button"
                        className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition"
                    >
                        Add Task
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddTask;
