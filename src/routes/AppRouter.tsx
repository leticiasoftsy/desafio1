import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "../pages/home";
import NotFoundPage from "../pages/NotFound";
import UsersPage from "../pages/usuarios";

const router = createBrowserRouter([
    {
        path: "/", 
        element: <HomePage/>
    }, 
    {
        path: "/usuarios", 
        element: <UsersPage/>
    },
    {
        path: "*", 
        element: <NotFoundPage/>
    }
])

export const AppRouter = () => {
    return <RouterProvider router={router}/>
}