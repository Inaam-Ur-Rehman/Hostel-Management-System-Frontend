import { z } from "zod";

const inventoryValidationSchema = z.object({
  item: z
    .string({
      required_error: "Item is required",
      message: "Item must be a string",
      invalid_type_error: "Item must be a string",
    })
    .min(3, "Item must be at least 3 characters long")
    .max(100, "Item is too long"),
  quantity: z
    .number({
      required_error: "Quantity is required",
      message: "Quantity must be a number",
      invalid_type_error: "Quantity must be a number",
    })
    .min(1, "Quantity must be at least 1"),
  unit: z.enum(["KG", "LITER", "PIECE"], {
    required_error: "Unit is required",
    message: "Unit must be a string",
    invalid_type_error: "Unit must be a string",
  }),
  price: z
    .number({
      required_error: "Price is required",
      message: "Price must be a number",
      invalid_type_error: "Price must be a number",
    })
    .min(1, "Price must be at least 1"),
  note: z.string().max(255, "Note is too long").optional(),
});

export default inventoryValidationSchema;
