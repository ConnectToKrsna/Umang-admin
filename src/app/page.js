'use client'
import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";
import PasswordInput from "@/components/PasswordInput";
import { useState } from "react";

export default function Home() {
  // const handlepass=()=>{
  //   if(input.target.value === "123"){
  //     let vb = "123";
  //   }
  // }
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
    <main>
    <h1>Hare Krishna</h1>

    <div>
    <Link href="/register">Admin Page</Link>
    </div>

    <div>
    <Link href="/addUser">Registration Page</Link>
    </div>
    </main>
  );
}