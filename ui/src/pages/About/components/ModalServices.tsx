import React, {useEffect, useState} from 'react';
import {
    Box,
    Button, Card, CardActions, CardContent, CardHeader, CircularProgress, createTheme, IconButton,
    Modal,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow, ThemeProvider, Tooltip, Typography
} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {SelectUserAuth, SelectUserItems} from "../../../redux/store/user/selector";
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import {setItems} from "../../../redux/store/user/slice";
import ModalCreateOrder from "./ModalCreateOrder";
import {Api, GetServices} from "../../../api/Api";

const ModalServises = ({agency, open, setModal}) => {

    const [modalOrder, setModalOrder] = useState(false);
    const [loading, setLoading] = useState(false);
    const [services, setServices] = useState<GetServices[]>([]);
    const [currentService, setCurrentService] = useState(-1);

    const newTheme = createTheme({
        palette: {
            primary: {
                main: "#8989BB"
            }
        }
    })

    const dispatch = useDispatch();

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

    const auth = useSelector(SelectUserAuth);

    const createOrder = (id) => {
        setModalOrder(true);
        setCurrentService(id);
    }

    const getInfo = () => {
        setLoading(true);
        const api = new Api();
        api.getDescAgency(agency.id).then(res => {
            setServices(res.data.data);
            setLoading(false);
        }).catch(err => {
            setLoading(false);
        })
    }

    useEffect(() => {
        if (agency)
            getInfo();
    }, [agency])

    return (
        <Modal
            open={open}
            onClose={e => setModal(false)}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
        >
            {loading ? <CircularProgress/> :
                <ThemeProvider theme={newTheme}>
                    <ModalCreateOrder price={services.filter(x=>x.id===currentService)[0]?.price} serviceId={currentService} agencyId={agency?.id} open={modalOrder} setModal={setModalOrder}/>
                    <Box sx={{
                        ...style,
                        minHeight: "600px",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "flex-start",
                        width: 800
                    }}>
                        <h2 id="parent-modal-title">Список послуг агенства - {agency?.name}</h2>
                        <Box display={"flex"} width={"90%"} justifyContent={"flex-start"} flexWrap={"wrap"}>
                            {services && services.map(c => (
                                <Card sx={{width: "35%", maxWidth: "35%", margin: "1%"}}>
                                    <CardHeader
                                        title={c.name}
                                    />
                                    <CardContent>
                                        <Typography variant="body2" color="text.secondary">
                                            {c.description}
                                            <br/>
                                            <br/>
                                            <Typography fontWeight={"bold"}>
                                                Вартість: {c.price}грн
                                            </Typography>
                                        </Typography>
                                    </CardContent>
                                    <CardActions disableSpacing sx={{justifyContent: "center"}}>
                                        <Tooltip title={auth ? "" : "Для цього ви повинні бути авторизовані"}>
                                            <span>
                                                <Button onClick={e=>createOrder(c.id)} disabled={!auth} variant={"contained"}>
                                                    Замовити послугу
                                                </Button>
                                            </span>
                                        </Tooltip>
                                    </CardActions>
                                </Card>
                            ))}
                        </Box>
                    </Box>
                </ThemeProvider>}
        </Modal>
    );
};

export default ModalServises;