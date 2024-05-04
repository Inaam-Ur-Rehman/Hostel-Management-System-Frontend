import React from "react";
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
import { useMutation } from "@tanstack/react-query";
import api from "@/http/api";
import { toast } from "react-toastify";
import { queryClient } from "@/App";
import { PencilIcon } from "lucide-react";
import inventoryValidationSchema from "@/validations/inventory.validation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useNavigate } from "react-router-dom";

const UpdateInventoryForm = ({ item }) => {
  const navigate = useNavigate();
  const ref = React.useRef();
  if (!item) return null;
  const mutation = useMutation({
    mutationKey: [`inventory-${item?.id}`],
    mutationFn: (data) => api.put(`/inventory/${item?.id}`, data),
    onSuccess: () => {
      toast.success("Inventory updated successfully");
      form.reset();
      ref.current?.click();
      queryClient.invalidateQueries({ queryKey: ["inventory"] });
      navigate("/inventory", { replace: true });
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || error.message);
    },
  });

  const onSubmit = async (data) => {
    console.log(data);
    mutation.mutate(data);
  };

  const form = useForm({
    resolver: zodResolver(inventoryValidationSchema),
    defaultValues: {
      item: "",
      quantity: "",
      unit: "",
      price: "",
      note: "",
    },
    values: {
      item: item?.item,
      quantity: item?.quantity,
      unit: item?.unit,
      price: item?.price,
      note: item?.note,
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
          <DialogTitle>Edit Inventory </DialogTitle>
          <DialogDescription>
            This action will update the inventory.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="item"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Item
                    <FormDescription>
                      Please enter the item name.
                    </FormDescription>
                  </FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Item" type="text" />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Quantity
                    <FormDescription>
                      Please enter the quantity.
                    </FormDescription>
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Quantity"
                      type="number"
                      onChange={(e) => {
                        form.setValue("quantity", Number(e.target.value));
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="unit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Unit
                    <FormDescription>Please select the unit.</FormDescription>
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select unit">
                          {form.getValues("unit")}
                        </SelectValue>
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {["KG", "LITER", "PIECE"].map((unit) => (
                        <SelectItem key={unit} value={unit}>
                          {unit}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Price
                    <FormDescription>
                      Please enter the price of the item.
                    </FormDescription>
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Price"
                      type="number"
                      onChange={(e) => {
                        form.setValue("price", Number(e.target.value));
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="note"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Note
                    <FormDescription>
                      Please enter the note for the item.
                    </FormDescription>
                  </FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Note" type="text" />
                  </FormControl>
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

export default UpdateInventoryForm;
