import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import $api from "../../http";
import {toastr} from "react-redux-toastr";
import {Button, Container, FormControl, InputLabel, MenuItem, Pagination, Select} from "@mui/material";
import MyModal from "../../components/UI/Modal/MyModal";
import AddProductForm from "../../components/Products/AddProductForm/AddProductForm";
import ProductsList from "../../components/Products/ProductsList/ProductsList";

const Products = () => {

    const roles = useSelector(state => state.auth.user.roles);

    const [products, setProducts] = useState([]);
    const [isLoading, setLoading] = useState(true);

    const [open, setOpen] = useState(false);

    const [allPage, setAllPage] = useState(1);
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(10);

    useEffect(() => {
        setLoading(true);
        $api.get("/products")
            .then(response => {
                setProducts(response.data);
                setLoading(false);
            })
            .catch(reason => {
                toastr.error("Магазин квітів", "Виникли технічні проблеми");
            });
    }, [])

    useEffect(() => {
        $api.get("/products/count")
            .then(response => {
                setAllPage(response.data.count);
            })
            .catch(reason => {
                toastr.error("Магазин квітів", "Виникли технічні проблеми");
            });
    }, [products])

   return (
        <Container maxWidth="xl" sx={{marginTop: "10px", paddingTop: "10px"}} style={{minHeight: "100vh"}}>
            <div style={{display: "flex", justifyContent: "space-between"}}>
                <div>
                    {
                        roles && roles.includes("ROLE_ADMIN") &&
                        <div>
                            <Button onClick={e => setOpen(true)} sx={{border: "1px solid orange", borderRadius: "2px"}}>
                                Додати новий товар
                            </Button>
                            <MyModal open={open} setOpen={setOpen}
                                     children={<AddProductForm setProducts={setProducts} setOpen={setOpen}/>}/>
                        </div>
                    }
                </div>
                <FormControl sx={{m: 1, minWidth: 120}}>
                    <InputLabel>Кількість</InputLabel>
                    <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        value={size}
                        label="Size"
                        variant={"filled"}
                        onChange={e => {
                            setSize(e.target.value);
                        }}
                    >
                        <MenuItem value={5}>5</MenuItem>
                        <MenuItem value={10}>10</MenuItem>
                        <MenuItem value={20}>20</MenuItem>
                        <MenuItem value={30}>30</MenuItem>
                        <MenuItem value={40}>40</MenuItem>
                        <MenuItem value={50}>50</MenuItem>
                        <MenuItem value={100}>100</MenuItem>
                    </Select>
                </FormControl>
            </div>
            <div>
                <div>
                    <ProductsList products={products.slice(((page - 1) * size), (page * size))} isLoading={isLoading}/>
                </div>
                <div style={{display: "flex", justifyContent: "center"}}>
                    <Pagination count={Math.ceil(allPage / size)} page={page}
                                onChange={(e, value) => setPage(value)}
                                showFirstButton showLastButton shape="rounded"/>
                </div>
            </div>
        </Container>
    );
};

export default Products;