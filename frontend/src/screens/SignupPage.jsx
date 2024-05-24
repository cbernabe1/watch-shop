import Input from "../components/Input";
import Header from "../components/Header";
import Button from "../components/Button";
import { useDispatch } from "react-redux";
import React, {useState} from 'react';
import { addUser } from "../redux/users";
import {Bounce, ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SignupPage(){
    const [newUser, setNewUser] = useState({
        fullname: "",
        email: "",
        password: ""
    });
    const [termsPolicy, setTermsPolicy] = useState(false);
    const dispatch = useDispatch();
    const notify = () => {
        toast.info('You did not agree to the terms and condition, please checked it first in order to proceed.', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
            });
    };

    function handleOnChange(e){
        const {value, name} = e.target;
        setNewUser(prev => ({...prev, [name]: value}))
        console.log(newUser);
    }

    function handleAddUser(){
       if(termsPolicy){ 
       dispatch(addUser(newUser));
       setNewUser({fullname: "",email: "", password: ""});
       }else{
        notify();
       }
    }

    function handleTermsAndCondition(){
        setTermsPolicy(!termsPolicy);
    }
    return <>
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-700 ">
                <div className="flex flex-col space-y-4 shadow-xl p-6 bg-slate-800 rounded-lg">
                    <h1 className="mb-4 text-2xl font-semibold text-white text-center">Create an account</h1>
                    <div className="rounded-md flex flex-col space-y-4 w-96">
                        <Input label = "Full name" refName = "fullname" type = "text" placeholder="Enter your first and second name" handleChange = {handleOnChange} value = {newUser.fullname}/>
                        <Input label = "Email" refName = "email" type = "email" placeholder="Enter your email" handleChange = {handleOnChange} value = {newUser.email}/>
                        <Input label = "Password" refName = "password" type = "password" placeholder="Enter your password" handleChange = {handleOnChange} value={newUser.password}/>
                    </div>
                    <div className="max-w-80 flex space-x-3">
                        <input type="checkbox" value={termsPolicy} onChange={handleTermsAndCondition}/>
                        <p className="text-white">Creating an account mean's you agree with our 
                        <a href="" className="text-blue-700">Terms of Service</a> and 
                        <a href="" className="text-blue-700">Policy</a></p>
                    </div>
                    <div className="flex flex-col space-y-4">
                        <Button icon="thunder" name="Get Started" isActive handleClick = {handleAddUser}/>
                        <Button icon="google" name="Sign in with Google"/>
                    </div>
                    <div>
                        <p className="text-white">Already a member? <a href="/login" className="text-blue-700">Sign in</a></p>
                    </div>
                </div>
    </div>
    <ToastContainer/>
    </>
}

export default SignupPage;