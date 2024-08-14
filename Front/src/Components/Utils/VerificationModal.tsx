import { useRef, useState } from 'react';
import api from '../../axiosUtils';

import { Box, Modal, TextField, Typography } from '@mui/material';
import Button from './Button';

export default function VerificationModal({ isActive, setIsActive }: { isActive: any, setIsActive: any }) {

    const verificationRef = useRef<any>("");
    const [isVerified, setIsVerified] = useState<boolean>(false);

    const style = {
        position: 'absolute' as 'absolute',
        top: '30%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '4px solid #dc4c64',
        boxShadow: 24,
        borderRadius: 4,
        p: 4,
    };

    async function handleSubmit() {

        let verifyObject = {
            email: sessionStorage.getItem('email'),
            code: verificationRef.current.value
        }

        await api.put("/verify", verifyObject)
            .then(function () {
                setIsVerified(true);
            })
            .catch(function (error) {
                alert(error.response.data.error);
            });
    }


    function handleClose() {
        setIsActive(false);
    }

    return (
        <>
            {
                <Modal
                    open={isActive}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    className="text-center"
                >
                    <Box sx={style} className="jump-in">
                        <Typography id="modal-modal-title" variant="h6" component="h2" className="pb-2">
                            Email Verification:
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }} className="pb-2">
                            {!isVerified ? "Please verify your email." : "Your email is verified!"}
                        </Typography>

                        {!isVerified && <TextField id="text" type="text" label="Code" variant="outlined" inputRef={verificationRef} />}

                        <div className="flex justify-center">

                        {!isVerified ?
                                <Button type="button" classes="colorful-button mt-4" method={handleSubmit} text="Submit" /> :
                                <Button type="button" classes="colorful-button mt-4" method={handleClose} text="Continue" />}
                        </div>

                        
                        
                    </Box>
                </Modal>
            }
        </>
    )
}