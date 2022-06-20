import {
    Box, Button, CircularProgress, IconButton, Paper, Table, TableBody, TableCell,
    TableContainer, TableHead, TableRow
} from '@mui/material';
import React, {useEffect, useState} from 'react';
import moment from "moment";
import {Api, GetHistory} from "../../api/Api";
import {InfoOutlined} from "@mui/icons-material";
import ModalOrderInfo, {OrderTypeModal} from "../About/components/ModalOrderInfo";

const Orders = () => {

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);

    const [orderModal, setOrderModal] = useState(false);
    const [order, setOrder] = useState<OrderTypeModal>(null);

    useEffect(()=>{
        setLoading(true);
        const api = new Api();
        api.getHistory().then(res=>{
            setOrders(res.data.history);
            setLoading(false);
        }).catch(err=>{
            setLoading(false);
            console.log(err)
        })
    }, [])

    const getOrderInfo = (id) => {
        const api = new Api();
        api.getDescOrder(id).then(res => {
            setOrder({number: id, items: res.data.details});
            setOrderModal(true);
        })
    }

    return (
        <Box display={"flex"} justifyContent={"center"} sx={{marginTop:"30px"}}>
            <ModalOrderInfo setModal={setOrderModal} order={order} open={orderModal}/>
            {loading ? <CircularProgress/> :
                <TableContainer sx={{width:"50%", maxHeight:"700px"}} component={Paper}>
                    <Table stickyHeader size={"medium"}>
                        <TableHead>
                            <TableRow>
                                <TableCell align={"center"}>№</TableCell>
                                <TableCell align={"center"}>Дата</TableCell>
                                <TableCell align={"center"}>Агенство</TableCell>
                                <TableCell align={"center"}>Сума</TableCell>
                                <TableCell align={"center"}>Детальніше</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {orders && orders.length > 0 ? orders.map(h => (
                                    <TableRow key={h.id}>
                                        <TableCell align={"center"}>{h.id}</TableCell>
                                        <TableCell align={"center"}>{moment(h.date).format("MM-DD-YYYY HH:mm")}</TableCell>
                                        <TableCell align={"center"}>{h.agency}</TableCell>
                                        <TableCell align={"center"}>{h.sum} грн</TableCell>
                                        <TableCell align={"center"}>
                                            <IconButton onClick={e=>getOrderInfo(h.id)}>
                                                <InfoOutlined/>
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>)) :
                                <TableRow><TableCell align={"center"} colSpan={4}>Замовлень не знайдено!</TableCell></TableRow>}
                        </TableBody>
                    </Table>
                </TableContainer>
            }
        </Box>
    );
};

export default Orders;