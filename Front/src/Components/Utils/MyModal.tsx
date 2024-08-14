
import { Box, Modal, Typography } from '@mui/material';
import Button from './Button';

interface ModalProps {
    isVisible: boolean;
    setIsVisible: Function;
    header: string;
    message: string;
    method?: any;
    button: string;
}

export default function MyModal({ isVisible, setIsVisible, header, message, method, button }: ModalProps) {

    const style = {
        position: 'absolute' as 'absolute',
        top: '30%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '4px solid #dc4c64',
        boxShadow: 24,
        borderRadius: 4,
        p: 4,
    };

    function handleClose() {
        setIsVisible(false);
    }

    return (
        <>

            {
                <Modal
                    open={isVisible}
                    onClose={handleClose}
                    className="text-center"
                >
              
                        <Box sx={style} className=" jump-in left-[10%] sm:left-[20%] md:left-[30%] lg:left-[40%]">
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                {header}
                            </Typography>
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                {message}
                            </Typography>

                            <div className="flex justify-center">
                                <Button type="button" classes="empty-button mt-4" method={method !== undefined ? method : handleClose} text={button} />
                            </div>
                        </Box>
                        
                </Modal>
            }
        </>
    )
}