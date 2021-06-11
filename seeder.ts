import dotenv from 'dotenv';
import connectDB from './config/db';
import Cars from "./models/carsModel";
import cars from "./data/cars";
import Drivers from "./models/driversModel";
import drivers from "./data/drivers";

dotenv.config();
connectDB();

const importData = async () => {
    try {

        await Cars.deleteMany();
        await Drivers.deleteMany();
        await Cars.insertMany(cars);
        await Drivers.insertMany(drivers);
        console.log('Data imported!');
        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};
const destroyData = async () => {
    try {
        await Cars.deleteMany();
        await Drivers.deleteMany();
        console.log('Data Destroyed!');
        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}
