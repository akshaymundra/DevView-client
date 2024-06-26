import Button from '@/components/common/buttons/Button'
import SearchSelect from '@/components/common/inputFields/SearchSelect';
import StyledInput from '@/components/common/inputFields/StyledInput';
import StyledSelect from '@/components/common/inputFields/StyledSelect';
import { developerSkills, experienceLevels } from '@/lib/constants';
import { HttpService } from '@/services';
import { IModel } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom'

const Register: React.FC = () => {

    const http = new HttpService();
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
        setError,
    } = useForm<IModel.RegisterData>({ resolver: zodResolver(IModel.RegisterSchema) });

    const onSubmit = async (data: IModel.RegisterData) => {
        try {
            setLoading(true);
            const response = await http.service(true).push<any, IModel.RegisterData>('/register', data);
            if (response.success) {
                navigate('/');
            } else {
            }
        } catch (error) {
            // console.log(error);
        } finally {
            setLoading(false);
        }
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

                        <SearchSelect
                            id='select-skills'
                            label='Skills'
                            name='skills'
                            options={developerSkills}
                            error={errors.skills}
                            control={control}
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
                                disabled={loading}
                            >
                                {loading ? 'loading...' : 'Sign up'}
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