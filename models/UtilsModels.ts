import mongoose, { Document } from "mongoose";

const utilsSchema = new mongoose.Schema({
    startDate: {
        required: true,
        type: Date,
    },
    endDate: {
        type: Date,
    },
    driver: {
        type: mongoose.Types.ObjectId,
        ref: 'Drivers',
        required: true
    },
    car: {
        type: mongoose.Types.ObjectId,
        ref: 'Cars',
        required: true
    },
    reason: {
        required: true,
        type: String,
    },

}, {
    timestamps: true,
});

export interface UtilsInterface {
    startDate: string
    endDate: string
    driver: string
    reason: string
    plate: string
}

export interface UtilsDocument extends UtilsInterface, Document {


}

const Utils = mongoose.model<UtilsDocument>('Utils', utilsSchema);

export default Utils;
