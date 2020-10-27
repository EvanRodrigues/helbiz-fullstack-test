import React, { useState, useEffect } from "react";
import { useLazyQuery, gql } from "@apollo/client";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { VehicleInput } from "./VehicleInput";

export const VehicleTable = () => {
    const [vehicleInput, setVehicleInput] = useState("");

    const handleSubmit = () => {
        refetch({ id: vehicleInput });
    };

    /*
     * My query to get the vehicle information.
     */
    const VEHICLES = gql`
        query($id: ID!) {
            vehicles(id: $id) {
                bike_id
                lat
                lon
                is_reserved
                is_disabled
                vehicle_type
            }
        }
    `;

    /*
     * Using a LazyQuery to avoid multiple queries on input change.
     */
    const [getVehicles, { loading, data, refetch }] = useLazyQuery(VEHICLES);

    /*
     * Initializes the table with information of every vehicle.
     */
    useEffect(() => {
        getVehicles({
            variables: { id: vehicleInput },
        });
    }, []);

    if (loading || !data) return <></>;

    /*
     * If the api returns [null], return an empty table with VehicleInput.
     */
    if (!data.vehicles[0]) {
        return (
            <div className="formContainer">
                <VehicleInput
                    setter={setVehicleInput}
                    handleSubmit={handleSubmit}
                />

                <span className="errorMessage">Could not find vehicle!</span>

                <div className="tableContainer">
                    <TableContainer component={Paper}>
                        <Table
                            className="vehicleTable"
                            aria-label="simple table"
                        >
                            <TableHead>
                                <TableRow>
                                    <TableCell component="th" scope="row">
                                        Bike Id
                                    </TableCell>
                                    <TableCell align="right">
                                        Latitude
                                    </TableCell>
                                    <TableCell align="right">
                                        Longitude
                                    </TableCell>
                                    <TableCell align="right">
                                        Reserved
                                    </TableCell>
                                    <TableCell align="right">
                                        Disabled
                                    </TableCell>
                                    <TableCell align="right">Type</TableCell>
                                </TableRow>
                            </TableHead>
                        </Table>
                    </TableContainer>
                </div>
            </div>
        );
    }

    return (
        <div className="formContainer">
            <VehicleInput
                setter={setVehicleInput}
                handleSubmit={handleSubmit}
            />

            <div className="tableContainer">
                <TableContainer component={Paper}>
                    <Table className="vehicleTable" aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell component="th" scope="row">
                                    Bike Id
                                </TableCell>
                                <TableCell align="right">Latitude</TableCell>
                                <TableCell align="right">Longitude</TableCell>
                                <TableCell align="right">Reserved</TableCell>
                                <TableCell align="right">Disabled</TableCell>
                                <TableCell align="right">Type</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.vehicles.map((vehicle) => (
                                <TableRow key={vehicle.bike_id}>
                                    <TableCell component="th" scope="row">
                                        {vehicle.bike_id}
                                    </TableCell>
                                    <TableCell align="right">
                                        {vehicle.lat}
                                    </TableCell>
                                    <TableCell align="right">
                                        {vehicle.lon}
                                    </TableCell>
                                    <TableCell align="right">
                                        {vehicle.is_reserved.toString()}
                                    </TableCell>
                                    <TableCell align="right">
                                        {vehicle.is_disabled.toString()}
                                    </TableCell>
                                    <TableCell align="right">
                                        {vehicle.vehicle_type}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    );
};
