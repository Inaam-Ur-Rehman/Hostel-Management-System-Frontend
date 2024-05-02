import * as z from "zod";

const userValidationSchema = z.object({
  name: z
    .string({
      required_error: "Name is required",
      message: "Name must be a string",
      invalid_type_error: "Name must be a string",
    })
    .min(3, "Name must be at least 3 characters long")
    .max(50, "Name is too long"),
  email: z
    .string({
      required_error: "Email is required",
      message: "Email must be a valid email",
      invalid_type_error: "Email must be a valid email",
    })
    .email({ message: "Email must be a valid email" }),
  password: z
    .string({
      required_error: "Password is required",
      message: "Password must be a string",
      invalid_type_error: "Password must be a string",
    })
    .min(6, "Password must be at least 6 characters long")
    .max(80, "Password is too long"),
  role: z
    .enum(["USER", "ADMIN", "MANAGER"], {
      required_error: "Role is required",
      message: "Role must be a valid role",
      invalid_type_error: "Role must be a valid role",
    })
    .default("USER"),
});

export const updateUserValidationSchema = userValidationSchema.omit({
  password: true,
});

export default userValidationSchema;
