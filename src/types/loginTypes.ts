import { z, ZodType } from 'zod';

export type LoginData = {
    email: string,
    password: string
}


export const LoginSchema: ZodType<LoginData> = z.object({
    email: z.string().email(),
    password: z.string().min(8, { message: "Password is too short" })
        .max(20, { message: "Password is too long" })
});
