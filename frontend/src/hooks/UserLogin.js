
import { useState } from "react";
import { useAuthContext } from "../context/AuthContext.jsx"
import toast from 'react-hot-toast';
const userLogin = () => {

    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();

    const login = async (username, password) => {
        setLoading(true);
        try {

            if(!username || !password) {
                throw new Error('Please fill all the fields')
            }

            const res = await fetch("/api/auth/login", {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password })
            });

            const data = await res.json()
            if (data.error) {
                throw new Error(data.error)
            }

            localStorage.setItem("user", JSON.stringify(data));
            toast.success("Login Successful");
            setAuthUser(data);

        } catch (error) {
            toast.error(error.message);
            throw new Error(error.message);
        } finally {
            setLoading(false);
        }
    }

    return { loading, login };
}

export default userLogin;
