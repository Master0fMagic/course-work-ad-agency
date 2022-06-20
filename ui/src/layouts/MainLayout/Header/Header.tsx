import React, {useEffect, useState} from 'react';
import {AppBar, Badge, Box, IconButton, Menu, MenuItem} from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import cl from './Header.module.css'
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../../../redux/store/user/slice";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import {Typography} from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import {useNavigate} from "react-router";
import {PATH} from "../../../routes";
import {SelectUserAuth, SelectUserItems} from "../../../redux/store/user/selector";

const Header = () => {

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const logoutAct = () => {
        dispatch(logout());
    }

    const auth = useSelector(SelectUserAuth);

    return (
        <Box width={"100%"}>
            <AppBar position={"sticky"} sx={{padding:"10px", backgroundColor: "#d5adc8", backgroundImage:"linear-gradient(315deg, #d5adc8 0%, #ff8489 74%)"}}>
                <Box display={"flex"} justifyContent={"space-around"} alignItems={"center"}>
                    <Typography
                        onClick={e => navigate(PATH.PRODUCTS)}
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{display: "block", "&:hover": {cursor: "pointer"}}}
                    >
                        Каталог
                    </Typography>
                    <Typography
                        onClick={e => navigate(PATH.ORDERS)}
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{display: auth ? "block" : "none", "&:hover": {cursor: "pointer"}}}
                    >
                        Мої замовлення
                    </Typography>
                    <Typography
                        onClick={logoutAct}
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{display: auth ? "block" : "none", "&:hover": {cursor: "pointer"}}}
                    >
                        Вийти
                    </Typography>
                    <Typography
                        onClick={e => navigate(PATH.AUTHORIZATION)}
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{display: auth ? "none" : "block", "&:hover": {cursor: "pointer"}}}
                    >
                        Увійти
                    </Typography>
                </Box>
            </AppBar>
        </Box>
    );
};

export default Header;