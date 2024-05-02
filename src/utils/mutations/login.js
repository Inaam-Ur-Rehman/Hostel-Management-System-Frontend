import api from "@/http/api";

export const login = (data) => {
  return api.post("/auth/login", data);
};
