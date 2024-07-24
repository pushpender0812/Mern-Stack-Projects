import React, { useEffect, useMemo, useState } from "react";
import { io } from "socket.io-client";
import "../App.css";
import { useParams } from "react-router-dom";
import { useAuth } from "../store/Auth";
// import { toast } from "react-toastify";

const Chating = () => {
  const socket = useMemo(() => io("http://localhost:8000"), []);
  const { authorizationToken, user } = useAuth();

  const [userToChat, setUserToChat] = useState({});
  const [message, setMessage] = useState("");
  const [room, setRoom] = useState("");
  const [socketId, setSocketId] = useState("");
  const [messages, setMessages] = useState([]);
  const [otherMessage, setOtherMessage] = useState([]);
  const [loading, setLoading] = useState(true);
  const [socketConnected, setSocketConnected] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState({});

  const { id } = useParams();

  const getCurrentUsertochat = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/user-chat?id=${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: authorizationToken,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setUserToChat(data);
        setLoading(false);
      }
    } catch (error) {
      console.log("Error Fetching User data", error);
      setLoading(false);
    }
  };

  const chatwithUser = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/chatwithuser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: authorizationToken,
        },
        body: JSON.stringify({
          user_id: user.result._id,
          to_id: userToChat._id,
          message: message,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setUserToChat(data);
      }
    } catch (error) {
      console.log("Error Fetching User data", error);
    }
  };

  const gettingmyChatData = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/findChat?id=${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: authorizationToken,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setMessages(data);
        socket.emit("message", data);
      }
    } catch (error) {
      console.log("Error Fetching User data", error);
    }
  };

  const gettingfromChatData = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/from-message?id=${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: authorizationToken,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setOtherMessage(data);
        socket.emit("message", data);
      }
    } catch (error) {
      console.log("Error Fetching User data", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const messageData = {
      room, // the room to which the message is sent
      user_id: user.result._id,
      message,
      createdAt: new Date().toISOString(),
    };
    socket.emit("message", messageData);
    chatwithUser();
    setMessage("");
  };

  const toggleDropdown = (messageId) => {
    setDropdownVisible((prev) => ({
      ...prev,
      [messageId]: !prev[messageId],
    }));
  };

  const handleDelete = async (messageId) => {
    // Implement the logic to delete the message
    console.log("Deleting message:", messageId);
    setDropdownVisible((prev) => ({
      ...prev,
      [messageId]: false,
    }));

    try {
      const response = await fetch(
        `http://localhost:8000/api/delete-message?id=${messageId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: authorizationToken,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        // setOtherMessage(data);
        setDropdownVisible(false);
        alert("Message Deleted Successfully");
        socket.emit("message", data);
      }
    } catch (error) {
      console.log("Error Fetching User data", error);
    }
  };

  // const handleUpdate = (messageId) => {
  //   // Implement the logic to update the message
  //   console.log("Updating message:", messageId);
  //   setDropdownVisible((prev) => ({
  //     ...prev,
  //     [messageId]: false,
  //   }));
  // };

  const allMessages = [...messages, ...otherMessage].sort(
    (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
  );

  useEffect(() => {
    socket.emit("setup", user);
    socket.on("connected", () => setSocketConnected(true));

    socket.on("connect", () => {
      setSocketId(socket.id);
      console.log("Connected with socket ID:", socket.id);
    });

    socket.on("message recieved", (userData) => {
      console.log("Message received from server:", userData);
      setMessages((messages) => [...messages, userData]);
    });

    socket.on("welcome", (s) => {
      console.log(s);
    });

    return () => {
      socket.disconnect();
    };
  }, [message]);

  useEffect(() => {
    if (room) {
      socket.emit("join chat", room);
    }
  }, [room]);

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    getCurrentUsertochat();
    gettingmyChatData();
    gettingfromChatData();
    scrollToBottom();
  }, [id, message, otherMessage]);

  return (
    <>
      {loading ? (
        <div style={{ marginTop: "350px" }}>Loading...</div>
      ) : (
        <div className="chat-area">
          <div className="chat-header">
            <h2>
              <b>Chat With:</b> <span>{userToChat.name}</span>
              {userToChat.isloggedIn === true ? (
                <span className="status online">Online</span>
              ) : (
                <span className="status offline">Offline</span>
              )}
            </h2>
          </div>

          <button className="scroll-button" onClick={scrollToBottom}>
            ⬇️
          </button>

          <div
            className="messages"
            style={{ display: "flex", flexDirection: "column" }}
          >
            {allMessages.map((m, i) => (
              <div key={i} className="message" style={{ display: "grid" }}>
                <p
                  className={
                    user && m.user_id === user.result._id
                      ? "message-right"
                      : "message-left"
                  }
                >
                  {m.message}
                  {user && m.user_id === user.result._id && (
                    <>
                      {m.message === "⦸ This Message Was Deleted" ? (
                        ""
                      ) : (
                        <button
                          style={{ backgroundColor: "#dcf8c6", border: "none" }}
                          onClick={() => toggleDropdown(m._id)}
                        >
                          ⋮
                        </button>
                      )}

                      {dropdownVisible[m._id] && (
                        <div className="dropdown-menu">
                          {/* Add your dropdown menu items here
                          <button onClick={() => handleEdit(m._id)}>
                            Edit
                          </button> */}
                          <button onClick={() => handleDelete(m._id)}>
                            Delete
                          </button>
                        </div>
                      )}
                    </>
                  )}

                  <span className="message-time">
                    {new Date(m.createdAt).toLocaleTimeString()}
                  </span>
                  {user &&
                    m.user_id === user.result._id &&
                    (m.seen === false ? (
                      <span>
                        <img
                          style={{ height: "15px" }}
                          src="https://cdn-icons-png.flaticon.com/128/5684/5684957.png"
                          alt=""
                        />
                      </span>
                    ) : (
                      <span>
                        <img
                          style={{ height: "15px" }}
                          src="https://cdn-icons-png.flaticon.com/128/10337/10337166.png"
                          alt=""
                        />
                      </span>
                    ))}
                </p>
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="message-form">
            <input
              type="text"
              placeholder="Type a message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="message-input"
            />
            <button type="submit" className="send-button">
              Send
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default Chating;
