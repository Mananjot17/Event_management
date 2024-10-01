import express from 'express'
import {createTask , updateTask , deleteTask , getUserTasks} from '../controllers/user.controller.js'
import protectRoute from '../middleware/protectRoute.js';
const router = express.Router();

router.use('/createTask' , protectRoute ,  createTask)
router.use('/updateTask/:taskId' , protectRoute , updateTask)
router.use('/deleteTask/:taskId' , protectRoute , deleteTask)
router.use('/getUserTasks' , protectRoute , getUserTasks)

export default router