import * as z from "zod";

const userRequestValidationSchema = z.object({
  userId: z
    .number({
      required_error: "User Id is required",
      message: "User Id must be a number",
      invalid_type_error: "User Id must be a number",
    })
    .min(1, "User Id must be at least 1"),
  type: z.enum(["ROOM_CLEANING", "ROOM_MAINTENANCE", "ROOM_CHANGE", "OTHER"], {
    required_error: "Type is required",
    message: "Type must be a valid type",
    invalid_type_error: "Type must be a valid type",
  }),
  message: z
    .string({
      required_error: "Message is required",
      message: "Message must be a string",
      invalid_type_error: "Message must be a string",
    })
    .min(3, "Message must be at least 3 characters long")
    .max(500, "Message is too long"),
  status: z
    .enum(["PENDING", "ASSIGNED", "COMPLETED"], {
      required_error: "Status is required",
      message: "Status must be a valid status",
      invalid_type_error: "Status must be a valid status",
    })
    .default("PENDING"),
});

export const updateUserRequestValidationSchema =
  userRequestValidationSchema.omit({
    userId: true,
    type: true,
    message: true,
  });

export default userRequestValidationSchema;
