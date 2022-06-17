import React, {useEffect, useState} from 'react';
import $api from "../../http";
import {toastr} from "react-redux-toastr";
import {Container, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import Order from "../../components/Order/Order";

const Profile = ({setModalProfile, setModalProfileEdit}) => {

    const [user, setUser] = useState({});

    const navigate = useNavigate();

    useEffect(() => {
        $api.get('/user/profile')
            .then(response => {
                setUser(response.data);
            })
            .catch(reason => {
                toastr.error("Product shop", "Виникли технічні проблеми");
            });
    }, []);

    const [orders, setOrders] = useState([]);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        $api.get("/user/orders")
            .then(value => {
                setOrders(value.data);
                setLoading(false);
            })
            .catch(reason => {
                toastr.error("Product shop", "Виникли технічні проблеми");
            });
    }, []);

    return (
        <Container maxWidth="xl" sx={{marginTop: "10px", paddingTop: "10px"}} style={{minHeight: "100vh"}}>
            <Typography variant="h3" component="div" style={{marginBottom: 10}}>
                Мій профіль
            </Typography>
            <div style={{display: "flex"}}>
                <div>
                    {
                        user.surname &&
                        <Typography variant="h5" component="div">
                            Прізвище : {user.surname}
                        </Typography>
                    }
                    {
                        user.name &&
                        <Typography variant="h5" component="div">
                            Ім'я : {user.name}
                        </Typography>
                    }
                    <Typography variant="h5" component="div">
                        Пошта : {user.email}
                    </Typography>
                    {
                        user.phone &&
                        <Typography variant="h5" component="div">
                            Номер телефону : {user.phone}
                        </Typography>
                    }
                    {
                        user.address &&
                        <Typography variant="h5" component="div">
                            Адресса : {user.address}
                        </Typography>
                    }
                </div>
            </div>
            <hr style={{borderColor: "green"}}/>
            <div>
                <Typography variant="h4" component="div" style={{display: "flex", justifyContent: "center"}}>
                    Замовлення
                </Typography>
                <div>
                    {
                        isLoading ?
                            <div>Загрузка даних...</div>
                            :
                            <div>
                                {
                                    orders && orders.length === 0 ?
                                        <Typography variant="h5" component="div">
                                            Замовлень немає
                                        </Typography>
                                        :
                                        <div>
                                            {
                                                orders.map(order => (
                                                    <Order order={order}/>
                                                ))
                                            }
                                        </div>
                                }
                            </div>
                    }
                </div>
            </div>
        </Container>
    );
};

export default Profile;