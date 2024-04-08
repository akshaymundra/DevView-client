import { IModel } from '@/types'
import React from 'react'

interface StyledInputProps extends React.InputHTMLAttributes<HTMLInputElement>, IModel.FormFieldProps {
  label?: string,
  startText?: string,
  className?: string,
  name: string,
  valueAsNumber?: boolean,
  id?: string,
  endAdornment?: React.ReactNode,
  endAdornLabel?: string,
  endAdornId?: string,
}

const StyledInput: React.FC<StyledInputProps> = ({
  label,
  startText,
  className,
  id,
  endAdornment,
  endAdornId,
  endAdornLabel,
  name,
  valueAsNumber,
  error,
  register,
  ...props
}) => {
  return (
    <div className='text-start'>
      {label &&
        <label htmlFor={id ? id : `${label}`} className="block text-sm font-medium leading-6 text-gray-900">
          {label}
        </label>
      }
      <div className="relative mt-2 rounded-md shadow-sm">
        {startText &&
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <span className="text-gray-500 sm:text-sm">{startText}</span>
          </div>
        }
        <input
          id={id ? id : `${label}`}
          className={`input ${startText && 'pl-7'}`}
          {...register(name, { valueAsNumber })}
          {...props}
        />
        {endAdornment &&
          <div className="absolute inset-y-0 right-0 flex items-center">
            <label htmlFor={endAdornId} className="sr-only">
              {endAdornLabel}
            </label>
            {endAdornment}
          </div>
        }
      </div>
      {error &&
        <p className="mt-2 text-sm text-red-600">
          {error.message}
        </p>
      }
    </div>
  )
}

export default StyledInput