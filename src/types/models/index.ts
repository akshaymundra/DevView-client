import { FieldError, UseFormRegister } from "react-hook-form";
import { z } from 'zod';


export interface FormFieldProps {
    register: UseFormRegister<any>,
    error: FieldError | undefined
}


export type objValLabel = {
    value: string,
    label: string
}


export const LoginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8, { message: "Password is too short" })
        .max(20, { message: "Password is too long" })
});
export type LoginData = z.infer<typeof LoginSchema>;


export const RegisterSchema = z.object({
    email: z.string().email(),
    fullName: z.string().min(3, { message: "Full name is too short" }),
    skills: z.array(z.object({
        label: z.string(),
        value: z.string()
    })).optional(),
    experienceLevel: z.enum(['Entry-level', 'Mid-level', 'Senior', 'Not Specified']),
    password: z.string()
        .min(8, { message: "Password must be 8 character long." })
        .max(20, { message: "Password must contain less than 20 characters." })
});
export type RegisterData = z.infer<typeof RegisterSchema>;


