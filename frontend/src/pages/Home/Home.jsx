import React , { useState , useEffect }from 'react'
import TaskCard from '../../components/TaskCard'
import { useNavigate } from 'react-router-dom'; 
import { useAuthContext } from '../../context/AuthContext';
import toast from 'react-hot-toast';
const Home = () => {
  const [tasks, setTasks] = useState([])
  const [users, setUsers] = useState([])
  const navigate = useNavigate();
  const {authUser , setAuthUser} = useAuthContext();


    const fetchTasks = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/${authUser.role === 'Admin' ? 'admin/getTasks' : 'user/getUserTasks'}`);
        
        if (!res.ok) {
          throw new Error(`Error: ${res.message}`);
        }
  
        const data = await res.json();
        setTasks(data.tasks);
        if(authUser.role === 'Admin'){
          setUsers(data.users);
        }
      } catch (error) {
        console.error('Failed to fetch tasks:', error.message);
        setTasks([]);
      }
    };
  


  useEffect(() => {
    fetchTasks();
  }, [authUser.role]);
  
  const handleCreateTask = () => {
    navigate('/createtask'); 
  };

  const handleLogout = async() =>{
    try {
      const response = await fetch('http://localhost:3000/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        setAuthUser(null);
        toast.success("Logout Successful")
        navigate('/login');
      } else {
        toast.error("logout failed")
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Error occurred during logout:', error.message);
    }
  }


  return (
    <>
      <main className="flex flex-col w-[40rem] h-full min-h-screen p-8 gap-8 bg-gradient-to-r from-purple-500 to-blue-600 text-white">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-5xl font-semibold text-center">Task List</h1>

          {/* Buttons for Create Task (User) and Logout */}
          <div className="flex gap-6">
            {authUser.role === 'User' && (
              <button
                className="h-12 px-6 bg-green-500 hover:bg-green-600 rounded-md text-xl font-medium transition duration-200"
                onClick={handleCreateTask}
              >
                Create Task
              </button>
            )}

            <button
              className="h-12 px-6 bg-red-500 hover:bg-red-600 rounded-md text-xl font-medium transition duration-200"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>

        {/* Task Cards */}
        <div className="flex flex-col gap-6">
          {tasks?.map((task) => (
            <TaskCard
              task={task}
              key={task._id}
              setTasks={setTasks}
              users={users}
              refreshTasks={fetchTasks}
            />
          ))}
        </div>
      </main>
    </>
  );
  
}

export default Home