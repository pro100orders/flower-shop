import React, {useEffect, useState} from 'react';
import {Typography} from "@mui/material";
import Order from "../../Order/Order";
import {toastr} from "react-redux-toastr";
import $api from "../../../http";

const Orders = () => {

    const [orders, setOrders] = useState([]);
    const [isLoading, setLoading] = useState(true);

    const [edit, setEdit] = useState(false);

    useEffect(() => {
        setLoading(true);
        $api.get("/admin/orders")
            .then(response => {
                setOrders(response.data);
                setLoading(false);
            })
            .catch(reason => {
                toastr.warning("Магазин квітів", reason.responce.data);
            });
    }, [edit]);

    return (
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
                                                <Order order={order} orders={orders} setOrders={setOrders}/>
                                            ))
                                        }
                                    </div>
                            }
                        </div>
                }
            </div>
        </div>
    );
};

export default Orders;