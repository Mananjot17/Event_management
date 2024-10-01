import mongoose from 'mongoose'
// import user model
const taskSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    dueDate: {
        type : Date,
        required: true
    },
    status: {
        type: String,
        enum: ['todo' , 'inprogress' , 'completed'],
        default: 'todo'
    },
    assignedUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null
    },
    priority: {
        type: String,
        enum: ['low' , 'medium' , 'high'],
        required: true,
    }
})

const Task =  mongoose.model('Task' , taskSchema);
export default Task;