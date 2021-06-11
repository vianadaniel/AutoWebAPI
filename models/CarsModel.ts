import mongoose, { Document } from "mongoose";

const carsSchema = new mongoose.Schema({
    plate: {
        required: true,
        type: String,
        unique: true,
    },
    color: {
        required: true,
        type: String,

    },
    brand: {
        type: String,
        required: true,
    },
    trashed: {
        type: Boolean,
        default: false,
    },
    isAvailable: {
        type: Boolean,
        default: true,
    }
}, {
    timestamps: true,
});

export interface CarsInterface {
    plate: string
    color: string
    brand: string
    trashed?: boolean
    isAvailable?: boolean;
}

export interface CarDocument extends CarsInterface, Document {


}

const Cars = mongoose.model<CarDocument>('Cars', carsSchema);

export default Cars;
