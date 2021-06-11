import express from "express";
import asyncHandler from "express-async-handler";
import DriversController from "../controllers/DriversController"

const router = express.Router();

router.route('/').get(asyncHandler(DriversController.getDrivers));
router.route('/create').post(asyncHandler(DriversController.createDriver));
router.route('/delete/:id').patch(asyncHandler(DriversController.deleteDriver))
router.route('/filter').get(asyncHandler(DriversController.filterDriver))
router.route('/:id').put(asyncHandler(DriversController.updateDriver))

export default router;
