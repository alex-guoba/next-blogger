// import * as z from "zod"
import { zfd } from "zod-form-data";
import { z } from "zod";

const _profileZod = z.object({
  user_name: z
    .string()
    .min(6, {
      message: "UserName must be at least 6 characters long",
    })
    .max(20, {
      message: "UserName must be at most 20 characters long",
    }),
  full_name: z
    .string()
    .min(8, {
      message: "FullName must be at least 8 characters long",
    })
    .max(20, {
      message: "FullName must be at most 20 characters long",
    }),
  website: z
    .string().url({
      message: "Please enter a valid website address",
    }).optional().or(z.literal('')),
  avatar_url: z
    .string().url({
      message: "Please enter a valid website address",
    }).optional().or(z.literal('')),
});

export const profileSchema = zfd.formData(_profileZod);

export type ProfileType = z.infer<typeof profileSchema>;
