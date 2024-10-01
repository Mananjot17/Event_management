
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const EditTask = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { task } = state || {};
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: '',
    status: ''
  });

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title,
        description: task.description,
        dueDate: task.dueDate.split('T')[0],
        priority: task.priority,
        status: task.status
      });
    }
  }, [task]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const taskData = {
      title: formData.title,
      description: formData.description,
      dueDate: formData.dueDate,
      priority: formData.priority,
      status: formData.status
    };

    try {
      const res = await fetch(`/api/user/updateTask/${task._id}`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskData),
      });

      if (res.ok) {
        const data = await res.json();
        console.log('Task updated:', data);
        handleNavigate();
      } else {
        console.error('Failed to update task');
      }
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  const handleNavigate = () => {
    navigate('/');
  };

  return (
    <main className='h-screen flex flex-col items-center justify-center bg-gray-100 px-4'>
      <div className='bg-white shadow-lg rounded-lg w-full max-w-xl p-8'>
        <h1 className='text-4xl font-bold text-center text-gray-700 mb-6'>
          Edit Task
        </h1>
        <form onSubmit={handleSubmit} className='space-y-6'>
          <div>
            <label className='block text-gray-600 text-sm font-medium mb-2'>
              Title
            </label>
            <input
              type='text'
              name='title'
              placeholder='Enter Title'
              className='input w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
              value={formData.title}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className='block text-gray-600 text-sm font-medium mb-2'>
              Description
            </label>
            <textarea
              name='description'
              placeholder='Enter Description'
              className='input w-full border border-gray-300 rounded-lg px-4 py-2 h-24 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500'
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className='block text-gray-600 text-sm font-medium mb-2'>
              Due Date
            </label>
            <input
              type='date'
              name='dueDate'
              className='input w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
              value={formData.dueDate}
              onChange={handleChange}
            />
          </div>

          <div className='flex justify-between'>
            <div>
              <label className='block text-gray-600 text-sm font-medium mb-2'>
                Priority
              </label>
              <select
                name='priority'
                className='input w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                value={formData.priority}
                onChange={handleChange}
              >
                <option value='low'>Low</option>
                <option value='medium'>Medium</option>
                <option value='high'>High</option>
              </select>
            </div>

            <div>
              <label className='block text-gray-600 text-sm font-medium mb-2'>
                Status
              </label>
              <select
                name='status'
                className='input w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                value={formData.status}
                onChange={handleChange}
              >
                <option value='todo'>To Do</option>
                <option value='inprogress'>In Progress</option>
                <option value='completed'>Completed</option>
              </select>
            </div>
          </div>

          <div>
            <button type='submit' className='w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600'>
              Update Task
            </button>
          </div>
        </form>

        <button
          className='w-full mt-4 text-gray-500 hover:text-gray-700'
          onClick={handleNavigate}
        >
          Go Back
        </button>
      </div>
    </main>
  );
};

export default EditTask;
