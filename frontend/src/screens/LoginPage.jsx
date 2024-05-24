import Header from '../components/Header';
import Input from '../components/Input';
import Button from '../components/Button';
import { useDispatch } from 'react-redux';
import { loginUser } from '../redux/users';
import { useState } from 'react';

function LoginPage(){
    const dispatch = useDispatch();
    const [loginInfo, setLoginInfo] = useState({
        email: "",
        password: ""
    });

    function handleLogin(){
       dispatch(loginUser(loginInfo));
    }

    function handleOnChange(e){
        const {value, name} = e.target;
        setLoginInfo(prev=>({...prev,[name]: value}));
    }

    return <div className="flex flex-col items-center justify-center min-h-screen bg-slate-700 ">
                <div className="flex flex-col space-y-4 shadow-xl p-6 bg-slate-800 rounded-lg">
                    <h1 className="text-2xl font-semibold text-white text-center">Welcome back</h1>
                    <p className="mb-4 text-center text-white">Please enter your details to sign in.</p>
                    <div className="rounded-md flex flex-col space-y-4 w-96">
                        <Input label = "Email" refName = "email" type = "email" placeholder="Enter your email" handleChange = {handleOnChange} value = {loginInfo.email}/>
                        <Input label = "Password" refName = "password" type = "password" placeholder="Enter your password" handleChange = {handleOnChange} value={loginInfo.password}/>
                    </div>
                    <div className="flex flex-col space-y-4">
                        <Button icon="thunder" name="Log In" isActive handleClick={handleLogin}/>
                        <Button icon="google" name="Sign in with Google"/>
                    </div>
                    <div>
                        <p className="text-white">Don't have an account? <a href="/signup" className="text-blue-700">Register</a></p>
                    </div>
                </div>
    </div>
}

export default LoginPage;