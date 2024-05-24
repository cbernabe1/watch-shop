import { useState } from "react";
import Button from "../components/Button";
import Header from "../components/Header";
import Input from "../components/Input";
import { useDispatch } from "react-redux";
import { contactPage } from "../redux/users";


function ContactPage(){
    const [contact, setContact] = useState({
        fullname: "",
        email: "",
        phonenumber: "",
        message:""
    });
    const dispatch = useDispatch();

    function handleChange(e){
        const {value,name} = e.target;
        setContact(prev => ({...prev, [name]: value}));

    }

    function handleSubmit(){
        dispatch(contactPage(contact));
    }

    return <div className="w-full flex justify-center">
           <div className="p-4 shadow-xl flex flex-col space-y-3 border rounded-lg mt-10">
           <h1 className="text-white text-xl font-semibold">Contact our team</h1>
            <p className="max-w-96 text-sm text-white">Got any questions or issues about our product? We're here to help.
                Kindly fill up the form and submit, we will replied to your queries right away once we receive the email. </p>
                
            <div>
            <Input label = "Full name" refName = "fullname" type = "text" placeholder="Enter your first and second name" handleChange={handleChange}/>
            <Input label = "Email" refName = "email" type = "email" placeholder="Enter your email" handleChange={handleChange}/>
            <Input label = "Phone number" refName = "phonenumber" type = "text" placeholder="Enter your phone number" handleChange={handleChange}/>
            <Input label = "Message" refName = "message" type = "text" placeholder="Leave us a message.." isTextArea handleChange={handleChange}/>         
            </div>
            <Button icon="send" name="Send message" isActive handleClick={handleSubmit}/>
           </div>
        </div>
}

export default ContactPage;