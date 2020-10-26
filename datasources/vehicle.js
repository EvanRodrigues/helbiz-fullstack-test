const { RESTDataSource } = require("apollo-datasource-rest");

class VehicleAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseURL =
            "https://api.helbiz.com/admin/reporting/arlington/gbfs/free_bike_status.json";
    }

    /*
     * Creates a JavaScript object with all of the vehicle information.
     * Returns null if the input is null.
     */
    vehicleReducer(vehicle) {
        if (!vehicle) return null;

        return {
            bike_id: vehicle.bike_id || 0,
            lat: vehicle.lat,
            lon: vehicle.lon,
            is_reserved: vehicle.is_reserved,
            is_disabled: vehicle.is_disabled,
            vehicle_type: vehicle.vehicle_type,
        };
    }

    /*
     * Gets all vehicles from the Helbiz API.
     * Returns an array of vehicles.
     */
    async getAllVehicles() {
        const response = await this.get("");

        return Array.isArray(response.data.bikes)
            ? response.data.bikes.map((vehicle) => this.vehicleReducer(vehicle))
            : [];
    }

    /*
     * Gets all vehicles from the Helbiz API and then filters the response to match the correct vehicleId.
     * Returns null if no vehicle is found with the given ID.
     */
    async getVehicleById({ vehicleId }) {
        const response = await this.get("");

        return this.vehicleReducer(
            response.data.bikes.filter(
                (vehicle) => vehicleId == vehicle.bike_id
            )[0]
        );
    }
}

module.exports = VehicleAPI;
