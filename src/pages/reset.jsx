import api from "@/http/api";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
const ResetPassword = () => {
  const { token } = useParams();
  const mutation = useMutation({
    mutationFn: (data) => api.post(`/forgot-password/reset/${token}`, data),
    onSuccess: () => {
      alert("Password reset successfully");
      toast.success("Password reset successfully");
      window.location.href = "/login";
    },
    onError: (err) => {
      alert(err.response.data.message || "Something went wrong");
      toast.error(err.response.data.message || "Something went wrong");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const password = formData.get("password");
    const confirmPassword = formData.get("confirm-password");

    if (password !== confirmPassword) {
      return toast.error("Passwords do not match");
    }
    mutation.mutate({ password });
  };
  return (
    <div className="flex h-screen items-center justify-center">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Create a new password</CardTitle>
          <CardDescription>Enter your new password below</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="grid gap-4" onSubmit={handleSubmit}>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                name="password"
                placeholder="Password"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Confirm Password</Label>
              <Input
                id="confirm-password"
                type="password"
                name="confirm-password"
                placeholder="Confirm Password"
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Submit
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResetPassword;
