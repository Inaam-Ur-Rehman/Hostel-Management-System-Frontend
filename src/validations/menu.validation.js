import * as z from "zod";

const menuValidationSchema = z.object({
  day: z.enum(
    [
      "SUNDAY",
      "MONDAY",
      "TUESDAY",
      "WEDNESDAY",
      "THURSDAY",
      "FRIDAY",
      "SATURDAY",
    ],
    {
      required_error: "Day is required",
      message: "Day must be a valid day",
      invalid_type_error: "Day must be a valid day",
    }
  ),
  breakfast: z
    .string({
      required_error: "Breakfast is required",
      message: "Breakfast must be a string",
      invalid_type_error: "Breakfast must be a string",
    })
    .min(3, "Breakfast must be at least 3 characters long")
    .max(50, "Breakfast is too long"),
  lunch: z
    .string({
      required_error: "Lunch is required",
      message: "Lunch must be a string",
      invalid_type_error: "Lunch must be a string",
    })
    .min(3, "Lunch must be at least 3 characters long")
    .max(50, "Lunch is too long"),
  dinner: z
    .string({
      required_error: "Dinner is required",
      message: "Dinner must be a string",
      invalid_type_error: "Dinner must be a string",
    })
    .min(3, "Dinner must be at least 3 characters long")
    .max(50, "Dinner is too long"),
});
export const updateMenuValidationSchema = menuValidationSchema.omit({
  day: true,
});
export default menuValidationSchema;
