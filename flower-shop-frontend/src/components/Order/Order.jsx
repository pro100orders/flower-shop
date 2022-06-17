import React from 'react';
import {Typography} from "@mui/material";

const Order = ({order}) => {
    return (
        <div style={{
            border: "1px solid green",
            borderRadius: "5px",
            margin: 2,
            padding: 10
        }}>
            <div style={{
                display: "flex",
                justifyContent: "space-between",
            }}>
                <div style={{width: "10%"}}>
                    <Typography variant="h5" component="div">
                        ID - {order.id}
                    </Typography>
                    <Typography variant="h5" component="div">
                        {order.status}
                    </Typography>
                </div>
                <div style={{width: "60%"}}>
                    {
                        order.products &&
                        <div>
                            <Typography variant="h5" component="div">
                                Кількість товарів - {order.products.length}
                            </Typography>
                            <Typography variant="h5" component="div">
                                Товари:
                                <Typography variant="h6" component="div"
                                            style={{display: "flex", flexWrap: "wrap", margin: 0}}>
                                    {
                                        order.products.map(product => (
                                            <pre>{product.name} </pre>
                                        ))
                                    }
                                </Typography>
                            </Typography>
                        </div>
                    }
                </div>
                <div style={{width: "20%"}}>
                    <Typography variant="h5" component="div">
                        Загальна ціна - {order.totalPrice} грн.
                    </Typography>
                </div>
            </div>
            <div style={{display: "flex", justifyContent: "flex-end"}}>
                <Typography variant="h6" component="div">
                    {
                        order.createdAt[2] + "." + order.createdAt[1] + "." + order.createdAt[0] + " " +
                        order.createdAt[3] + ":" + order.createdAt[4]
                    }
                </Typography>
            </div>
        </div>
    );
};

export default Order;