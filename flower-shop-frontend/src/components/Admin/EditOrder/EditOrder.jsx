import React, {useEffect, useState} from 'react';
import {Button, FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import $api from "../../../http";
import {toastr} from "react-redux-toastr";
import {useNavigate} from "react-router-dom";

const EditOrder = ({order, setOpen, orders, setOrders}) => {

    const [status, setStatus] = useState(order.status);
    const [statuses, setStatuses] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        $api.get("/admin/order-statuses")
            .then((response) => {
                setStatuses(response.data);
            })
            .catch(reason => {
                toastr.error("Магазин квітів", "Виникли технічні проблеми");
            });
    }, []);

    const edit = () => {
        $api.put("/admin/orders", {id: order.id, status: status})
            .then((response) => {
                setOpen(false);
                let index = orders.findIndex((o => o.id === order.id));
                orders[index].status = status;
                setOrders(orders);
                toastr.success("Магазин квітів", "Замовлення успішно обновлено");
            })
            .catch(reason => {
                toastr.error("Магазин квітів", "Виникли технічні проблеми");
            });
    }

    return (
        <div>
            <FormControl sx={{width: "300px", margin: "auto", display: "flex", justifyContent: "center"}}>
                <InputLabel>Статус замовлення</InputLabel>
                <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={status}
                    label="Size"
                    fullWidth={true}
                    variant={"filled"}
                    onChange={e => {
                        setStatus(e.target.value);
                    }}
                >
                    {
                        statuses &&
                        statuses.map(status => (
                            <MenuItem value={status}>{status}</MenuItem>
                        ))
                    }
                </Select>
            </FormControl>
            <Button
                onClick={() => edit()}
                variant="contained"
                fullWidth={true}
                disableElevation={true}
                sx={{
                    marginTop: 2
                }}
            >
                Редагувати замовлення
            </Button>
        </div>
    );
};

export default EditOrder;