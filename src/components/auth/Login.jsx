import React, { useEffect, useState } from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { toast } from 'sonner';
import { Link, useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthUser, setUserToken } from '@/redux/authSlice';
import { useLoginAuthMutation } from '../../service';

const Login = () => {
    const [input, setInput] = useState({
        email: "",
        password: ""
    });
    const {user} = useSelector(store=>store.auth);
    const [reqLogin, resLogin] = useLoginAuthMutation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const signupHandler = async (e) => {
        e.preventDefault();
        reqLogin(input)
    }
    useEffect(() => {
        if (resLogin.isSuccess) {
            dispatch(setAuthUser(resLogin?.data?.data));
            dispatch(setUserToken(resLogin?.data.data?.token));
            navigate("/");
            toast.success(resLogin?.data?.message);
            setInput({
                email: "",
                password: ""
            });
        }
        if(resLogin.isError) {
            toast.error(resLogin?.error?.data?.message);
        }

    },[resLogin])

    useEffect(()=>{
        if(user){
            navigate("/");
        }
    },[])
    return (
        <div className='flex items-center w-screen h-screen justify-center'>
            <form onSubmit={signupHandler} className='shadow-lg flex flex-col gap-5 p-8'>
                <div className='my-4'>
                    <h1 className='text-center font-bold text-xl'>LOGO</h1>
                    <p className='text-sm text-center'>Login to see photos & videos from your friends</p>
                </div>
                <div>
                    <span className='font-medium'>Email</span>
                    <Input
                        type="email"
                        name="email"
                        value={input.email}
                        onChange={changeEventHandler}
                        className="focus-visible:ring-transparent my-2"
                    />
                </div>
                <div>
                    <span className='font-medium'>Password</span>
                    <Input
                        type="password"
                        name="password"
                        value={input.password}
                        onChange={changeEventHandler}
                        className="focus-visible:ring-transparent my-2"
                    />
                </div>
                {
                    resLogin?.isLoading ? (
                        <Button>
                            <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                            Please wait
                        </Button>
                    ) : (
                        <Button type='submit'>Login</Button>
                    )
                }

                <span className='text-center'>Dosent have an account? <Link to="/signup" className='text-blue-600'>Signup</Link></span>
            </form>
        </div>
    )
}

export default Login