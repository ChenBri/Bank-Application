import { useRef } from 'react';

import api from '../../axiosUtils';
import {  TextField } from '@mui/material';
import Button from './Button';
import { AxiosResponse } from 'axios';

interface Transaction {
    reciever: string;
    amount: number;
}

interface SendProps {
    updateTransactions: Function;
    balance: number;
    setIsError: Function;
    setIsValid: Function;
    setMessage: Function;
}

export default function App({ updateTransactions, balance, setIsError, setIsValid, setMessage }: SendProps) {

    const recieverRef = useRef<HTMLInputElement>(null);
    const amountRef = useRef<HTMLInputElement>(null);

    async function handleSend() {

        if (!recieverRef.current || !amountRef.current) return;

        const transaction: Transaction = {
            reciever: recieverRef.current.value,
            amount: Number(amountRef.current.value),
        }

        await api.post("/transactions", transaction)
            .then(function (response: any) {
                setMessage(response.data.success);
                setIsValid(true);
            })
            .catch(function (error) {
                setMessage(error.response.data.error);
                setIsError(true);
            });

        await updateTransactions();

    }




    return (
        <div className="flex flex-col gap-2 mx-auto">
            <TextField id="email" label="Reciever" variant="outlined" inputRef={recieverRef} />
            <TextField id="password" label="Amount" variant="outlined" inputRef={amountRef} />
            <Button type="button" classes="colorful-button" method={handleSend} text="Send" />
        </div>
    );
}

