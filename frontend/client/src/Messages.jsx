import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function Messages() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/api/messages",
        {
          headers: {
            authorization: token,
          },
        }
      );

      setMessages(res.data);
    } catch (err) {
      alert("Unauthorized");
    }
  };

  return (
    <div className="messages-page">

      <div className="messages-overlay">

        <h1>Submitted Messages</h1>

        {messages.map((msg) => (
          <div className="message-card" key={msg.id}>
            <h3>{msg.name}</h3>
            <p><strong>Email:</strong> {msg.email}</p>
            <p><strong>Message:</strong> {msg.message}</p>
          </div>
        ))}

      </div>

    </div>
  );
}

export default Messages;