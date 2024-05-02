import { useAuthStore } from "@/store";
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api/v1",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${useAuthStore.getState().user?.token || ""}`,
    "Access-Control-Allow-Origin": "*",
  },
});

export default api;
