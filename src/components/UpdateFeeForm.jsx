import React, { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "./ui/button";
import { useMutation, useQuery } from "@tanstack/react-query";
import api from "@/http/api";
import { toast } from "react-toastify";
import { queryClient } from "@/App";
import { PencilIcon } from "lucide-react";
import feesValidationSchema from "@/validations/fees.validation.js";
import { useNavigate } from "react-router-dom";
import ReactSelect from "react-select";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const UpdateFeeForm = ({ fee }) => {
  const [users, setUsers] = React.useState([]);
  const [selectedUser, setSelectedUser] = React.useState(fee?.user);
  useEffect(() => {
    (async () => {
      await api
        .get("/users")
        .then((response) => {
          setUsers(response.data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    })();

    () => setUsers([]);
  }, []);
  const navigate = useNavigate();
  const ref = React.useRef();
  if (!fee) return null;
  const mutation = useMutation({
    mutationFn: (data) => api.put(`/fee/${fee?.id}`, data),
    onSuccess: () => {
      toast.success("Fee updated successfully");
      form.reset();
      ref.current?.click();
      queryClient.invalidateQueries({ queryKey: ["fee"] });
      navigate("/fee", { replace: true });
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || error.message);
    },
  });

  const onSubmit = async (data) => {
    mutation.mutate(data);
  };

  const form = useForm({
    resolver: zodResolver(feesValidationSchema),
    defaultValues: {
      note: "",
      userId: "",
      month: "",
      amount: "",
    },
    values: {
      note: fee?.note,
      userId: fee?.userId,
      month: fee?.month,
      amount: fee?.amount,
    },
  });

  return (
    <Dialog>
      <DialogTrigger ref={ref}>
        <Button variant="outline">
          <PencilIcon className="w-4 h-4 mr-2" />
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit User Fee</DialogTitle>
          <DialogDescription>
            This action will update the user request.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="userId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select User</FormLabel>

                  <ReactSelect
                    onChange={(option) => {
                      setSelectedUser(option);
                      form.setValue("userId", option?.value);
                    }}
                    placeholder="Select User"
                    value={selectedUser}
                    options={users.map((user) => ({
                      value: user.id,
                      label: user.name,
                    }))}
                  />

                  <FormDescription>
                    Select the status of the user request.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="note"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Note</FormLabel>
                  <Input
                    {...field}
                    placeholder="Enter Note"
                    type="text"
                    className="mt-1"
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <Input
                    {...field}
                    onChange={(e) => {
                      form.setValue("amount", Number(e.target.value));
                    }}
                    placeholder="Enter Amount"
                    type="number"
                    className="mt-1"
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="month"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Month</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field?.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Month" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="JANUARY">January</SelectItem>
                      <SelectItem value="FEBRUARY">February</SelectItem>
                      <SelectItem value="MARCH">March</SelectItem>
                      <SelectItem value="APRIL">April</SelectItem>
                      <SelectItem value="MAY">May</SelectItem>
                      <SelectItem value="JUNE">June</SelectItem>
                      <SelectItem value="JULY">July</SelectItem>
                      <SelectItem value="AUGUST">August</SelectItem>
                      <SelectItem value="SEPTEMBER">September</SelectItem>
                      <SelectItem value="OCTOBER">October</SelectItem>
                      <SelectItem value="NOVEMBER">November</SelectItem>
                      <SelectItem value="DECEMBER">December</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="mt-2">
              <PencilIcon className="w-4 h-4 mr-2" />
              Update
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateFeeForm;
