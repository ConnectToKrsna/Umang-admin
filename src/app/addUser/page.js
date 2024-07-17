"use client"
import { useState } from "react"
import "../style.css"
import PasswordInput from "@/components/PasswordInput";
// import "../style.css"
export default function Page(){
    const [name,setName] = useState("");
    const [contact,setContact] = useState("");
    const [email,setEmail] = useState("");
    const [registeredBy,setRegisteredby] = useState("");
    const [address,setAddress] = useState("");
    const [occupation,setOccupation] = useState("");
    const [remarks,setRemarks] = useState("");
    const [paid,setPaid] = useState(false);

    const addUser=async ()=>{
        // console.log(name,phone,email,registeredby,area);
        let result = await fetch("https://umang-admin.vercel.app/api/register",{
            method:"POST",
            body:JSON.stringify({name,contact,email,registeredBy,address,occupation,remarks,paid})
        });
        result = await result.json();
        if(result.success){
            alert("registration done")
        }

    }
    const [authenticated, setAuthenticated] = useState(false);
    const correctPassword = 'vansh@2024'; // Replace with your actual password
  
    const handlePasswordSubmit = (inputPassword) => {
      if (inputPassword === correctPassword) {
        setAuthenticated(true);
      } else {
        alert('Incorrect password. Please try again.');
      }
    };
  
    if (!authenticated) {
      return <PasswordInput onPasswordSubmit={handlePasswordSubmit} />;
    }
    return (
        <div className="add-data">
            <h1 className="heading-add">
                Registration For Umang 2024
            </h1>
            <div className="input-data">
            <div className="container">
            <input type="text" value={name} onChange={(e)=>setName(e.target.value)} placeholder="enter name" className="input" />
            <input type="text" value={contact} onChange={(e)=>setContact(e.target.value)} placeholder="enter contact" className="input" />
            <input type="text" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="enter email" className="input" />
            <input type="text" value={registeredBy} onChange={(e)=>setRegisteredby(e.target.value)} placeholder="enter registeredby" className="input" />
            <input type="text" value={address} onChange={(e)=>setAddress(e.target.value)} placeholder="enter address" className="input" />
            <input type="text" value={occupation} onChange={(e)=>setOccupation(e.target.value)} placeholder="enter occupation" className="input" />
            <input type="text" value={remarks} onChange={(e)=>setRemarks(e.target.value)} placeholder="remarks" className="input" />
            <p>Check This Box If Paid</p>
            <input type="checkbox" id="booleanCheckbox" name="booleanValue" checked={paid} value={paid} onChange={(e)=>setPaid(e.target.checked)} placeholder="enter paid or not" className="input" />

            <div className="btn-container">
            <button className="btn" onClick={addUser}>Register</button>
            </div>
            </div>
            </div>
        </div>
    )
}