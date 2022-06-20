import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import $api from "../../../http";
import {Button, Container, Typography} from "@mui/material";
import {toastr} from "react-redux-toastr";
import {useSelector} from "react-redux";
import EditProductForm from "../EditProductForm/EditProductForm";
import MyModal from "../../UI/Modal/MyModal";

const ProductDetails = () => {

    const [product, setProduct] = useState({});
    const [isLoading, setLoading] = useState(true);

    const params = useParams();

    const roles = useSelector(state => state.auth.user.roles);

    const [open, setOpen] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        $api.get("/products/" + params.id)
            .then((response) => {
                setProduct(response.data);
                setLoading(false);
            })
            .catch(reason => {
                toastr.error("Магазин квітів", "Виникли технічні проблеми");
            });
        ;
    }, []);

    const navigateToLogin = () => {
        navigate("/login");
        toastr.info("Магазин квітів", "Щоб переглядати список бажаного потрібно авторизуватись");
    }

    const addToBasket = (id) => {
        $api.post("/user/basket", id)
            .then(response => {
                toastr.success("Магазин квітів", "Товар успішно додано до кошика");
            })
            .catch(reason => {
                toastr.error("Магазин квітів", "Виникли технічні проблеми");
            });
    }

    const deleteBook = (id) => {
        $api.delete("/products/" + id)
            .then(response => {
                if (response.data === true) {
                    toastr.success("Магазин квітів", "Товар успішно видалено");
                    navigate("/products");
                }
            })
            .catch(reason => {
                if (reason.response.status === 400) {
                    toastr.error("Магазин квітів", reason.response.data.error);
                }
                else {
                    toastr.error("Магазин квітів", "Виникли технічні проблеми");
                }
            });
    }

    return (
        <Container maxWidth="xl" sx={{marginTop: "64px", paddingTop: "10px"}} style={{minHeight: "100vh"}}>
            {
                isLoading ?
                    <div>
                        Загрузка даних...
                    </div>
                    :
                    <div>
                        {
                            open &&
                            <MyModal open={open} setOpen={setOpen}
                                     children={<EditProductForm product={product} setOpen={setOpen}/>}/>
                        }
                        <Typography variant="h2" component="div">
                            {product.name}
                        </Typography>
                        <div style={{display: "flex"}}>
                            <div>
                                <img src={"http://localhost:8080/files/" + product.image} alt={product.name}
                                     style={{maxWidth: "600px", maxHeight: "1000px"}}/>
                            </div>
                            <div style={{padding: 20}}>
                                <Typography variant="h6" component="div">
                                    Ціна : {product.price} грн.
                                </Typography>
                                <Typography variant="h6" component="div">
                                    Кількість : {product.amount}шт.
                                </Typography>
                                <hr style={{borderColor: "orange"}}/>
                                <div style={{display: "flex", justifyContent: "flex-end", margin: 2}}>
                                    <Button variant="contained" color="success" onClick={() => addToBasket(product.id)}>
                                        Додати в кошик
                                    </Button>
                                </div>
                                {
                                    roles && roles.includes("ROLE_ADMIN") &&
                                    <div style={{display: "flex", justifyContent: "space-between", margin: 2}}>
                                        <Button variant="contained" color="warning" onClick={() => setOpen(true)}>
                                            Редагувати
                                        </Button>
                                        <Button variant="contained" color="error"
                                                onClick={() => deleteBook(product.id)}>
                                            Видалити
                                        </Button>
                                    </div>
                                }
                            </div>
                        </div>
                        <div>
                            <Typography variant="h4" component="div">
                                Опис
                                <Typography variant="h6" component="div">
                                    {product.description}
                                </Typography>
                            </Typography>
                            <Typography variant="h4" component="div">
                                Додатково
                                <Typography variant="h6" component="div">
                                    {product.additionally}
                                </Typography>
                            </Typography>
                        </div>
                    </div>
            }
        </Container>
    );
};

export default ProductDetails;