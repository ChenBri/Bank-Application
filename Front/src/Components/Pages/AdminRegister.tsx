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
    adminKey: string;
}

export default function App() {

    const navigate = useNavigate();

    const [isError, setIsError] = useState<boolean>(false);
    const [isValid, setIsValid] = useState<boolean>(false);

    const [message, setMessage] = useState<string>("");

    let emailRef = useRef<HTMLInputElement>(null);
    let passwordRef = useRef<HTMLInputElement>(null);
    let verifyPasswordRef = useRef<HTMLInputElement>(null);
    let phoneRef = useRef<HTMLInputElement>(null);
    let keyRef = useRef<HTMLInputElement>(null);


    async function handleSubmit() {

        if (!emailRef.current || !passwordRef.current || !verifyPasswordRef.current || !phoneRef.current || !keyRef.current) return;

        let email: string = emailRef.current.value;
        let password: string = passwordRef.current.value;
        let verifyPassword: string = verifyPasswordRef.current.value;
        let phone: string = phoneRef.current.value;
        let key: string = keyRef.current.value;

        if (!email || !password || !verifyPassword || !phone || !key) {

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
            phone: phone,
            adminKey: key
        }


        await api.post("/admin/register", user)
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
            {<MyModal isVisible={isValid} setIsVisible={setIsValid} header="Success" message={message} method={handleCancel} button="Continue" />}
            {<MyModal isVisible={isError} setIsVisible={setIsError} header="Error" message={message} button="Cancel" />}

            <section className="gradient-form fade-up">
                <div className="container p-10 flex justify-center">

                        <div className=" block rounded-t-lg lg:rounded-r-none lg:rounded-l-lg bg-white shadow-lg px-4 md:px-0 md:w-8/12 lg:w-6/12">

                                <div className="text-center">
                                    <img
                                        className="mx-auto w-48 animate-pulse"
                                        src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                                        alt="logo" />
                                </div>

                                <form>
                                    <p className="mb-4 text-center text-2xl">Admin Registeration:</p>
                                    <div className='flex flex-col gap-4 pb-4'>
                                        <TextField id="email" label="Email" variant="outlined" inputRef={emailRef} />
                                        <TextField id="password" type="password" label="Password" variant="outlined" inputRef={passwordRef} />
                                        <TextField id="verify-password" type="password" label="Verify Password" variant="outlined" inputRef={verifyPasswordRef} />
                                        <TextField id="phone" label="Phone" variant="outlined" inputRef={phoneRef} />
                                        <TextField id="key" label="Secret Key" variant="outlined" inputRef={keyRef} />
                                    </div>

                                    <div className="mb-12 pb-1 pt-1 text-center">
                                        <Button type="button" classes="colorful-button" method={handleSubmit} text="Submit" />
                                    </div>

                                    <div className="mb-12 pb-1 pt-1 text-center">
                                        <Button type="button" classes="empty-button" method={handleCancel} text="Cancel" />
                                    </div>
                                </form>
                           
                        </div>
                </div>
            </section>
        </>
    );
}

