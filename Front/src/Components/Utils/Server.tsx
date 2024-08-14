import { useEffect, useState } from 'react';
import api from '../../axiosUtils';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Button, Modal, Typography } from '@mui/material';

export default function Server() {

    const navigate = useNavigate();
    const location = useLocation();
    const [isOnline, setIsOnline] = useState(true);

    useEffect(() => {
        checkServerStatus();
    }, [location]);

    async function checkServerStatus() {
        await api.get("/status")
            .then(function () {
                console.log("Server is running.");
                setIsOnline(true);
            })
            .catch(function () {
                console.log("Server is offline.");
                setIsOnline(false);
            });
    }

    const style = {
        position: 'absolute' as 'absolute',
        top: '30%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    function handleClose() {
        navigate(0);
    }

    return (
        <>
            {
                <Modal
                    open={!isOnline}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    className="text-center"
                >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Our servers are offline!
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            Please try again in a few minutes.
                        </Typography>

                        <div className="flex justify-center">
                            <Button variant="contained" onClick={handleClose} className="mt-4">Refresh</Button>
                        </div>
                    </Box>
                </Modal>
            }
        </>
    )
}