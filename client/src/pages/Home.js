import React from "react";
import { VehicleTable } from "../components/VehicleTable";

export const Home = () => {
    return (
        <div className="homePage">
            <h1 className="pageHeader">Helbiz Test</h1>
            <div className="content">
                <VehicleTable />
            </div>
        </div>
    );
};
