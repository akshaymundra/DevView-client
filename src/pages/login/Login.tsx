import Button from '@/components/common/buttons/Button';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import StyledInput from '@/components/common/inputFields/StyledInput';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { IModel } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { HttpService } from '@/services';
import { setAuthToken } from '@/lib/utils';
import { useAuthContext } from '@/hooks/useAuthContext';
import Loading from '@/components/common/loading/Loading';


const Login: React.FC = () => {
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const http = new HttpService();
    const navigate = useNavigate();
    const { user, dispatch, loading: userLoading } = useAuthContext();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: '/' } }

    const { register,
        handleSubmit,
        formState: { errors },
        setError
    } = useForm<IModel.LoginData>({ resolver: zodResolver(IModel.LoginSchema) });


    const onSubmit = async (data: IModel.LoginData) => {
        try {
            setLoading(true);
            const response = await http.service(true).push<any, IModel.LoginData>('/login', data);
            if (response.success) {
                setAuthToken(response.token, response.expiresIn);

                dispatch({ type: 'LOGIN', payload: response.user });

                navigate('/', { replace: true })
            }
        } catch (error) {
            // console.log(error)
        } finally {
            setLoading(false);
        }

    }

    if (userLoading) return <Loading />
    if (user) {
        return <Navigate to={from} />
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
                        Sign in to your account
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
                                {loading ? "Loading..." : 'Sign in'}
                            </Button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm text-gray-500">
                        Dont have an account?{' '}
                        <Link to="/register" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                            Register
                        </Link>
                    </p>
                </div>
            </div>
        </>
    );
};

export default Login;