import express from 'express'
import asyncHandler from 'express-async-handler'
import UtilsController from '../controllers/UtilsController'

const router = express.Router()

router.route('/').get(asyncHandler(UtilsController.get))
router.route('/create').post(asyncHandler(UtilsController.createUtil))
router.route('/finish/:id').patch(asyncHandler(UtilsController.finish))

export default router
