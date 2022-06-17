import React, {useEffect, useState} from 'react';
import $api from "../../http";
import {toastr} from "react-redux-toastr";
import {Button, Container, Typography} from "@mui/material";
import Order from "../../components/Order/Order";

const Orders = () => {

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
        <Container maxWidth="xl" sx={{marginTop: "64px", paddingTop: "10px"}} style={{minHeight: "100vh"}}>
            <Typography variant="h2" component="div">
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
        </Container>
    );
};

export default Orders;