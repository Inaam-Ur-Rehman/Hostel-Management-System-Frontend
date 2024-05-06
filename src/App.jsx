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

import ViewFee from "./pages/fee/view";
import CreateFee from "./pages/fee/create";
import Inventory from "./pages/inventory";
import CreateInventory from "./pages/inventory/create";
import ViewInventory from "./pages/inventory/view";
import Home from "./pages/Home";
import Rooms from "./pages/rooms";
import ViewRoom from "./pages/rooms/ViewRoom";
import Users from "./pages/users";
import ViewUser from "./pages/users/ViewUser";
import EditUser from "./pages/users/EditUser";
import CreateUser from "./pages/users/CreateUser";
import CreateProfile from "./pages/profile/CreateProfile";
import AssignRoom from "./pages/AssignRoom";
import Menu from "./pages/menu";
import CreateMenu from "./pages/menu/CreateMenu";
import EditMenu from "./pages/menu/EditMenu";
import UsersRequests from "./pages/userRequests";
import ViewUserRequest from "./pages/userRequests/ViewUserRequest";
import Complaints from "./pages/complaints";
import ViewComplaint from "./pages/complaints/view";
import Fee from "./pages/fee";
import Login from "./pages/Login";
import ForgotPassword from "./pages/forgot-password";
import ResetPassword from "./pages/reset";

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
      {
        path: "menu",
        element: <Menu />,
      },
      {
        path: "menu/create",
        element: <CreateMenu />,
      },
      {
        path: "menu/edit/:id",
        element: <EditMenu />,
      },
      {
        path: "user-requests",
        element: <UsersRequests />,
      },
      {
        path: "user-requests/view/:id",
        element: <ViewUserRequest />,
      },
      {
        path: "complaints",
        element: <Complaints />,
      },
      {
        path: "complaints/view/:id",
        element: <ViewComplaint />,
      },
      {
        path: "fee",
        element: <Fee />,
      },
      {
        path: "fee/create",
        element: <CreateFee />,
      },
      {
        path: "fee/view/:id",
        element: <ViewFee />,
      },
      {
        path: "inventory",
        element: <Inventory />,
      },
      {
        path: "inventory/create",
        element: <CreateInventory />,
      },
      {
        path: "inventory/view/:id",
        element: <ViewInventory />,
      },
    ],
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "reset/:token",
    element: <ResetPassword />,
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
