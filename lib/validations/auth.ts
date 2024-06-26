// import * as z from "zod"
import { zfd } from "zod-form-data";
import { z } from "zod";

const _authZod = z.object({
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
  password: z
    .string()
    .min(8, {
      message: "Password must be at least 8 characters long",
    })
    .max(100, {
      message: "Password must be at most 100 characters long",
    }),
});

export const authSchema = zfd.formData(_authZod);

export const checkEmailSchema = zfd.formData(
  z.object({
    email: _authZod.shape.email,
  })
);

const _resetPasswordZod = z
  .object({
    password: _authZod.shape.password,
    confirmPassword: _authZod.shape.password,
    // code: verifyEmailSchema.shape.code,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
export const resetPasswordSchema = zfd.formData(_resetPasswordZod);
