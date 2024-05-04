import { z } from "zod";

const feesValidationSchema = z.object({
  userId: z.string({ required_error: "User ID is required" }).uuid(),
  amount: z
    .number({
      required_error: "Amount is required",
      message: "Amount must be a number",
      invalid_type_error: "Amount must be a number",
    })
    .min(1, "Amount must be at least 1")
    .max(100000, "Amount is too large"),
  month: z.enum([
    "JANUARY",
    "FEBRUARY",
    "MARCH",
    "APRIL",
    "MAY",
    "JUNE",
    "JULY",
    "AUGUST",
    "SEPTEMBER",
    "OCTOBER",
    "NOVEMBER",
    "DECEMBER",
  ]),
  note: z.string().max(100, "Note is too long").optional(),
});

export default feesValidationSchema;
