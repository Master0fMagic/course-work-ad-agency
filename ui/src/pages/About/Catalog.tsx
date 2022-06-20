import React, {useEffect, useState} from 'react';
import {
    Alert,
    Box, Button, Card, CardActions, CardContent, CardHeader,
    CircularProgress, createTheme, Drawer,
    Slider, Snackbar, ThemeProvider, Tooltip,
    Typography
} from "@mui/material";
import {Api, GetAgency, GetProducts} from "../../api/Api";
import {useDispatch, useSelector} from "react-redux";

import ModalServices from "./components/ModalServices";

const Catalog = () => {

    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false)
    const [agency, setAgency] = useState<GetAgency[]>(null);

    const [currentAgency, setCurrentAgency] = useState<GetAgency>();
    const [serviceModal, setServiceModal] = useState(false);

    const newTheme = createTheme({
        palette: {
            primary: {
                main: "#8989BB",
            },
            secondary: {
                main: "#9E768F"
            },
            background: {
                default: "#A5A4CB",
                paper: "#A5A4CB"
            },
            text: {
                primary: "#fff",
                secondary: "#fff",
                disabled: "gray"
            }
        }
    })

    const goToService = (id) => {
        setCurrentAgency(agency.filter(r=>r.id === id)[0]);
        setServiceModal(true);
    }

    useEffect(() => {
        const api = new Api();
        try {
            setLoading(true);
            const promises = [];

            const promise1 = new Promise((resolve, reject) => {
                api.getAgency().then(res => {
                    setAgency([...res.data.places]);
                    resolve(true);
                }).catch(err => {
                    reject(err);
                });
            })

            promises.push(promise1);

            Promise.all(promises).then(e => setLoading(false)).catch(e => setLoading(false));

        } catch (e) {
            console.log(e)
        }
    }, [])

    return (
        <Box>
            <ModalServices agency={currentAgency} setModal={setServiceModal} open={serviceModal}/>
            <ThemeProvider theme={newTheme}>
                {loading ? <CircularProgress/> :
                    <Box color={"#fff"} display={"flex"} alignItems={"center"} justifyContent={"center"}>
                        <Box width={"100%"}>
                            <Typography sx={{marginTop:"25px", textShadow:"1px 1px #0000003d"}} fontWeight={"bold"} textAlign={"center"} fontSize={"24px"}>
                                Список наших агенств
                            </Typography>
                            <Box display={"flex"} justifyContent={"center"} flexWrap={"wrap"}>
                                {agency && agency.map(c => (
                                    <Card sx={{width: "25%", margin: "1%"}}>
                                        <CardHeader
                                            title={c.name}
                                        />
                                        <CardContent>
                                            <Typography variant="body2" color="text.secondary">
                                                {c.address}
                                            </Typography>
                                        </CardContent>
                                        <CardActions disableSpacing sx={{justifyContent: "center"}}>
                                            <Button onClick={e=>goToService(c.id)} variant={"contained"}>Перейти до послуг</Button>
                                        </CardActions>
                                    </Card>
                                ))}
                            </Box>
                        </Box>
                    </Box>
                }
            </ThemeProvider>
        </Box>
    );
};

export default Catalog;