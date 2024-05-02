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
import { updateProfileValidationSchema } from "@/validations/profile.validation";
import { updateUserValidationSchema } from "@/validations/user.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  ImageIcon,
  SendHorizonalIcon,
  SendIcon,
  TrashIcon,
} from "lucide-react";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { redirect, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const Edit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: (data) => api.put(`/users/${id}`, data),
    onSuccess: () => {
      toast.success("User updated successfully");
      queryClient.invalidateQueries({ queryKey: ["users"] });

      navigate("/users", { replace: true });
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || error.message);
    },
  });
  const profileMutation = useMutation({
    mutationFn: (data) => api.put(`/profile/${id}`, data),
    onSuccess: () => {
      toast.success("Profile updated successfully");
      queryClient.invalidateQueries({ queryKey: ["users"] });
      navigate("/users", { replace: true });
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || error.message);
    },
  });

  const [user, setUser] = React.useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    (async () => {
      await api
        .get(`/users/user/${id}`)
        .then((res) => {
          console.log(res.data.data);
          setUser(res.data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    })();
  }, [id]);

  function onEditUserSubmit(values) {
    mutation.mutate(values);
  }
  function onEditProfileSubmit(values) {
    profileMutation.mutate(values);
  }

  const editUserForm = useForm({
    resolver: zodResolver(updateUserValidationSchema),
    defaultValues: {
      name: "",
      email: "",
    },
    values: {
      name: user?.name || "",
      email: user?.email || "",
    },
  });
  const editUserProfileForm = useForm({
    resolver: zodResolver(updateProfileValidationSchema),
    defaultValues: {
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
    values: {
      phone: user?.profile?.phone || "",
      address: user?.profile?.address || "",
      bloodGroup: user?.profile?.bloodGroup || "",
      cnic: user?.profile?.cnic || "",
      cnicBack: user?.profile?.cnicBack || "",
      cnicFront: user?.profile?.cnicFront || "",
      emergencyContact: user?.profile?.emergencyContact || "",
      fatherName: user?.profile?.fatherName || "",
      image: user?.profile?.image || "",
      userType: user?.profile?.userType || "",
    },
  });

  return (
    <div className="flex flex-col gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Edit User</CardTitle>
          <CardDescription>Update your user information here.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...editUserForm}>
            <form
              onSubmit={editUserForm.handleSubmit(onEditUserSubmit)}
              className="space-y-8"
            >
              <FormField
                control={editUserForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Full name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={editUserForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Full name" {...field} type="email" />
                    </FormControl>
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
      {user?.profile && (
        <Card>
          <CardHeader>
            <CardTitle>Edit User Profile</CardTitle>
            <CardDescription>Update user profile here.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...editUserProfileForm}>
              <form
                onSubmit={editUserProfileForm.handleSubmit(onEditProfileSubmit)}
                className="space-y-8"
              >
                {user?.profile?.image ? (
                  <div>
                    <Label className="block mb-4">User Image</Label>
                    <img
                      src={user?.profile?.image}
                      alt=""
                      className="w-44 max-w-sm h-44 rounded-full  object-cover"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      className="mt-2"
                      onClick={() =>
                        setUser({
                          ...user,
                          profile: {
                            ...user?.profile,
                            image: null,
                          },
                        })
                      }
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
                            setUser({
                              ...user,
                              profile: {
                                ...user?.profile,
                                image: url,
                              },
                            });
                          });
                        }}
                      />
                    </Label>
                    {editUserProfileForm.formState.errors.image && (
                      <FormMessage className="text-red-500 mt-2">
                        {editUserProfileForm.formState.errors.image.message}
                      </FormMessage>
                    )}
                  </div>
                )}
                <FormField
                  control={editUserProfileForm.control}
                  name="fatherName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Father Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Father Name"
                          {...field}
                          type="text"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={editUserProfileForm.control}
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
                  control={editUserProfileForm.control}
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
                  control={editUserProfileForm.control}
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
                  control={editUserProfileForm.control}
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
                {user?.profile?.cnicFront ? (
                  <div>
                    <Label className="block mb-4">CNIC Front Image</Label>
                    <img
                      src={user?.profile?.cnicFront}
                      alt=""
                      className="w-full max-w-sm rounded-md h-56 object-cover"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      className="mt-2"
                      onClick={() =>
                        setUser({
                          ...user,
                          profile: {
                            ...user?.profile,
                            cnicFront: null,
                          },
                        })
                      }
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
                            setUser({
                              ...user,
                              profile: {
                                ...user?.profile,
                                cnicFront: url,
                              },
                            });
                          });
                        }}
                      />
                    </Label>
                    {editUserProfileForm.formState.errors.cnicFront && (
                      <FormMessage className="text-red-500 mt-2">
                        {editUserProfileForm.formState.errors.cnicFront.message}
                      </FormMessage>
                    )}
                  </div>
                )}
                {user?.profile?.cnicBack ? (
                  <div>
                    <Label className="block mb-4">CNIC Back Image</Label>
                    <img
                      src={user?.profile?.cnicBack}
                      alt=""
                      className="w-full max-w-sm rounded-md h-56 object-cover"
                    />
                    <Button
                      type="button"
                      className="mt-2"
                      variant="outline"
                      onClick={() =>
                        setUser({
                          ...user,
                          profile: {
                            ...user?.profile,
                            cnicBack: null,
                          },
                        })
                      }
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
                            setUser({
                              ...user,
                              profile: {
                                ...user?.profile,
                                cnicBack: url,
                              },
                            });
                          });
                        }}
                      />
                    </Label>
                    {editUserProfileForm.formState.errors.cnicBack && (
                      <FormMessage className="text-red-500 mt-2">
                        {editUserProfileForm.formState.errors.cnicBack.message}
                      </FormMessage>
                    )}
                  </div>
                )}
                <FormField
                  control={editUserProfileForm.control}
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
                  control={editUserProfileForm.control}
                  name="userType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>User Type</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={user?.profile?.userType}
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
      )}
    </div>
  );
};

export default Edit;
