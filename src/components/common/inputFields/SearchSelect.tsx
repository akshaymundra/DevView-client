import { IModel } from '@/types/';
import React from 'react';
import Select from 'react-select';
import { Controller } from 'react-hook-form';

interface SearchSelectProps {
    options: IModel.objValLabel[],
    label: string,
    id: string,
    name: string,
    control: any,
    error: any,
}

const SearchSelect: React.FC<SearchSelectProps> = ({
    options,
    label,
    id,
    name,
    error,
    control,
    ...props
}) => {
    return (
        <div>
            {label &&
                <label htmlFor={id ? id : `${label}`} className="block text-sm font-medium leading-6 text-gray-900">
                    {label}
                </label>
            }
            <Controller
                name={name}
                control={control}
                render={({ field }) => (
                    <Select
                        {...field}
                        options={options}
                        id={id}
                        isMulti
                        {...props}
                    />
                )}
            />
        </div>
    )
}

export default SearchSelect