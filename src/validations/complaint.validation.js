import * as z from "zod";

const complaintValidationSchema = z.object({
  message: z
    .string({
      required_error: "Message is required",
      message: "Message must be a string",
      invalid_type_error: "Message must be a string",
    })
    .min(3, "Message must be at least 3 characters long")
    .max(500, "Message is too long"),
  status: z.enum(["PENDING", "RESOLVED"]),
});

export const updateComplaintValidationSchema = complaintValidationSchema.omit({
  message: true,
});

export default complaintValidationSchema;
