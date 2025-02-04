import { z } from "zod";

export const RegisterSchema = z
  .object({
    name: z
      .string()
      .min(1, "Name must be at least 1 character long")
      .max(50, "Name must be less than 50 characters long")
      .trim(),
    email: z.string().email("Please enter a valid email").trim(),
    password: z
      .string()
      .min(1, "Please enter a password")
      .min(6, "Password must be at least 6 characters long")
      .max(50, "Password must be less than 50 characters long")
      .trim(),
    passwordConfirmation: z
      .string()
      .min(1, "Please enter a password")
      // .min(6, "Password must be at least 6 characters long")
      .max(50, "Password must be less than 50 characters long")
      .trim(),
  })
  .refine(
    (data) => {
      return data.password === data.passwordConfirmation;
    },
    {
      message: "Passwords do not match",
      path: ["passwordConfirmation"],
    },
  );

export type TRegisterSchema = z.infer<typeof RegisterSchema>;

export const LoginSchema = z.object({
  email: z.string().email("Please enter a valid email").trim(),
  password: z.string().min(1, "Please enter a password").trim(),
});

export type TLoginSchema = z.infer<typeof LoginSchema>;

export const SettingsFormSchema = z.object({
  avatar: z.string().min(1, "Please upload an avatar"),
  name: z.string().min(1, "Please enter your name").trim(),
  username: z
    .string()
    .min(1, "Please enter a username")
    .min(3, "Username must be at least 3 characters long")
    .max(20, "Username must be less than 20 characters long")
    .trim(),
  subtitle: z.string().trim().optional(),
  bio: z.string().trim().optional(),
});

export type TSettingsFormSchema = z.infer<typeof SettingsFormSchema>;
