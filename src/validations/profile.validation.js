import * as z from "zod";

const profileValidationSchema = z.object({
  userId: z
    .string({
      required_error: "User ID is required",
      message: "User ID must be a string",
      invalid_type_error: "User ID must be a string",
    })
    .uuid("Invalid User ID"),
  phone: z
    .string({
      required_error: "Phone is required",
      message: "Phone must be a string",
      invalid_type_error: "Phone must be a string",
    })
    .min(11, "Phone must be at least 11 characters long")
    .max(11, "Phone is too long"),
  address: z
    .string({
      required_error: "Address is required",
      message: "Address must be a string",
      invalid_type_error: "Address must be a string",
    })
    .min(10, "Address must be at least 10 characters long")
    .max(100, "Address is too long"),
  bloodGroup: z.enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]),
  cnic: z
    .string({
      required_error: "CNIC is required",
      message: "CNIC must be a string",
      invalid_type_error: "CNIC must be a string",
    })
    .min(13, "CNIC must be at least 13 characters long")
    .max(13, "CNIC is too long"),
  cnicBack: z
    .string({
      required_error: "CNIC Back Image is required",
      message: "CNIC Back Image must be a string url",
      invalid_type_error: "CNIC Back Image must be a string url",
    })
    .url("Invalid CNIC back side image url"),
  cnicFront: z
    .string({
      required_error: "CNIC Front Image is required",
      message: "CNIC Front Image must be a string url",
      invalid_type_error: "CNIC Front Image must be a string url",
    })
    .url("Invalid CNIC front side image url"),
  emergencyContact: z
    .string({
      required_error: "Emergency Contact is required",
      message: "Emergency Contact must be a string",
      invalid_type_error: "Emergency Contact must be a string",
    })
    .min(11, "Emergency Contact must be at least 11 characters long")
    .max(11, "Emergency Contact is too long"),
  fatherName: z
    .string({
      required_error: "Father Name is required",
      message: "Father Name must be a string",
      invalid_type_error: "Father Name must be a string",
    })
    .min(3, "Father Name must be at least 3 characters long")
    .max(50, "Father Name is too long"),
  image: z
    .string({
      required_error: "Image is required",
      message: "Image must be a string url",
      invalid_type_error: "Image must be a string url",
    })
    .url("Invalid image url"),
  userType: z.enum(["STUDENT", "JOB_HOLDER", "OTHER"], {
    required_error: "User Type is required",
    message: "User Type must be a valid user type",
    invalid_type_error: "User Type must be a valid user type",
  }),
});

export const updateProfileValidationSchema = profileValidationSchema.omit({
  userId: true,
});

export default profileValidationSchema;
