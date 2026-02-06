import z from "zod"

export const signInSchema = z.object({
  email: z.email("Invalid email format").min(1, "Email is required"),
  password: z.string().min(6, "Password must be at least 6 characters").min(1, "Password is required"),
})

export type SignInSchema = z.infer<typeof signInSchema>