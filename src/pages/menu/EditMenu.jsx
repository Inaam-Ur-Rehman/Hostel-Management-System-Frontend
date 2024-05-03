import { queryClient } from "@/App";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import api from "@/http/api";
import menuValidationSchema, {
  updateMenuValidationSchema,
} from "@/validations/menu.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Edit, SendHorizonalIcon } from "lucide-react";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const EditMenu = () => {
  const { id } = useParams();
  const [menu, setMenu] = React.useState(null);
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: (data) => api.put(`/menu/${id}`, data),
    onSuccess: () => {
      toast.success("Menu updated successfully");
      queryClient.invalidateQueries({ queryKey: ["menu"] });
      navigate("/menu", { replace: true });
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || error.message);
    },
  });

  // fetch menu
  useEffect(() => {
    (async () => {
      await api
        .get(`/menu/${id}`)
        .then((res) => {
          //   console.log(res.data.data);
          setMenu(res.data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    })();
  }, [id]);

  const form = useForm({
    resolver: zodResolver(updateMenuValidationSchema),
    defaultValues: {
      breakfast: "",
      lunch: "",
      dinner: "",
    },
    values: menu,
  });

  const handleSubmit = (data) => {
    mutation.mutate(data);
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Menu</CardTitle>
        <CardDescription>Create a new menu for the hostel.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="flex flex-col gap-4"
          >
            <FormField
              control={form.control}
              name="breakfast"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dish name for breakfast</FormLabel>
                  <FormControl>
                    <Input placeholder="Dish name" {...field} type="text" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lunch"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dish name for lunch</FormLabel>
                  <FormControl>
                    <Input placeholder="Dish name" {...field} type="text" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dinner"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dish name for dinner</FormLabel>
                  <FormControl>
                    <Input placeholder="Dish name" {...field} type="text" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="max-w-max">
              Submit
              <SendHorizonalIcon className="ml-2 h-4 w-4" />
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default EditMenu;
