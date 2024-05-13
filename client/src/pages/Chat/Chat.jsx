import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/auth";
import { useParams } from "react-router-dom";
import Layout from "../../components/Layout/Layout/Layout.jsx";

const Chat = () => {
  const { sellerId } = useParams();
  const [messages, setMessages] = useState([]);
  const [recentChats, setRecentChats] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const [auth] = useAuth();

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/api/v1/messages/${auth?.user?._id}/${sellerId}`
        );
        setMessages(res.data.messages);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchRecentChats = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/api/v1/messages/recent/${auth?.user?._id}`
        );
        setRecentChats(res.data.chats);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMessages();
    fetchRecentChats();
  }, [sellerId, auth]);

  const sendMessage = async () => {
    try {
      const data = {
        sender: auth?.user?._id,
        receiver: sellerId,
        content: messageInput,
      };

      const res = await axios.post(
        "http://localhost:8080/api/v1/messages/send",
        data
      );
      if (res.data.success) {
        setMessages([...messages, res.data.message]);
        setMessageInput(""); // Clear input after sending
      } else {
        console.error("Failed to send message");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout>
      <div className="container-fluid">
        <div className="row d-flex flex-row gap-3 justify-content-center">
          {/* Sidebar */}
          <div
            className="col-3 bg-light"
            style={{ minHeight: "80vh", overflowY: "auto" }}
          >
            <h2 className="text-center mt-3 mb-4" style={{ color: "#3A6A3B" }}>
              Recent Chats
            </h2>
            <ul className="list-group">
              {recentChats.map((chat) => (
                <li key={chat._id} className="list-group-item">
                  <button
                    className="btn btn-link"
                    onClick={() => {
                      // Navigate to the chat with the selected seller
                      // You can implement this navigation based on your routing setup
                    }}
                    style={{ color: "#3A6A3B" }}
                  >
                    {chat.receiver.name}
                    {/* Assuming receiver has a 'name' field */}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Chat Window */}
          <div className="col-8 ">
            <div className="card" style={{ height: "80vh", overflowY: "auto" }}>
              <div
                className="card-header"
                style={{ backgroundColor: "#3A6A3B", color: "white" }}
              >
                Chat with Seller
              </div>
              <div className="card-body">
                <div
                  className="message-list"
                  style={{ maxWidth: "100%", overflowWrap: "break-word" }}
                >
                  {messages.map((message) => (
                    <div
                      key={message._id}
                      className={`message card`}
                      style={{
                        backgroundColor: "whiteSmoke",
                        color: "black",
                        maxWidth: "100%",
                        overflowWrap: "break-word",
                        marginBottom: "10px",
                      }}
                    >
                      <div className="card-body">{message.content}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="card-footer">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    placeholder="Type your message..."
                  />
                  <button
                    className="btn btn-primary"
                    onClick={sendMessage}
                    style={{ backgroundColor: "#3A6A3B" }}
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Chat;
