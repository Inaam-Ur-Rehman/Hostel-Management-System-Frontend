import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import AdminLayout from "./layouts/AdminLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Rooms from "./pages/rooms";
import ViewRoom from "./pages/rooms/ViewRoom";
import Users from "./pages/users";
import EditUser from "./pages/users/EditUser";
import CreateUser from "./pages/users/CreateUser";
import CreateProfile from "./pages/profile/CreateProfile";
import AssignRoom from "./pages/AssignRoom";
import ViewUser from "./pages/users/ViewUser";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 5,
      retryDelay: 1000,
    },
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <AdminLayout />,
    children: [
      {
        path: "",
        index: true,
        element: <Home />,
      },
      {
        path: "rooms",
        element: <Rooms />,
      },
      {
        path: "rooms/view/:id",
        element: <ViewRoom />,
      },
      {
        path: "users",
        element: <Users />,
      },
      {
        path: "users/view/:id",
        element: <ViewUser />,
      },
      {
        path: "users/edit/:id",
        element: <EditUser />,
      },
      {
        path: "users/create",
        element: <CreateUser />,
      },
      {
        path: "profile/create/:id",
        element: <CreateProfile />,
      },
      {
        path: "assign-room",
        element: <AssignRoom />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
      <ToastContainer />
    </QueryClientProvider>
  );
}

export default App;
