import {useSelector} from "react-redux";
import {NavLink, useNavigate} from "react-router-dom";
import {toastr} from "react-redux-toastr";
import $api from "../../../http";
import {Button, Card, CardActions, CardContent, CardMedia, Typography} from "@mui/material";

const Product = ({product, isBasket}) => {

    const roles = useSelector(state => state.auth.user.roles);

    const navigate = useNavigate();

    const navigateToLogin = (i) => {
        navigate("/login");
        toastr.info("Decor shop", "Щоб добавити в кошик потрібно авторизуватись");
    }

    const deleteWithBasket = (id) => {
        $api.post("/user/basket", id)
            .then(response => {
                toastr.success("Decor shop", "Товар успішно видалений з кошика");
            })
            .catch(reason => {
                toastr.error("Decor shop", "Виникли технічні проблеми");
            });
    }

    const addToBasket = (id) => {
        $api.post("/user/basket", id)
            .then(response => {
                toastr.success("Decor shop", "Товар успішно доданий до кошика");
            })
            .catch(reason => {
                toastr.error("Decor shop", "Виникли технічні проблеми");
            });
    }

    return (
        <Card sx={{
            width: "300px",
            margin: 1,
            marginLeft: "auto",
            marginRight: "auto",
        }}>
            <CardMedia
                component="img"
                image={"http://localhost:8080/files/" + product.image}
                alt="book"
                sx={{width: "300px", height: "370px"}}
            />
            <div>
                <CardContent sx={{height: 120}}>
                    <Typography gutterBottom variant="body1" component="div">
                        <NavLink to={`/products/${product.id}`}>{product.name}</NavLink>
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Кілкість - {product.amount}.шт
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Опис - {product.description}
                    </Typography>
                    <Typography variant="subtitle1" color="orange">
                        {product.price}.грн
                    </Typography>
                </CardContent>
                <CardActions style={{display: "flex", justifyContent: "flex-end"}}>
                    {
                        isBasket ?
                            <Button variant="contained" color="success" onClick={(e) => deleteWithBasket(product.id)}>
                                Видалити
                            </Button>
                            :
                            <Button variant="contained" color="success" onClick={(e) => {
                                (roles && roles.includes("ROLE_GUEST")) ?
                                    navigateToLogin(2)
                                    :
                                    addToBasket(product.id)
                            }}>
                                Купити
                            </Button>
                    }
                </CardActions>
            </div>
        </Card>
    );
};

export default Product;