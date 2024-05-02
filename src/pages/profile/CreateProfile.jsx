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
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import api from "@/http/api";
import { uploadImage } from "@/utils/uploadImage";
import profileValidationSchema from "@/validations/profile.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { SendHorizonalIcon, TrashIcon } from "lucide-react";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const CreateProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      await api
        .get(`/users/user/${id}`)
        .then((res) => {
          const data = res.data.data;
          if (data?.profile?.id) {
            navigate("/users", { replace: true });
          }
        })
        .catch((err) => {
          navigate("/users", { replace: true });
        });
    })();
  }, []);

  const [images, setImages] = React.useState({
    cnicFront: null,
    cnicBack: null,
    image: null,
  });
  const mutation = useMutation({
    mutationFn: (data) => api.post(`/profile`, data),
    onSuccess: () => {
      toast.success("Profile created successfully");
      queryClient.invalidateQueries({ queryKey: ["users"] });
      navigate("/users", { replace: true });
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || error.message);
    },
  });
  const form = useForm({
    resolver: zodResolver(profileValidationSchema),
    defaultValues: {
      userId: id,
      phone: "",
      address: "",
      bloodGroup: "",
      cnic: "",
      cnicBack: "",
      cnicFront: "",
      emergencyContact: "",
      fatherName: "",
      image: "",
      userType: "",
    },
  });

  const onSubmit = async (data) => {
    mutation.mutate(data);
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit User Profile</CardTitle>
        <CardDescription>Update user profile here.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {images.image ? (
              <div>
                <Label className="block mb-4">User Image</Label>
                <img
                  src={form.getValues("image")}
                  alt=""
                  className="w-44 max-w-sm h-44 rounded-full  object-cover"
                />
                <Button
                  type="button"
                  variant="outline"
                  className="mt-2"
                  onClick={() => setImages({ ...images, image: null })}
                >
                  <TrashIcon className="mr-2 w-4 h-4" />
                  Remove
                </Button>
              </div>
            ) : (
              <div>
                <Label className="space-y-1">
                  <span>User Image</span>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      uploadImage(file).then((url) => {
                        form.setValue("image", url);
                        setImages({ ...images, image: url });
                      });
                    }}
                  />
                </Label>
                {form.formState.errors.image && (
                  <FormMessage className="text-red-500 mt-2">
                    {form.formState.errors.image.message}
                  </FormMessage>
                )}
              </div>
            )}
            <FormField
              control={form.control}
              name="fatherName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Father Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Father Name" {...field} type="text" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input placeholder="Phone" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Address" {...field} type="text" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bloodGroup"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Blood Group</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field?.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Blood Group" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="A+">A+</SelectItem>
                      <SelectItem value="A-">A-</SelectItem>
                      <SelectItem value="B+">B+</SelectItem>
                      <SelectItem value="B-">B-</SelectItem>
                      <SelectItem value="AB+">AB+</SelectItem>
                      <SelectItem value="AB-">AB-</SelectItem>
                      <SelectItem value="O+">O+</SelectItem>
                      <SelectItem value="O-">O-</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="cnic"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CNIC Number</FormLabel>
                  <FormControl>
                    <Input placeholder="CNIC" {...field} type="text" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {images.cnicFront ? (
              <div>
                <Label className="block mb-4">CNIC Front Image</Label>
                <img
                  src={form.getValues("cnicFront")}
                  alt=""
                  className="w-full max-w-sm rounded-md h-56 object-cover"
                />
                <Button
                  type="button"
                  variant="outline"
                  className="mt-2"
                  onClick={() => setImages({ ...images, cnicFront: null })}
                >
                  <TrashIcon className="mr-2 w-4 h-4" />
                  Remove
                </Button>
              </div>
            ) : (
              <div>
                <Label className="space-y-1">
                  <span>CNIC Front Image</span>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      uploadImage(file).then((url) => {
                        form.setValue("cnicFront", url);
                        setImages({ ...images, cnicFront: url });
                      });
                    }}
                  />
                </Label>
                {form.formState.errors.cnicFront && (
                  <FormMessage className="text-red-500 mt-2">
                    {form.formState.errors.cnicFront.message}
                  </FormMessage>
                )}
              </div>
            )}
            {images.cnicBack ? (
              <div>
                <Label className="block mb-4">CNIC Back Image</Label>
                <img
                  src={form.getValues("cnicBack")}
                  alt=""
                  className="w-full max-w-sm rounded-md h-56 object-cover"
                />
                <Button
                  type="button"
                  className="mt-2"
                  variant="outline"
                  onClick={() => setImages({ ...images, cnicBack: null })}
                >
                  <TrashIcon className="mr-2 w-4 h-4" />
                  Remove
                </Button>
              </div>
            ) : (
              <div>
                <Label className="space-y-1">
                  <span>CNIC Back Image</span>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      uploadImage(file).then((url) => {
                        form.setValue("cnicBack", url);
                        setImages({ ...images, cnicBack: url });
                      });
                    }}
                  />
                </Label>
                {form.formState.errors.cnicBack && (
                  <FormMessage className="text-red-500 mt-2">
                    {form.formState.errors.cnicBack.message}
                  </FormMessage>
                )}
              </div>
            )}
            <FormField
              control={form.control}
              name="emergencyContact"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Emergency Contact</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Emergency Contact"
                      {...field}
                      type="text"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="userType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>User Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field?.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="User Type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="STUDENT">Student</SelectItem>
                      <SelectItem value="JOB_HOLDER">Job Holder</SelectItem>
                      <SelectItem value="OTHER">Other</SelectItem>
                    </SelectContent>
                  </Select>
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

export default CreateProfile;
