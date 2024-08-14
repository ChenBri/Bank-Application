import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import api from "../../axiosUtils";
import { TextField } from "@mui/material";
import VerificationModal from "../Utils/VerificationModal";
import Button from "../Utils/Button";
import MyModal from "../Utils/MyModal";

interface Login {
    email: string;
    password: string;
}

export default function App() {

    const [isActive, setIsActive] = useState(false);

    const [isError, setIsError] = useState(false);
    const [isValid, setIsValid] = useState(false);
    const [message, setMessage] = useState("");

    const navigate = useNavigate();

    let emailRef = useRef<any>("");
    let passwordRef = useRef<any>("");

    async function handleLogin() {
        let email: string = emailRef.current.value;
        let password: string = passwordRef.current.value;

        if (!email || !password) {
            setMessage("Some of your fields are empty!");
            setIsError(true);
            return;
        }

        const user: Login = {
            email: email,
            password: password,
        }

        sessionStorage.setItem("email", email);

        await api.post("/authenticate", user)
            .then(function (response: any) {

                if (response.data.error) {
                    setIsActive(true);
                    return;
                }

                setMessage(response.data.success);
                setIsValid(true);
            })
            .catch(function (error: any) {
                setMessage(error.response.data.error);
                setIsError(true);
            });
    }

    function handleRegister() {
        navigate('/register');

    }

    function handleDashboard() {
        navigate('/dashboard');
    
    }

    return (
        <>

            <MyModal isVisible={isValid} setIsVisible={setIsValid} header="Success" message={message} method={handleDashboard} button="Continue" />
            <MyModal isVisible={isError} setIsVisible={setIsError} header="Error" message={message} button="Cancel" />
            <VerificationModal isActive={isActive} setIsActive={setIsActive} />

            <section className="gradient-form h-[100vh]">
                <div className="container h-full p-10 lg:p-24 fade-up">


                    {/* Flex Container */}
                    <div className="g-0 lg:flex lg:flex-wrap">

                        {/* Left Side */}
                        <div className=" block rounded-t-lg lg:rounded-r-none lg:rounded-l-lg bg-white shadow-lg px-4 md:px-0 lg:w-6/12">


                            <div className="md:mx-6 md:p-12">
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
                                    <TextField className="w-full mb-4" id="email" label="Email" variant="outlined" inputRef={emailRef} />
                                    <TextField className="w-full mb-4" id="password" type="password" label="Password" variant="outlined" inputRef={passwordRef} />

                                    <div className="mb-12 pb-1 pt-1 text-center">
                                        <Button type="button" classes="colorful-button" method={handleLogin} text="Login" />
                                        <a className="hover:text-blue-500 duration-500" href="/forgot-password">Forgot password?</a>
                                    </div>


                                    <div className="flex items-center justify-between pb-6">
                                        <p className="mb-0 me-2">Don't have an account?</p>
                                        <Button type="button" classes="empty-button" method={handleRegister} text="Register" />
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

