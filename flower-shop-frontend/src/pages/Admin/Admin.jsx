import React from 'react';
import {Container} from "@mui/material";
import Orders from "../../components/Admin/Orders/Orders";

const Admin = () => {
    return (
        <Container maxWidth="xl" sx={{marginTop: "10px", paddingTop: "10px"}} style={{minHeight: "100vh"}}>
            <Orders/>
        </Container>
    );
};

export default Admin;