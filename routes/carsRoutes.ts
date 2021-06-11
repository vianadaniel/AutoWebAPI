import express from "express";
import asyncHandler from "express-async-handler";
import CarsController from "../controllers/CarsController"

const router = express.Router();

router.route('/').get(asyncHandler(CarsController.getCars));
router.route('/create').post(asyncHandler(CarsController.createCar))
router.route('/delete').patch(asyncHandler(CarsController.deleteCar))
router.route('/filter').get(asyncHandler(CarsController.filterCars))
router.route('/:id').put(asyncHandler(CarsController.updateCar))


export default router;
