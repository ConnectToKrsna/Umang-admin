'use client'
import { useState, useEffect } from "react";
import Link from "next/link";

// Fetch registration data from the server
const getRegister = async () => {
  try {
    let response = await fetch("https://umang-admin.vercel.app/api/register", { cache: 'no-store' });
    let data = await response.json();
    if (data.success) {
      return data.result;
    } else {
      return { success: false };
    }
  } catch (error) {
    console.error("Failed to fetch registration data:", error);
    return { success: false };
  }
};

// Page component
export default function Page() {
  const [registrations, setRegistrations] = useState([]);
  const [filterPaid, setFilterPaid] = useState('all');

  useEffect(() => {
    // Fetch registration data on component mount
    const fetchData = async () => {
      const result = await getRegister();
      if (result.success !== false) {
        setRegistrations(result);
      }
    };
    fetchData();
  }, []);

  const handleFilterChange = (event) => {
    setFilterPaid(event.target.value);
  };

  // Filter registrations based on the selected filter value
  const filteredRegistrations = registrations.filter(user => {
    if (filterPaid === 'all') return true;
    return filterPaid === 'true' ? user.paid : !user.paid;
  });

  const [authenticated, setAuthenticated] = useState(false);
  const correctPassword = 'vansh@donation'; // Replace with your actual password

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
    <div>
      <nav>
        <div>
          <h1>Hare Krishna</h1>
        </div>
        <div>
          <Link href="/">Home</Link>
        </div>
        <div>
          Total Count: {registrations.length}
        </div>
      </nav>
      
      <h1>Registration List</h1>
      
      {/* Filter dropdown */}
      <div>
        <label htmlFor="filter">Filter by Paid Status:</label>
        <select id="filter" value={filterPaid} onChange={handleFilterChange}>
          <option value="all">All</option>
          <option value="true">Paid</option>
          <option value="false">Unpaid</option>
        </select>
      </div>

      {/* Registration table */}
      <table border="1">
        <thead>
          <tr>
            <td>Sr No.</td>
            <td>name</td>
            <td>email</td>
            <td>contact</td>
            <td>occupation</td>
            <td>address</td>
            <td>remarks</td>
            <td>registeredBy</td>
            <td>paid</td>
          </tr>
        </thead>
        <tbody>
          {filteredRegistrations.map((user, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.contact}</td>
              <td>{user.occupation}</td>
              <td>{user.address}</td>
              <td>{user.remarks}</td>
              <td>{user.registeredBy}</td>
              <td>{user.paid ? 'true' : 'false'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}