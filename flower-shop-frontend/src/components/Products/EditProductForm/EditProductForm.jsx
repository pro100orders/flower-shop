import $api from "../../../http";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {Controller, useForm, useFormState} from "react-hook-form";
import {toastr} from "react-redux-toastr";
import {Autocomplete, Button, MenuItem, Select, TextField} from "@mui/material";
import {useNavigate} from "react-router-dom";

const EditProductForm = ({product, setOpen}) => {

    const {handleSubmit, control, setValue} = useForm({
        mode: 'onBlur'
    });
    const {errors} = useFormState({
        control
    });

    const navigate = useNavigate();

    useEffect(() => {
        setValue("id", product.id);
        setValue("name", product.name);
        setValue("price", product.price);
        setValue("amount", product.amount);
        setValue("description", product.description);
        setValue("additionally", product.additionally);
    }, []);

    const onSubmit = (product) => {
        console.log(product);
        $api.put("/products", product)
            .then(response => {
                if (file != null) {
                    const fd = new FormData();
                    fd.append("image", file, file.name);
                    $api.post("/products/image/" + response.data.id, fd)
                        .then(response1 => {
                            setOpen(false);
                            navigate("/products");
                        })
                        .catch(reason => {
                            console.log(reason.response.data.error);
                        })
                } else {
                    setOpen(false);
                    navigate("/products");
                }
            })
            .catch(reason => {
                toastr.error("Магазин квітів", "Виникли технічні проблеми");
            });
    };

    const [file, setFile] = useState(null);

    const fileSelectorHandler = (e) => {
        setFile(e.target.files[0]);
    }

    return (
        <div className='add-book-form' style={{width: "600px"}}>
            <form className="add-book-form__form" onSubmit={handleSubmit(onSubmit)}
                  style={{display: "flex", flexWrap: "wrap"}}>
                <Controller
                    control={control}
                    name="name"
                    render={({field}) => (
                        <TextField
                            label="Назва"
                            size="small"
                            margin="normal"
                            className="add-book-form__input"
                            fullWidth={true}
                            value={field.value}
                            variant={"filled"}
                            onChange={(e) => field.onChange(e)}
                            error={!!errors.name?.message}
                            helperText={errors.name?.message}
                        />
                    )}
                />
                <div>
                    <p>Фото:</p>
                    <input variant={"filled"} type={"file"}
                           onChange={fileSelectorHandler}/>
                </div>
                <Controller
                    control={control}
                    name="price"
                    render={({field}) => (
                        <TextField
                            label="Ціна"
                            type="number"
                            size="small"
                            margin="normal"
                            className="add-book-form__input"
                            fullWidth={true}
                            value={field.value}
                            variant={"filled"}
                            onChange={(e) => field.onChange(e)}
                            error={!!errors.price?.message}
                            helperText={errors.price?.message}
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="amount"
                    render={({field}) => (
                        <TextField
                            label="Кількість"
                            type="number"
                            size="small"
                            margin="normal"
                            className="add-book-form__input"
                            fullWidth={true}
                            value={field.value}
                            variant={"filled"}
                            onChange={(e) => field.onChange(e)}
                            error={!!errors.amount?.message}
                            helperText={errors.amount?.message}
                        />
                    )}
                />

                <Controller
                    control={control}
                    name="description"
                    render={({field}) => (
                        <TextField
                            label="Опис"
                            multiple
                            size="small"
                            margin="normal"
                            className="add-book-form__input"
                            fullWidth={true}
                            value={field.value}
                            variant={"filled"}
                            onChange={(e) => field.onChange(e)}
                            error={!!errors.description?.message}
                            helperText={errors.description?.message}
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="additionally"
                    render={({field}) => (
                        <TextField
                            label="Додатково"
                            multiple
                            size="small"
                            margin="normal"
                            className="add-book-form__input"
                            fullWidth={true}
                            value={field.value}
                            variant={"filled"}
                            onChange={(e) => field.onChange(e)}
                            error={!!errors.additionally?.message}
                            helperText={errors.additionally?.message}
                        />
                    )}
                />
                <Button
                    type="submit"
                    variant="contained"
                    fullWidth={true}
                    disableElevation={true}
                    sx={{
                        marginTop: 2
                    }}
                >
                    Редагувати товар
                </Button>
            </form>
        </div>
    );
};

export default EditProductForm;