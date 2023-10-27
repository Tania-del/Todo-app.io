import {
    Dialog, DialogTitle,
    DialogActions, DialogContent,
    DialogContentText, Button,
} from '@mui/material'
import { useState } from 'react'


export const useConfirm  = (title: string, message: string): [() => JSX.Element, () => Promise<unknown>] => {
    const [promise, setPromise] = useState<null | { resolve: (value: unknown) => void}>(null)


    const confirm = () => new Promise((resolve) => {
        setPromise({ resolve })
    })

    const handleClose = () => {
        setPromise(null)
    }

    const handleConfirm = () => {
        promise?.resolve(true);
        handleClose()
    }

    const handleCancel = () => {
        promise?.resolve(false);
        handleClose()
    }
 
    const ConfirmationDialog = () => (
        <Dialog open={promise !== null} fullWidth>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <DialogContentText>{message}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleConfirm}>Yes</Button>
                <Button onClick={handleCancel}>Cancel</Button>
            </DialogActions>
        </Dialog>
    );
    return [ConfirmationDialog, confirm]
}