import api from "@/http/api";

export const getRoomsQuery = () => {
  return {
    queryKey: ["rooms"],
    queryFn: async () => {
      const res = await api.get("/rooms");
      return res.data;
    },
  };
};
