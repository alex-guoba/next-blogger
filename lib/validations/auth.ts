// import * as z from "zod"
import { zfd } from "zod-form-data";
import { z } from "zod";

// export const authSchema = z.object({
//   email: z.string().email({
//     message: "Please enter a valid email address",
//   }),
//   password: z
//     .string()
//     .min(8, {
//       message: "Password must be at least 8 characters long",
//     })
//     .max(100, {
//       message: "Password must be at most 100 characters long",
//     }),
// })

export const authSchema = zfd.formData({
  email: zfd.text(
    z.string().email({
      message: "Please enter a valid email address",
    })
  ),
  password: zfd.text(
    z
      .string()
      .min(8, {
        message: "Password must be at least 8 characters long",
      })
      .max(100, {
        message: "Password must be at most 100 characters long",
      })
  ),
});
