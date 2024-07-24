import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom'
import { useAuth } from '../store/Auth';
// import {toast} from 'react-toastify'


const Register = () => {

    const {storeTokenInloclStr} = useAuth()

    const navigate = useNavigate()

  const [form, setForm] = useState({
    name:'',
    phone:'',
    password:''
  });

  const handleChange = (e) => {
         let name = e.target.name;
         let value = e.target.value;

         setForm({
            ...form,
            [name]:value,
         })
  }
 

  const handleSubmit = async(event) => {
    event.preventDefault();
    console.log(form);
    try {
        const response = await fetch(`http://localhost:8000/api/register`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(form)
        })
        console.log("Response of the form is ",response);
    
        const res_data = await response.json()
        console.log("response from server of token in registration",res_data);
     
        if (response.ok) {
            storeTokenInloclStr(res_data.token)
            setForm({
                name: '',
               
                phone: '',
                password: ''
            })
            // toast.success("registration success")
           alert("Register Success")
            navigate("/chat")
        } else {
        //   toast.error(res_data.extraDetails ? res_data.extraDetails : res_data.message)
        alert("not registered")
        }
    
    
      } catch (error) {
        console.log(" User Register Error",error);
      }
       
      


  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px' }}>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name='name'
            value={form.name}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
            required
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="phone">Phone:</label>
          <input
            type="tel"
            id="phone"
            name='phone'
            value={form.phone}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
            required
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name='password'
            value={form.password}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
            required
          />
        </div>
        <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#4CAF50', color: 'white', border: 'none', cursor: 'pointer' }}>
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
