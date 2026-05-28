import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.message
    ) {
      alert("All fields are required");
      return;
    }

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(formData.email)) {
      alert("Invalid Email");
      return;
    }

    if (formData.message.length < 10) {
      alert(
        "Message should contain at least 10 characters"
      );
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/contact",
        formData
      );

      setSuccess(res.data.message);

      setFormData({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      alert("Something went wrong");
    }
  };

  return (
    <>
      <div className="logo">
        <img src="http://media.licdn.com/dms/image/v2/D4D0BAQGppkfEMwFkIg/company-logo_200_200/company-logo_200_200/0/1690980088760?e=2147483647&v=beta&t=-hmjcdM8c7bBfxUpyCy7gIDD5XX0qVUJ7XpKW8Y2lVg" alt="logo"></img>
      </div>
      <div className="container">
        <form className="form" onSubmit={handleSubmit}>
          <h1>She Can Foundation</h1>

          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <textarea
            name="message"
            placeholder="Enter your message"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>

          <button type="submit">Submit</button>

          {success && <p>{success}</p>}
        </form>
      </div>
    </>
  );
}

export default App;