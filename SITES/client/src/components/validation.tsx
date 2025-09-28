import * as Yup from "yup";

export const siteSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  address: Yup.string().required("Address is required"),
  score: Yup.number()
    .min(0, "Score must be at least 0")
    .max(10, "Score cannot exceed 10")
    .required("Score is required"),
});