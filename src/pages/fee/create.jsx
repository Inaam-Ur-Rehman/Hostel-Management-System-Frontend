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
import feesValidationSchema from "@/validations/fees.validation.js";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { SendHorizonalIcon } from "lucide-react";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import ReactSelect from "react-select";
import { toast } from "react-toastify";

const CreateFee = () => {
  const navigate = useNavigate();
  const [users, setUsers] = React.useState([]);
  const [selectedUser, setSelectedUser] = React.useState(null);
  const [userDetails, setUserDetails] = React.useState(null);
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
  }, []);

  const mutation = useMutation({
    mutationFn: (data) => api.post("/fee", data),
    onSuccess: () => {
      toast.success("Fee created successfully");
      queryClient.invalidateQueries({ queryKey: ["fee"] });
      navigate("/fee", { replace: true });
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || error.message);
    },
  });
  const form = useForm({
    resolver: zodResolver(feesValidationSchema),
    defaultValues: {
      userId: "",
      month: "",
      amount: "",
      note: "",
    },
  });

  const usersOptions = users.map((user) => ({
    value: user.id,
    label: user.name,
  }));
  const handleSubmit = (data) => {
    mutation.mutate(data);
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Fee</CardTitle>
        <CardDescription>You can create a new fee here.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="userId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select User</FormLabel>

                  <ReactSelect
                    value={selectedUser}
                    onChange={(value) => {
                      setSelectedUser(value);
                      form.setValue("userId", value?.value);
                      setUserDetails(
                        users.find((user) => user.id === value?.value)
                      );
                    }}
                    options={usersOptions}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="my-4">
              {userDetails?.id && (
                <Card>
                  <CardHeader>
                    <CardTitle>User Details</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <h2>Name: {userDetails?.name}</h2>
                    <p>Email: {userDetails?.email}</p>
                    <p>Phone: {userDetails?.profile?.phone}</p>
                    <p> Father Name: {userDetails?.profile?.fatherName}</p>
                    <p>Room No. {userDetails?.room?.roomNumber}</p>
                  </CardContent>
                </Card>
              )}
            </div>
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
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <Input
                    type="number"
                    {...field}
                    placeholder="Amount"
                    className="input"
                    onChange={(e) => {
                      form.setValue("amount", Number(e.target.value));
                    }}
                  />
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
                    type="text"
                    {...field}
                    placeholder="Note"
                    className="input"
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">
              Submit
              <SendHorizonalIcon className="ml-2 h-4 w-4" />
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default CreateFee;
