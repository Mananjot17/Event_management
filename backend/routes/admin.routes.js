import express from 'express'


import { getTasks , assignTask } from '../controllers/admin.controller.js'
import protectRoute from '../middleware/protectRoute.js';
const router = express.Router();

router.use('/getTasks' , protectRoute ,  getTasks)
router.use('/assignTask' , protectRoute , assignTask)


export default router