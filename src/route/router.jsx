import {
    createBrowserRouter,
} from "react-router-dom";
import Home from "../layouts/Home";
import Error from "../pages/Error";
import AllTask from "../pages/AllTask";
import AddTask from "../pages/AddTask";
import Login from "../pages/Login";
import Register from "../pages/Register";
import AuthLayout from "../layouts/AuthLayout";

const router = createBrowserRouter([
    {
        path: '/',
        element: <AuthLayout />,
        errorElement: <Error />,
        children: [
            {
                path: '/',
                element: <Login />,
            },
            {
                path: '/register',
                element: <Register />,
            }
        ]
    },
    {
        path: '/task',
        element: <Home />,
        children: [
            {
                path: '/task',
                element: <AllTask />,
            },
            {
                path: '/task/add',
                element: <AddTask />,
            }
        ]
    }
]);

export default router;