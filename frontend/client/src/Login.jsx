import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();

    const [data, setData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(
                "http://localhost:5000/api/login",
                data
            );

            localStorage.setItem("token", res.data.token);

            navigate("/dashboard");
        } catch (err) {
            alert("Invalid Credentials");
        }
    };

    return (
        <>
            <div className="logo">
                <img src="http://media.licdn.com/dms/image/v2/D4D0BAQGppkfEMwFkIg/company-logo_200_200/company-logo_200_200/0/1690980088760?e=2147483647&v=beta&t=-hmjcdM8c7bBfxUpyCy7gIDD5XX0qVUJ7XpKW8Y2lVg" alt="logo" />
            </div>
            <div className="container">
                <form className="form" onSubmit={handleSubmit}>
                    <h1>Admin Login</h1>

                    <input
                        type="email"
                        name="email"
                        placeholder="Enter Email"
                        onChange={handleChange}
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Enter Password"
                        onChange={handleChange}
                    />

                    <button type="submit">
                        Login
                    </button>
                </form>
            </div>
        </>
    );
}

export default Login;