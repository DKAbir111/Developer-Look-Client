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
import PrivateRoute from "./PrivateRoute";

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
        element: <PrivateRoute><Home /></PrivateRoute>,
        children: [
            {
                path: '/task',
                element: <PrivateRoute><AllTask /></PrivateRoute>,
            },
            {
                path: '/task/add',
                element: <PrivateRoute><AddTask /></PrivateRoute>,
            }
        ]
    }
]);

export default router;