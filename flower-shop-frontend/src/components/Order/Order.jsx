import React, {useState} from 'react';
import {Button, Typography} from "@mui/material";
import MyModal from "../UI/Modal/MyModal";
import EditOrder from "../Admin/EditOrder/EditOrder";

const Order = ({order, orders, setOrders}) => {

    const [open, setOpen] = useState(false);

    return (
        <div style={{
            border: "1px solid green",
            borderRadius: "5px",
            margin: 2,
            padding: 10
        }}>
            {
                open &&
                <MyModal open={open} setOpen={setOpen}
                         children={<EditOrder order={order} setOpen={setOpen} orders={orders} setOrders={setOrders}/>}/>
            }
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
                            {
                                orders &&
                                <div>
                                    <Typography variant="h5" component="div">
                                        Замовник - {order.user.surname + " " + order.user.name}
                                        <Typography variant="h5" component="div">
                                            {order.user.phone}
                                        </Typography>
                                        <Typography variant="h5" component="div">
                                            {order.user.email}
                                        </Typography>
                                    </Typography>
                                    <hr/>
                                </div>
                            }
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
            {
                orders &&
                <div style={{display: "flex", justifyContent: "flex-end"}}>
                    <Button variant="contained" color="warning" onClick={() => setOpen(true)}>
                        Редагувати
                    </Button>
                </div>
            }
        </div>
    );
};

export default Order;