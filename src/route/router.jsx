import {
    createBrowserRouter,
} from "react-router-dom";
import Home from "../layouts/Home";
import Error from "../pages/Error";
import AllTask from "../pages/AllTask";
import AddTask from "../pages/AddTask";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
        errorElement: <Error />,
        children: [
            {
                path: "all-task",
                element: <AllTask />,
            },
            {
                path: "add-task",
                element: <AddTask />,
            }
        ],
    },
]);

export default router;