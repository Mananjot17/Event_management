import Task from "../models/TaskModel.js"
import User from "../models/UserModel.js";
import mongoose from 'mongoose';
export const getTasks = async (req,res)=>{
    try{

        const admin = await User.findById(req.user.id)

        if(admin.role !== "Admin"){
            return res.status(403).json({ message: 'You are not authorized to perform this action' });
        }
        const tasks = await Task.find().populate('user', 'userName').populate('assignedUser', 'userName');

        const users = await User.find({ _id: { $ne: admin._id } })
        res.status(200).json({ tasks , users });
    }catch(error){
        console.error('Error fetching tasks:', error);
        res.status(500).json({ message: 'Error in getTasks controller', error: error.message });
    }
}

export const assignTask = async (req,res)=>{
    try{
        const { taskId , userId } = req.body
        const admin = await User.findById(req.user.id)
        if(admin.role !== "Admin"){
            return res.status(403).json({ message: 'You are not authorized to perform this action' });
        }

        if(!mongoose.Types.ObjectId.isValid(taskId) || !mongoose.Types.ObjectId.isValid(userId)){
            return res.status(400).json({ message: 'Invalid task id or user id' });
        }

        const task = await Task.findById(taskId)
        if(!task){
            return res.status(404).json({ message: 'Task not found for given task id' });
        }
        task.assignedUser = userId;
        await task.save();

        res.status(200).json({ message: 'Task assigned successfully' });
    }catch(error){
        console.error('Error assigning task:', error);
        res.status(500).json({ message: 'Error in assignTask controller', error: error.message });
    }
}