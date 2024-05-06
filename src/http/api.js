import { useAuthStore } from "@/store";
import axios from "axios";

const api = axios.create({
  baseURL: "https://hostel-management-system-backend.onrender.com/api/v1",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${useAuthStore.getState().user?.token || ""}`,
    "Access-Control-Allow-Origin": "*",
  },
});

export default api;
