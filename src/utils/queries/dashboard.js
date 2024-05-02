import api from "@/http/api";

export const dashboardQuery = () => {
  return api.get("/dashboard");
};
