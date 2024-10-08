import Task from "../models/TaskModel.js"
import mongoose from 'mongoose'

export const createTask = async(req,res)=>{
    const { title , description , dueDate , priority } = req.body

    if(!title || !description || !dueDate || !priority){
        return res.status(400).json({message : "All fields are required"})
    }


    if (isNaN(Date.parse(dueDate))) {
        return res.status(400).json({ message: 'Invalid due date' });
    }

    const validPriorities = ['low', 'medium', 'high'];
    if (!validPriorities.includes(priority)) {
        return res.status(400).json({ message: 'Invalid priority value, use low, medium, or high' });
    }

    const userId = req.user.id;

    try{
        const newTask = new Task({
            user: userId,
            title,
            description,
            dueDate,
            priority
        })
        await newTask.save();
        const newTaskId = newTask._id;
        res.status(201).json({message : "Task created successfully" , newTaskId})
    }catch(error){
        console.log(error)
        res.status(500).json({message : "error in createTask controller" , error})
    }



}

export const updateTask = async(req,res)=>{
    const { title , description , dueDate , priority, status } = req.body

 

    
    const userId = req.user.id;
    const taskId = req.params.taskId;
    
    try{
        if(!title && !description && !dueDate && !priority && !status){
            return res.status(400).json({ message: 'No fields to update' });
        }
        if(status !== 'todo' && status !== 'inprogress' && status !== 'completed'){
            return res.status(400).json({ message: 'Invalid status value, use todo or inprogress or completed' });
        }
        if (!mongoose.Types.ObjectId.isValid(taskId)) {
            return res.status(400).json({ message: 'Invalid task id' });
        }
        const task = await Task.findById(taskId);
        if (!task) {
            return res.status(404).json({ message: 'Task not found for given taskId' });
        }
        if(!task.user.equals(userId)){
            return res.status(403).json({ message: 'You are not authorized to update this task' });
        }
        
        if (title) task.title = title;
        if (description) task.description = description;
        if (dueDate) task.dueDate = dueDate;
        if (priority) task.priority = priority;
        if (status) task.status = status;
        await task.save();
          

        res.status(200).json({  message: 'Task details updated' });
      

    }catch(error){
        console.log("error " , error);
        res.status(500).json({ message: 'Error in updateTask Controller' , error: error.message } );
    }
}

export const  deleteTask = async (req,res)=>{
    const { taskId }= req.params;    
    const userId = req.user.id;
    try{
        if (!mongoose.Types.ObjectId.isValid(taskId)) {
            return res.status(400).json({ message: 'Invalid task ID' });
        }

        const task = await Task.findById(taskId);
        if (!task) {
            return res.status(404).json({ message: 'Task not found for given taskId' });
        }

        if(!task.user.equals(userId)){
            return res.status(403).json({ message: 'You are not authorized to delete this task' });
        }

        await task.deleteOne({ _id: taskId });
       
        res.status(200).json({ message: 'Task deleted successfully' });

    }catch(error){
        console.log(error);
        res.status(500).json({message: "error in deleteTask controller" , error: error.message})
    }
}

export const getUserTasks = async(req,res)=>{
    const userId = req.user.id;
    // const { stockSymbol, tags, sortBy, page=1 , limit=10 } = req.query;
    try{
        const tasks = await Task.find({$or: [
            { user: userId },  
            { assignedUser: userId }
        ]}).populate('user', 'userName').populate('assignedUser', 'userName');
        if(!tasks){
            return res.status(200).json({message: "No Tasks are generated by or assigned to this user"})
        }

   
        res.status(200).json({ tasks });
    }catch(error){
        console.log(error);
        res.status(500).json({message: "error in getUserTasks controller" , error: error.message})
    }
}