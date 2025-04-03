import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/Card'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { useDispatch } from 'react-redux'
import { register } from '@/store/actions/auth/register'

const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [error, setError] = useState({});
    const token = localStorage.getItem('auth_token');
    const [userInfo, setUserInfo] = useState({
        name: "",
        email: '',
        password: '',
        confirm_password: '',
    })



    const handleChange = (e) => {
        setUserInfo({ ...userInfo, [e.target.name]: e.target.value })
    }

    const handleValidation = () => {
        let errors = {};
        let isValid = true;

        if (!userInfo.name?.trim()) {
            errors['name'] = 'Please enter your name';
            isValid = false;
        }

        if (!userInfo.email?.trim()) {
            errors['email'] = 'Please enter your email';
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(userInfo.email)) {
            errors['email'] = 'Please enter a valid email';
            isValid = false;
        }

        if (!userInfo.password?.trim()) {
            errors['password'] = 'Please enter a password';
            isValid = false;
        } else if (userInfo.password.length < 6) {
            errors['password'] = 'Password must be at least 6 characters';
            isValid = false;
        }

        if (!userInfo.confirm_password?.trim()) {
            errors['confirm_password'] = 'Please confirm your password';
            isValid = false;
        } else if (userInfo.confirm_password !== userInfo.password) {
            errors['confirm_password'] = 'Passwords do not match';
            isValid = false;
        }

        setError(errors);
        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (handleValidation()) {
            try {
                const payload={
                    user:{
                        ...userInfo
                    }
                }
                await dispatch(register(payload)).unwrap();
                navigate('/');
            } catch (error) {
                setError(prev => ({
                    ...prev,
                    submit: error.message || 'Registration failed. Please try again.'
                }));
            }
        }
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSubmit(e);
        }
    };

    return (
        <div className='flex justify-center items-center h-screen p-4'>
            <Card className="max-w-2xl w-full relative">
                {/* <div className='flex justify-center items-center pt-4'>
                    <img className='absolute -top-12 left-[30%] w-56' src={Logo} alt="logo" />
                </div> */}
                <CardHeader>
                    <CardTitle className="text-2xl font-500">Sign up</CardTitle>
                    <CardDescription>
                        Provide your Information. We Keep It Safe.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                    <div className="space-y-1">
                        <Label htmlFor="name">Name</Label>
                        <Input 
                            id="name" 
                            name="name" 
                            placeholder="John Doe" 
                            onChange={handleChange} 
                            onKeyPress={handleKeyPress} 
                            autoComplete='off'
                            value={userInfo.name}
                        />
                        {error.name && <div className="text-rose-600 text-sm">{error.name}</div>}
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="email">Email</Label>
                        <Input 
                            id="email" 
                            name="email" 
                            type="email"
                            placeholder="john.doe@example.com" 
                            onChange={handleChange} 
                            onKeyPress={handleKeyPress} 
                            autoComplete='off'
                            value={userInfo.email}
                        />
                        {error.email && <div className="text-rose-600 text-sm">{error.email}</div>}
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="password">Password</Label>
                        <Input 
                            id="password" 
                            name="password" 
                            type="password" 
                            placeholder="********" 
                            onChange={handleChange} 
                            onKeyPress={handleKeyPress} 
                            autoComplete='off'
                            value={userInfo.password}
                        />
                        {error.password && <div className="text-rose-600 text-sm">{error.password}</div>}
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="confirm_password">Confirm Password</Label>
                        <Input 
                            id="confirm_password" 
                            type="password" 
                            name="confirm_password" 
                            placeholder="********" 
                            onChange={handleChange} 
                            onKeyPress={handleKeyPress} 
                            autoComplete='off'
                            value={userInfo.confirm_password}
                        />
                        {error.confirm_password && <div className="text-rose-600 text-sm">{error.confirm_password}</div>}
                    </div>
                    {error.submit && <div className="text-rose-600 text-sm mt-2">{error.submit}</div>}
                </CardContent>
                <CardFooter className="sm:flex items-center justify-between block space-y-2">
                    <Button 
                        className="sm:w-auto order-last w-full" 
                        onClick={handleSubmit}
                    >
                       Create Account
                    </Button>
                    <Link to="/signin" className='text-[13px] order-1 sm:order-3'>
                        Already have an account? <span className='text-sm font-semibold hover:underline text-gray-800'>Sign In</span>
                    </Link>
                </CardFooter>
            </Card>
        </div>
    )
}

export default Register