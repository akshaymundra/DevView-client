import { FieldError, UseFormRegister } from "react-hook-form";

export interface FormFieldProps {
    register: UseFormRegister<any>,
    error: FieldError | undefined
}

export type objValLabel = {
    value: string,
    label: string
}