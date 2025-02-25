import {
    createBrowserRouter,
} from "react-router-dom";
import Home from "../layouts/Home";
import Error from "../pages/Error";
import AllTask from "../pages/AllTask";
import AddTask from "../pages/AddTask";
import Login from "../pages/Login";
import Register from "../pages/Register";

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
            },
            {
                path: "login",
                element: <Login />,
            },
            {
                path: "register",
                element: <Register />,
            }
        ],
    },
]);

export default router;