import React from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";

export default function AddCar(props) {
    const [open, setOpen] = React.useState(false);
    const [car, setCar] = React.useState({brand: "", model: "", color: "", fuel: "", year: "", price: ""});


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleInputChange = (event) => {
        setCar({...car, [event.target.name]: event.target.value});
    };


    const addCar = () => {
        props.addCar(car);
        handleClose();
    };

    return <div>
        <Button style={{margin: 10}} variant="outlined" onClick={handleClickOpen}>Add Car</Button>
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Add Car</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    name="brand"
                    value={car.brand}
                    onChange={(e) => handleInputChange(e)}
                    label="Brand"
                    fullWidth
                />
                <TextField
                    margin="dense"
                    name="model"
                    value={car.model}
                    onChange={(e) => handleInputChange(e)}
                    label="Model"
                    fullWidth
                />
                <TextField
                    margin="dense"
                    name="color"
                    value={car.color}
                    onChange={(e) => handleInputChange(e)}
                    label="Color"
                    fullWidth
                />
                <TextField
                    margin="dense"
                    name="fuel"
                    value={car.fuel}
                    onChange={(e) => handleInputChange(e)}
                    label="Fuel Type"
                    fullWidth
                />
                <TextField
                    margin="dense"
                    name="modelYear"
                    value={car.modelYear}
                    onChange={(e) => handleInputChange(e)}
                    label="Year"
                    fullWidth
                />
                <TextField
                    margin="dense"
                    name="price"
                    value={car.price}
                    onChange={(e) => handleInputChange(e)}
                    label="Price"
                    fullWidth
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={addCar}>Save</Button>
                <Button color="error" onClick={handleClose}>Cancel</Button>
            </DialogActions>
        </Dialog>
    </div>;
}