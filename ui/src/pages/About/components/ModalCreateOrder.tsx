import React, {useEffect, useState} from 'react';
import {Api, GetDeliviries, PostItem, PostOrder} from "../../../api/Api";
import {
    Alert, AlertProps,
    Box,
    Button, CircularProgress, FormControl, Grid, IconButton, InputLabel, MenuItem,
    Modal,
    Paper, Select, Step, StepButton, Stepper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow, TextField,
    Typography
} from "@mui/material";
import moment from "moment";
import {LocalizationProvider, MobileDatePicker} from '@mui/x-date-pickers';
import {AdapterMoment} from "@mui/x-date-pickers/AdapterMoment";
import CloseIcon from "@mui/icons-material/Close";
import {useDispatch, useSelector} from "react-redux";
import {SelectUserItems} from "../../../redux/store/user/selector";
import {setItems} from "../../../redux/store/user/slice";

const ModalCreateOrder = ({agencyId, serviceId, price, open, setModal}) => {
    const [messageHandler, setMessageHandler] = useState({type: "" as AlertProps["severity"], message: ""});
    const [count, setCount] = useState(1);

    useEffect(() => {
        setMessageHandler({...messageHandler, message: ""});
    }, [open])

    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        pt: 2,
        px: 4,
        pb: 3,
        borderRadius: "10px"
    };

    const [loading, setLoading] = useState(false);
    const items = useSelector(SelectUserItems);
    const dispatch = useDispatch();

    const createOrder = () => {
        setLoading(true);
        const api = new Api();
        const data = {agency_id: agencyId, items: [{service_id: serviceId, count: count}]};

        api.createOrder(data).then(res => {
            setMessageHandler({type: "success", message: "Заявку створено!"});
            setLoading(false);
            setTimeout(() => {
                setModal(false);
            }, 1000);
        }).catch(err => {
            console.log(err)
            setLoading(false)
        });
    }

    return (
        <Modal
            open={open}
            onClose={e => setModal(false)}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
        >
            <Box sx={{
                ...style,
                minHeight: "600px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "flex-start",
                width: 800
            }}>
                <Grid sx={{marginBottom: "30px"}} item xs={12}>
                    {messageHandler.message.length > 0 && <Alert
                        action={
                            <IconButton
                                aria-label="close"
                                color="inherit"
                                size="small"
                                onClick={() => {
                                    setMessageHandler({...messageHandler, message: ""})
                                }}
                            >
                                <CloseIcon fontSize="inherit"/>
                            </IconButton>
                        }
                        severity={messageHandler.type}>{messageHandler.message}
                    </Alert>}
                </Grid>
                <h2 id="parent-modal-title">Створення замовлення</h2>
                <Box>
                    <CircularProgress sx={{display: !loading && "none"}}/>
                    <FormControl sx={{display: loading && "none", margin: "40px 0px"}} fullWidth>
                        <TextField label={"Кількість"} value={count} type={"number"} onChange={e => setCount(parseInt(`${parseInt(e.target.value) > 1 ? e.target.value : 1}`))}
                                   placeholder={"Введіть кількість потрібної послуги"}/>
                    </FormControl>
                    <Typography textAlign={"center"} sx={{marginBottom:"16px"}}>Вартість: {price * count} грн</Typography>
                    <Box display={"flex"} justifyContent={"center"}>
                        <Button variant={"contained"} onClick={createOrder}>Створити замовлення</Button>
                    </Box>
                </Box>
            </Box>
        </Modal>
    );
};

export default ModalCreateOrder;