import Button from '@/components/common/buttons/Button'
import StyledInput from '@/components/common/inputFields/StyledInput';
import StyledSelect from '@/components/common/inputFields/StyledSelect';
import { experienceLevels } from '@/lib/constants';
import { RegisterData, RegisterSchema } from '@/types/RegisterTypes';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom'

const Register: React.FC = () => {

    const [show, setShow] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm<RegisterData>({ resolver: zodResolver(RegisterSchema) });

    const onSubmit = (data: RegisterData) => {
        console.log(data);
    }

    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        className="mx-auto h-10 w-auto"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                        alt="Your Company"
                    />
                    <h2 className="mt-10 text-center heading-h2">
                        Create new account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)} method="POST">
                        <StyledInput
                            label="Email address"
                            id="email"
                            type="email"
                            autoComplete="email"
                            required
                            name='email'
                            register={register}
                            error={errors.email}
                        />
                        <StyledInput
                            label="Full Name"
                            id="full-name"
                            type="text"
                            required
                            name='fullName'
                            register={register}
                            error={errors.fullName}
                        />

                        <StyledSelect
                            label='Experience Level'
                            id='experience-level'
                            name='experienceLevel'
                            register={register}
                            error={errors.experienceLevel}
                            options={experienceLevels}
                            required
                        />

                        <StyledInput
                            label="Password"
                            id="password"
                            type={show ? 'text' : 'password'}
                            autoComplete="current-password"
                            required
                            name='password'
                            register={register}
                            error={errors.password}
                            endAdornment={
                                <button
                                    type='button'
                                    onClick={() => setShow(!show)}
                                    className='text-xs font-bold text-indigo-600 hover:text-indigo-500 pr-3'
                                >
                                    {show ? 'Hide' : 'Show'}
                                </button>
                            }
                        />

                        <div>
                            <Button
                                type='submit'
                                varient='primary'
                            >
                                Sign up
                            </Button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm text-gray-500">
                        Already have an account?{' '}
                        <Link to="/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </>
    )
}

export default Register