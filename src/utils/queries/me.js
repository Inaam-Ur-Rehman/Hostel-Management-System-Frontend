import api from "@/http/api";

export const getMeQuery = () => {
  return api.get("/users/me");
};
