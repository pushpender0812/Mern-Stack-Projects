import { useEffect, useMemo, useState } from 'react';
import { io } from 'socket.io-client';
// import './MessageSocket.css'; // Import the CSS file
import "../App.css"
import { useAuth } from '../store/Auth';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import Chating from './Chating';

function MessageSocket() {
  const socket = useMemo(() => io("http://localhost:8000"), []);
  const {isLoggedIn,authorizationToken,user} = useAuth()

 if (!user) {
  <h1>Loading.......</h1>
 }

 


  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [usersChat,setUsersChat] = useState([])
  const [seen,setSeen] = useState(false)




  const getusers = async() => {
    try {
      const response = await fetch(`http://localhost:8000/api/chat-users`,{
          method:"GET",
          headers: {
              "Content-Type": "application/json",
              Authorization: authorizationToken,
            },

            
      })
      console.log("AUTH user data",response);

      if (response.ok) {
          const data = await response.json()
            console.log("Current User Data",data);    
            setUsersChat(data);
      }
  } catch (error) {
      console.log("Error Fetching User data",error)
  }
  }

  

  const setSeenTrue = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/set-seen?id=${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: authorizationToken,
          },
          // body:JSON.stringify({user_id:user.result._id,to_id:userToChat._id,message:message})
        }
      );
      console.log("AUTH user data", response);

      if (response.ok) {
        const data = await response.json();
        console.log("Current User Data", data);
        setSeen(true);
      }
    } catch (error) {
      console.log("Error Fetching User data", error);
    }
  };





  

  useEffect(() => {
    getusers()
  },[])

  return (
    <div className="container">
    <div className="sidebar">
      <input
        type="text"
        placeholder="Search or start new chat"
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="search-input"
      />
      <div className="user-list">
        {usersChat.filter(user => user.name.toLowerCase().includes(search.toLowerCase())).map((user, index) => (
          <div key={index} className="user">
            <NavLink to={`/chat/${user._id}`} onClick={() => setSeenTrue(user._id)}>{user.name}</NavLink>
          </div>
        ))}
      </div>
    </div>
    <div className="main-content">
      <Outlet />
    </div>
  </div>
  );
}

export default MessageSocket;
