import React, {useEffect, useState} from "react";
import {AgGridReact} from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import {Button, Snackbar} from "@mui/material";
import AddCar from "./AddCar.jsx";
import EditCar from "./EditCar.jsx";

export default function CarList() {
    const [cars, setCars] = useState([{brand: "", model: "", color: "", fuel: "", year: "", price: ""}]);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [msgSnackbar, setMsgSnackbar] = useState("");

    useEffect(() => {
        fetchCars();
        console.log("Fetch successful");
    }, []);


    const fetchCars = () => {
        fetch('https://carrestservice-carshop.rahtiapp.fi/cars')
            .then(response => response.json())
            .then(data => {
                setCars(data._embedded.cars);
            })
            .catch(function (error) {
                console.log("Fetch failed!");
            });
    };

    const deleteCar = (params) => {
        console.log(params.data._links.self.href);
        if (window.confirm("Are you sure")) {
            fetch(params.data._links.self.href, {method: "DELETE"})
                .then((response) => {
                    if (response.ok) {
                        setOpenSnackbar(true);
                        setMsgSnackbar("Delete OK!");
                        fetchCars();
                    } else {
                        setOpenSnackbar(true);
                        setMsgSnackbar("Delete NOT OK!");
                    }
                })
                .catch(error => {
                    console.error("Error deleting car:", error);
                    setOpenSnackbar(true);
                    setMsgSnackbar("Error deleting car!");
                });
        }
    };

    const addCar = (car) => {
        fetch('https://carrestservice-carshop.rahtiapp.fi/cars', {
            method: "POST", headers: {
                'Content-type': 'application/json'
            }, body: JSON.stringify(car)
        })
            .then(response => {
                if (response.ok) {
                    setOpenSnackbar(true);
                    setMsgSnackbar("Car added!");
                    fetchCars();
                } else {
                    setOpenSnackbar(true);
                    setMsgSnackbar("Error adding car!");
                }
            })
            .catch(error => {
                console.error("Error adding car:", error);
                setOpenSnackbar(true);
                setMsgSnackbar("Error adding car!");
            });
    };

    const editCar = (car, link) => {
        fetch(link, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(car)
        })
            .then(response => {
                if (response.ok) {
                    setOpenSnackbar(true);
                    setMsgSnackbar("Car edited successfully");
                    fetchCars();
                } else {
                    setOpenSnackbar(true);
                    setMsgSnackbar("Error editing car!");
                }
            })
            .catch(error => {
                console.error("Error editing car:", error);
                setOpenSnackbar(true);
                setMsgSnackbar("Error editing car!");
            });
    };


    const columns = [{
        headerName: "Brand", field: "brand", filter: true, sortable: true,
    }, {
        headerName: "Model", field: "model", filter: true, sortable: true,
    }, {
        headerName: "Color", field: "color", filter: true, sortable: true,
    }, {
        headerName: "Fuel Type", field: "fuel", filter: true, sortable: true,
    }, {
        headerName: "Year", field: "modelYear", filter: true, sortable: true,
    }, {
        headerName: "Price", field: "price", filter: true, sortable: true,
    }, {
        cellRenderer: params => <EditCar editCar={editCar} car={params.data} params={params}/>
        ,
        width: 120,
        sortable: false,
        filter: false
    }, {
        cellRenderer: rows => <Button size="small" color="error" onClick={() => deleteCar(rows)}>Delete</Button>,
        width: 120,
        sortable: false,
        filter: false
    }];

    return <>
        <div className="ag-theme-material" style={{margin: "auto"}}>
            <AddCar addCar={addCar}/>
            <AgGridReact
                rowData={cars}
                columnDefs={columns}
                animateRows={true}
                rowSelection="single"
                pagination={true}
                paginationPageSize={100}
                domLayout='autoHeight'
            />
            <Snackbar
                open={openSnackbar}
                autoHideDuration={3000}
                onClose={() => setOpenSnackbar(false)}
                message={msgSnackbar}
            />
        </div>
    </>;
}