import { IModel } from '@/types';
import React from 'react'



interface StyledSelectProps extends React.InputHTMLAttributes<HTMLSelectElement>, IModel.FormFieldProps {
    label?: string,
    name: string,
    valueAsNumber?: boolean,
    id?: string,
    options: IModel.objValLabel[];
}

const StyledSelect: React.FC<StyledSelectProps> = ({
    label,
    name,
    valueAsNumber,
    id,
    error,
    register,
    options,
    ...props
}) => {
    return (
        <div>
            {label &&
                <label htmlFor={id ? id : `${label}`} className="block text-sm font-medium leading-6 text-gray-900">
                    {label}
                </label>
            }
            <div className="relative mt-2 rounded-md shadow-sm">
                <select
                    id={id}
                    className='select'
                    {...register(name, { valueAsNumber })}
                    {...props}
                >
                    {options.map((option, index) => (
                        <option
                            key={index}
                            value={option.value}
                        >
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>

        </div>
    )
}

export default StyledSelect