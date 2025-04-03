import React, { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/Card'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '@/store/actions/auth/login'
import { Eye, EyeOff } from 'lucide-react'

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading } = useSelector(state => state);
  const [error, setError] = useState({});
  const token = localStorage.getItem('auth_token');
  const [userInfo, setUserInfo] = useState({
    email: '',
    password: '',
  })
  const [passwordVisible, setPasswordVisible] = useState(false); // Add this state


  const handleChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value })
  }

  const handleValidation = () => {
    let errors = {};
    let isValid = true;
    if (userInfo.email === '') {
      errors['email'] = 'Please enter your email';
      isValid = false;
    }
    if (userInfo.password === '') {
      errors['password'] = 'Please enter a password';
      isValid = false;
    }

    setError(errors);
    return isValid;
  };

  const handleSubmit = (e) => {
    if (handleValidation()) {
      dispatch(loginUser(userInfo, navigate))
    }
  }
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className='flex justify-center items-center  h-screen p-4'>
      <Card className="max-w-2xl w-full relative" >
        {/* <div className='flex justify-center items-center pt-4'>
          <img className='absolute -top-12 left-[30%] w-56' src={Logo} alt="logo image" />
        </div> */}
        <CardHeader>
          <CardTitle className="text-2xl font-500">Sign in</CardTitle>
          <CardDescription>
            Provider your  Credentials We Keep It Safe.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="space-y-1">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" name="email" placeholder="johnDoe@gmail.com" onChange={(e) => handleChange(e)} onKeyPress={handleKeyPress} autoComplete='off' />
            <div className={error['email'] ? "text-rose-600 text-sm" : ''}>{error['email'] ? error['email'] : null}</div>
          </div>
          <div className="space-y-1 relative">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type={passwordVisible ? 'text' : 'password'} name="password" placeholder="********" onChange={handleChange} onKeyPress={handleKeyPress} autoComplete='off' />
            <Button className=" bg-transparent cursor-pointer order-last py-2 px-0 shadow-none border-0  hover:!bg-transparent border-s absolute right-0 top-[18px] rounded-ss-none rounded-es-none" onClick={togglePasswordVisibility}>
              {passwordVisible ? <EyeOff className='text-black' /> : <Eye className='text-black' />}
            </Button>
            <div className={error['password'] ? "text-rose-600 text-sm  " : ''}>{error['password'] ? error['password'] : null}</div>
          </div>
        </CardContent>
        <CardFooter className="sm:flex items-center justify-between block space-y-2">
          <Button className="order-last  " onClick={handleSubmit}>Login</Button>
          <Link to="/signup" className='text-[13px]  order-1 sm:order-3 '>Don’t have an account? <span className="text-sm font-semibold hover:underline text-gray-700">Sign Up Now</span></Link>
        </CardFooter>

      </Card>
    </div>
  )
}

export default Login