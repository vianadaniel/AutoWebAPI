import mongoose, { Document } from "mongoose";

const driversSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String,

    },
    trashed: {
        type: Boolean,
        default: false,
    }
}, {
    timestamps: true,
});

export interface DriversInterface {
    name: string

}

export interface DriversDocument extends DriversInterface, Document {


}

const Drivers = mongoose.model<DriversDocument>('Drivers', driversSchema);

export default Drivers;
