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
import {
  Home,
  Rooms,
  ViewRoom,
  Users,
  ViewUser,
  EditUser,
  CreateUser,
  CreateProfile,
  AssignRoom,
  Menu,
  CreateMenu,
  EditMenu,
  Login,
  UserRequests,
  ViewUserRequest,
  Complaints,
  ViewComplaint,
  Fee,
} from "./pages";
import ViewFee from "./pages/fee/view";
import CreateFee from "./pages/fee/create";
import Inventory from "./pages/inventory";
import CreateInventory from "./pages/inventory/create";
import ViewInventory from "./pages/inventory/view";

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
        element: <UserRequests />,
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
