import React from 'react';
import {
    AppBar,
    Avatar,
    Box,
    Button,
    Container,
    IconButton,
    Menu,
    MenuItem,
    Toolbar,
    Tooltip,
    Typography
} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {Link, useNavigate} from "react-router-dom";

const Header = () => {

    const roles = useSelector(state => state.auth.user.roles);

    const [navbarMenu, setNavbarMenu] = React.useState(null);
    const [userMenu, setUserMenu] = React.useState(null);

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const logout = () => {
        if (localStorage.getItem("token"))
            localStorage.removeItem("token");
        dispatch({type: "SET_AUTH", payload: {token: '', user: {roles: ['ROLE_GUEST']}}});
    }

    return (
        <AppBar position="static" style={{background: "white"}}>
            <Container maxWidth="xl">
                <div style={{display: "flex", justifyContent: "space-between", color: "black"}}>
                    <div style={{display: "flex"}}>
                        <h4 style={{margin: "0 0 0 20px"}}>
                            Про компанію
                        </h4>
                        <h4 style={{margin: "0 0 0 10px"}}>
                            Оплата і доставка
                        </h4>
                        <h4 style={{margin: "0 0 0 10px"}}>
                            Контакти
                        </h4>
                    </div>
                    <div style={{display: "flex"}}>
                        <h4 style={{margin: "0 0 0 10px"}}>
                            (099)-363-74-45
                        </h4>
                        <h4 style={{margin: "0 0 0 10px"}}>
                            <a href="https://www.instagram.com/waicerst/"
                               style={{textDecoration: "none", marginLeft: 10}}>
                                Instagram
                            </a>
                        </h4>
                        <h4 style={{margin: "0 0 0 10px"}}>
                            <a href=""
                               style={{textDecoration: "none", marginLeft: 10}}>
                                Facebook
                            </a>
                        </h4>
                        <h4 style={{margin: "0 20px 0 10px"}}>
                            <a href="https://t.me/waiver99" style={{textDecoration: "none", marginLeft: 10}}>
                                Telegram
                            </a>
                        </h4>
                    </div>
                </div>
                <hr style={{borderColor: "orange"}}/>
                <Toolbar disableGutters style={{display: "flex", justifyContent: "space-between", color: 'black',}}>
                    <div style={{display: "flex"}}>
                        <Typography
                            variant="h4"
                            component="a"
                            href="/"
                            sx={{
                                mr: 2,
                                fontFamily: 'monospace',
                                color: "orange",
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                textDecoration: 'none',
                            }}
                        >
                            Shop
                        </Typography>
                        <Typography variant="h6" component="div" style={{padding: 5}}>
                            <Link to={"/products"} style={{textDecoration: "none"}}>
                                Товари
                            </Link>
                        </Typography>
                    </div>
                    <div>
                        {
                            roles && roles.includes("ROLE_ADMIN") &&
                            <Typography variant="h6" component="div">
                                <Link to={"/products"} style={{textDecoration: "none"}}>
                                    Адмін
                                </Link>
                            </Typography>
                        }
                    </div>
                    {
                        roles && roles.includes("ROLE_GUEST") ?
                            <Button
                                onClick={e => navigate("/login")}
                                sx={{
                                    my: 2,
                                    color: 'black',
                                    display: 'block',
                                    border: "1px solid black",
                                    borderRadius: "5px"
                                }}
                            >
                                Авторизація
                            </Button>
                            :
                            <Box sx={{flexGrow: 0}}>
                                <Tooltip title="Open settings">
                                    <IconButton onClick={e => setUserMenu(e.currentTarget)} sx={{p: 0}}>
                                        <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg"/>
                                    </IconButton>
                                </Tooltip>
                                <Menu
                                    sx={{mt: '45px'}}
                                    id="menu-appbar"
                                    anchorEl={userMenu}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={Boolean(userMenu)}
                                    onClose={e => setUserMenu(null)}
                                >
                                    <MenuItem onClick={e => {
                                        setUserMenu(null);
                                        navigate("/profile");
                                    }}>
                                        <Typography textAlign="center">
                                            Профіль
                                        </Typography>
                                    </MenuItem>
                                    <MenuItem onClick={e => {
                                        setUserMenu(null);
                                        navigate("/basket");
                                    }}>
                                        <Typography textAlign="center">
                                            Кошик
                                        </Typography>
                                    </MenuItem>
                                    <MenuItem onClick={e => {
                                        setUserMenu(null);
                                        navigate("/orders");
                                    }}>
                                        <Typography textAlign="center">
                                            Замовлення
                                        </Typography>
                                    </MenuItem>
                                    <MenuItem onClick={e => {
                                        setUserMenu(null);
                                        logout()
                                    }}>
                                        <Typography textAlign="center" style={{color: "red"}}>
                                            Вийти
                                        </Typography>
                                    </MenuItem>
                                </Menu>
                            </Box>
                    }
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Header;