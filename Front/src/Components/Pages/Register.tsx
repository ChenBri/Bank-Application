import { useRef, useState } from 'react';
import { useNavigate } from "react-router-dom";

import api from '../../axiosUtils'
import { TextField } from '@mui/material';
import Button from '../Utils/Button';
import MyModal from '../Utils/MyModal';

interface User {
    email: string;
    password: string;
    phone: string;
}

export default function App() {

    const navigate = useNavigate();

    const [isError, setIsError] = useState<boolean>(false);
    const[isValid, setIsValid] = useState<boolean>(false);

    const [message, setMessage] = useState<string>("");

    let emailRef = useRef<HTMLInputElement>(null);
    let passwordRef = useRef<HTMLInputElement>(null);
    let verifyPasswordRef = useRef<HTMLInputElement>(null);
    let phoneRef = useRef<HTMLInputElement>(null);


    async function handleSubmit() {

        if (!emailRef.current || !passwordRef.current || !verifyPasswordRef.current || !phoneRef.current) return;

        let email: string = emailRef.current.value;
        let password: string = passwordRef.current.value;
        let verifyPassword: string = verifyPasswordRef.current.value;
        let phone: string = phoneRef.current.value;

        if (!email || !password || !verifyPassword || !phone) {
            
            setMessage("Some of your fields are empty!");
            setIsError(true);
            return;
        }
        if (password !== verifyPassword) {
            
            setMessage("Your passwords don't match!");
            setIsError(true);
            return;
        }

        const user: User = {
            email: email,
            password: password,
            phone: phone
        }


        await api.post("/register", user)
            .then(function (response: any) {
                setMessage(response.data.success);
                setIsValid(true);
            })
            .catch(function (error: any) {
                setMessage(error.response.data.error);
                setIsError(true);
            });
    }
    function handleCancel() {
        navigate('/');
      
    }
    return (
        <>
            {<MyModal isVisible={isValid} setIsVisible={setIsValid} header="Success" message={message} method={handleCancel} button="Continue"/>}
            {<MyModal isVisible={isError} setIsVisible={setIsError} header="Error" message={message} button="Cancel" />}

            <section className="gradient-form h-[100vh] fade-up">
                <div className="container h-full p-10 lg:p-24 ">


                    {/* Flex Container */}
                    <div className="g-0 lg:flex lg:flex-wrap">

                        {/* Left Side */}
                        <div className=" block rounded-t-lg lg:rounded-r-none lg:rounded-l-lg bg-white shadow-lg px-4 md:px-0 lg:w-6/12">


                            <div className="md:mx-6 md:p-6">
                                <div className="text-center">
                                    <img
                                        className="mx-auto w-48 animate-pulse"
                                        src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                                        alt="logo" />
                                    <h4 className="mb-12 mt-1 pb-1 text-xl font-semibold">
                                        We are Chen Bank™
                                    </h4>
                                </div>

                                <form>
                                    <p className="mb-4">Please login to your account</p>
                                    <div className='flex flex-col gap-4 pb-4'>
                                        <TextField id="email" label="Email" variant="outlined" inputRef={emailRef} />
                                        <TextField id="password" type="password" label="Password" variant="outlined" inputRef={passwordRef} />
                                        <TextField id="verify-password" type="password" label="Verify Password" variant="outlined" inputRef={verifyPasswordRef} />
                                        <TextField id="phone" label="Phone" variant="outlined" inputRef={phoneRef} />
                                    </div>

                                    <div className="mb-12 pb-1 pt-1 text-center">
                                        <Button type="button" classes="colorful-button" method={handleSubmit} text="Submit" />
                                        <a className="hover:text-blue-500 duration-500" href="/terms">Terms and conditions</a>
                                    </div>


                                    <div className="flex items-center justify-between pb-6">
                                        <p className="mb-0 me-2">Have an account?</p>
                                        <Button type="button" classes="empty-button" method={handleCancel} text="Login" />
                                    </div>
                                </form>
                            </div>
                        </div>

                        {/* Right Side */}
                        <div
                            className="rainbow-grad flex items-center rounded-b-lg lg:w-6/12 lg:rounded-e-lg lg:rounded-bl-none"
                        >
                            <div className="px-4 py-6 text-white md:mx-6 md:p-12">
                                <h4 className="mb-6 text-xl lg:text-2xl font-semibold">
                                    We are more than just a bank
                                </h4>
                                <p className="text-sm lg:text-[15px] mb-2">
                                    Welcome to Chen Bank, where your financial aspirations meet unparalleled service.
                                </p>
                                <p className="text-sm lg:text-[15px] mb-2">At Chen Bank, we prioritize your needs with a commitment to excellence, offering
                                    a diverse range of financial products and services tailored to help you achieve
                                    your goals.</p>

                                <p className="text-sm lg:text-[15px]">Whether you're saving for the future, planning for a major investment, or simply
                                    managing your day-to-day finances, Chen Bank stands as a trusted partner in your
                                    journey towards financial success.</p>

                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

