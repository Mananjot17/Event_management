import React , { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../context/AuthContext'
import toast from 'react-hot-toast'
const TaskCard = ({task , setTasks , users , refreshTasks}) => {


  const navigate = useNavigate();
  const {authUser} = useAuthContext();
  const [selectedUserId, setSelectedUserId] = useState('');


  const deleteTask = async()=>{
    try {
      const response = await fetch(`/api/user/deleteTask/${task._id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if(response.ok){
        toast.success('Task deleted successfully')
        setTasks((prevTasks) => prevTasks.filter((t) => t._id !== task._id))
      }
    } catch (error) {
      console.log({message: "Error occurred during task deletion" , error: error.message})
    }
  }

  const handleNavigate = ()=>{
    navigate('/editTask', { state: { task } });
  }

  const assignRole = async () => {
    if (!selectedUserId) {
      toast.error('Please select a user to assign');
      console.error('Please select a user to assign');
      return;
    }

    try {
      const response = await fetch('/api/admin/assignTask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          taskId: task._id,
          userId: selectedUserId,
        }),
      });

      if (response.ok) {
        toast.success('Task assigned successfully');
        console.log('Task assigned successfully');
        refreshTasks();
        
      } else {
        toast.error('Error occurred during task assignment');
        console.error('Error occurred during task assignment');
      }
    } catch (error) {
      console.error('Error occurred during task assignment:', error.message);
    }
  };
  return (
    <main className='w-full p-6 mb-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl shadow-lg'>
      {authUser.role === 'Admin' && (
        <h1 className='text-xl font-semibold mb-2'>
          Task By: <span className='font-normal'>{task.user ? task.user.userName : 'null'}</span>
        </h1>
      )}
      <div className='flex items-center justify-between mb-4'>
        <h1 className='text-3xl font-bold'>{task.title}</h1>
        <p className='text-sm'>
          <strong>Due Date:</strong> {task.dueDate.split('T')[0]}
        </p>
        <p className='text-sm pr-10'>
          <strong>Priority:</strong> {task.priority}
        </p>
      </div>
      <p className='text-lg text-pink-200 mb-4'>{task.description}</p>

      <p className='mb-6'>
        <strong>Status:</strong> {task.status}
      </p>

      <div className='flex justify-end gap-6'>
        {authUser.role === 'User' && (
          <>
            <button
              className='px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md transition duration-200'
              onClick={handleNavigate}
            >
              Edit
            </button>
            <button
              className='px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition duration-200'
              onClick={deleteTask}
            >
              Delete
            </button>
          </>
        )}

        <div className='flex items-center gap-4'>
          <p className='text-sm'>
            <strong>Assigned To:</strong> {task.assignedUser ? task.assignedUser.userName : 'null'}
          </p>
          {authUser.role === 'Admin' && (
            <>
              <select
                value={selectedUserId}
                onChange={(e) => setSelectedUserId(e.target.value)}
                className='px-3 py-2 border-2 border-blue-500 bg-white text-black rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500'
              >
                <option value='' disabled>
                  Select User
                </option>
                {users.map((user) => (
                  <option key={user._id} value={user._id}>
                    {user.userName}
                  </option>
                ))}
              </select>
              <button
                className='px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition duration-200'
                onClick={assignRole}
              >
                Assign Role
              </button>
            </>
          )}
        </div>
      </div>
    </main>
  );
}

export default TaskCard