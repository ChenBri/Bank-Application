import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Table from '../Utils/Table';
import SendTransaction from '../Utils/SendTransaction';
import api from '../../axiosUtils';
import MyModal from '../Utils/MyModal';
import Button from '../Utils/Button';



export default function App() {
    const navigate = useNavigate();

    const [updates, setUpdates] = useState<Object>([]);
    const [balance, setBalance] = useState<number>(0);

    const [isError, setIsError] = useState<boolean>(false);
    const [isValid, setIsValid] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");

    useEffect(() => {
        updateTransactions();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    async function updateTransactions() {

        await api.get("/transactions")
            .then(function (response: any) {
                setUpdates(response.data);
            })
            .catch(function (error) {
                setMessage(error.response.data.error);
                setIsError(true);
            });

        await api.get("/balance")
            .then(function (response: any) {
                setBalance(response.data.amount);
            })
            .catch(function (error) {
                setMessage(error.response.data.error);
                setIsError(true);
            });

    }


    async function handleLogout() {

        await api.delete("/logout")
            .then(function (response: any) {
                sessionStorage.removeItem("email");
                navigate('/');
            })
            .catch(function (error) {
                setMessage(error.response.data.error);
                setIsError(true);
            });
    }

    return (

        <>
            {<MyModal isVisible={isValid} setIsVisible={setIsValid} header="Success" message={message} button="Continue" />}
            {<MyModal isVisible={isError} setIsVisible={setIsError} header="Error" message={message} button="Cancel" />}



            <section className="gradient-form">
                <div className="container p-10 lg:p-24 fade-up">


                    {/* Flex Container */}
                    <div className="lg:flex lg:flex-wrap ">

                        {/* Left Side */}
                        <div className=" rounded-t-lg lg:rounded-r-none lg:rounded-l-lg bg-white shadow-lg px-4 md:px-0 lg:w-11/12 ">


                            <div className="flex flex-col ">

                                <div className="flex flex-row justify-between items-center ">
                                    <div className="absolute top-12 lg:top-24 left-12 lg:left-24 w-32">
                                        <img
                                            className=" animate-pulse"
                                            src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                                            alt="logo" />
                                    </div>
                                </div>


                                <div>
                                    <div className="flex flex-col lg:flex-row py-4 gap-4 ">
                                        <div className="flex flex-col lg:w-7/12  xl:px-12 pt-16 text-center justify-between gap-4 lg:gap-0">

                                            <p className='text-4xl'>Welcome {sessionStorage.getItem("email") !== null && sessionStorage.getItem("email")}.</p>

                                            <div className=' lg:w-[50%] self-center rounded-2xl px-2 py-2'>
                                                <h4 className='text-xl pb-2'>Your Balance:</h4>
                                                <p className='text-3xl'>{balance}$</p>
                                            </div>

                                            <hr className="border-2 my-2" />

                                            <div className='lg:w-[65%] self-center'>
                                                <p className='text-xl pb-3'>Send Transaction:</p>
                                                <SendTransaction balance={balance} updateTransactions={updateTransactions} setIsError={setIsError} setIsValid={setIsValid} setMessage={setMessage} />
                                            </div>

                                        </div>

                                        <hr className="lg:hidden border-2 my-4" />

                                        <div className="lg:w-5/12">
                                            <div className="text-center text-2xl pb-3">Your Transactions:</div>
                                            <div className="border-[#b6b6b6] border-3 border-opacity-25 ">
                                                <Table updates={updates} setUpdates={setUpdates} />
                                            </div>

                                        </div>
                                    </div>
                                </div>

                            </div>

                        </div>



                        {/* Right Side */}
                        <div
                            className="rainbow-grad flex items-end rounded-b-lg lg:w-1/12 lg:rounded-e-lg lg:rounded-bl-none">
                            <Button type="button" classes="colorful-button !mb-0 " method={handleLogout} text="Logout" />
                        </div>
                    </div>
                </div>

            </section>

        </>
    );
}

