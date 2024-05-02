import * as z from "zod";

const roomValidationSchema = z.object({
  roomNumber: z
    .number({
      required_error: "Room Number is required",
      message: "Room Number must be a number",
      invalid_type_error: "Room Number must be a number",
    })
    .min(1, "Room Number must be at least 1"),

  capacity: z
    .number({
      required_error: "Capacity is required",
      message: "Capacity must be a number",
      invalid_type_error: "Capacity must be a number",
    })
    .min(1, "Capacity must be at least 1")
    .max(10, "Capacity is too large")
    .transform((value) => parseInt(value)),
  floor: z
    .number({
      required_error: "Floor is required",
      message: "Floor must be a number",
      invalid_type_error: "Floor must be a number",
    })
    .min(1, "Floor must be at least 1")
    .max(10, "Floor is too large")
    .transform((value) => parseInt(value)),
  status: z
    .enum(["AVAILABLE", "OCCUPIED"], {
      required_error: "Status is required",
      message: "Status must be a valid status",
      invalid_type_error: "Status must be a valid status",
    })
    .default("AVAILABLE"),
});

export default roomValidationSchema;
