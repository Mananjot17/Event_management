import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
const CreateTask = () => {
  // State to store form values
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('low'); // default to 'low'
  const navigate = useNavigate();

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description || !dueDate) {
      toast.error('Please fill in all fields');
      return;
    }

    const taskData = {
      title,
      description,
      dueDate,
      priority,
    };

    try {
      const res = await fetch('http://localhost:3000/api/user/createTask', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskData),
      });
      const data = await res.json();
      console.log('Task created:', data);

      toast.success('Task created successfully');
      handleNavigate();
      
      setTitle('');
      setDescription('');
      setDueDate('');
      setPriority('low');
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };


  const handleNavigate = () => {
    navigate('/');
  };

  return (
    <main className="h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 to-blue-600 p-8">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-md p-8">
        <h1 className="text-4xl font-semibold text-center text-gray-800 mb-6">
          Create Task
        </h1>

        <form onSubmit={handleSubmit}>
          {/* Title Input */}
          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-semibold mb-2">
              Title
            </label>
            <input
              type="text"
              placeholder="Enter Title"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* Description Input */}
          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-semibold mb-2">
              Description
            </label>
            <textarea
              placeholder="Enter Description"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* Due Date Input */}
          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-semibold mb-2">
              Due Date
            </label>
            <input
              type="date"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>

          {/* Priority Selection */}
          <div className="mb-6">
            <label className="block text-gray-600 text-sm font-semibold mb-2">
              Priority
            </label>
            <select
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button className="w-full bg-purple-500 text-white py-2 px-4 rounded-md hover:bg-purple-600 focus:outline-none focus:ring-4 focus:ring-purple-300 transition duration-200">
              Create Task
            </button>
          </div>
        </form>

        {/* Go Back Button */}
        <div className="mt-4 flex justify-center">
          <button
            className="text-purple-500 hover:text-purple-600 font-medium"
            onClick={handleNavigate}
          >
            Go Back
          </button>
        </div>
      </div>
    </main>
  );
};

export default CreateTask;
