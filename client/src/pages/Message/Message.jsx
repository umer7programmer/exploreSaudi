import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Message.css";
import Layout from "../../components/Layout/Layout/Layout";

const Message = () => {
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "Opponent",
      content: "Hello, how can I help you?",
    },
    // {
    //   id: 2,
    //   sender: "User",
    //   content: "",
    // },
    // ...other initial messages
  ]);

  const handleMessageSend = () => {
    if (newMessage.trim() !== "") {
      const newMessageObj = {
        id: messages.length + 1,
        sender: "User",
        content: newMessage,
      };
      setMessages([...messages, newMessageObj]);
      setNewMessage(""); // Clear the textarea after sending
    }
  };

  const opponentMessage = messages.find(
    (message) => message.sender === "Opponent"
  );

  return (
    <Layout>
      <div className="message">
        <div className="container">
          <span className="breadcrumbs">
            <Link to="/messages">Messages</Link>
          </span>
          <div className="messages">
            {opponentMessage && (
              <div className="item">
                <img
                  src="https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600"
                  alt=""
                />
                <p>{opponentMessage.content}</p>
              </div>
            )}
            {messages.map((message, index) => (
              <div
                key={index}
                className={`item ${message.sender === "User" ? "owner" : ""}`}
              >
                <img
                  src={
                    message.sender === "User"
                      ? "https://images.pexels.com/photos/1115697/pexels-photo-1115697.jpeg?auto=compress&cs=tinysrgb&w=1600"
                      : "https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600"
                  }
                  alt=""
                />
                <p className="text-dark">{message.content}</p>
              </div>
            ))}
          </div>
          <hr />
          <div className="write">
            <textarea
              className="text-dark"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="write a message"
            />
            <button onClick={handleMessageSend}>Send</button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Message;
