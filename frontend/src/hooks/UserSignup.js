import { useState } from "react";
import { useAuthContext } from "../context/AuthContext.jsx";
import toast from "react-hot-toast";
const UseSignup = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();

    const signup = async ({ userName, password }) => {
        const success = handleInputErrors({ userName, password})
        if (!success) return;

        if(!userName || !password) {
            toast.error("Please fill all the fields")
            return;
        }

        setLoading(true);

        try {
            const res = await fetch("/api/auth/signup", {
                method: "Post",
                headers: { "content-Type": "application/json" },
                body: JSON.stringify({ userName, password })
            })

            const data = await res.json();

            if (data.error) {
                throw new Error(data.error);
            }

            localStorage.setItem("user", JSON.stringify(data))
            setAuthUser(data);

            toast.success("Signup Successful");

            console.log(data);
        } catch (error) {
            toast.error(error.message);
            throw new Error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return { loading, signup }
};


export default UseSignup;


function handleInputErrors({ userName, password}) {
    if (!userName || !password) {
        throw new Error('Please fill all the fields')
    }

    if (password.Length < 6) {
        throw new Error('Password length should be min of 6')
    }

    return true;
}