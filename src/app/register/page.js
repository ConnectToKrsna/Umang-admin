'use client'
import { useState, useEffect } from "react";
import Link from "next/link";
import "../style.css"
import AttendanceToggle from "./AttendanceToggle";

// Fetch registration data from the server
const getRegister = async () => {
  try {
    //https://umang-admin.vercel.app/api/register
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
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;
  // const [filteredRegistrations, setFilteredRegistrations] = useState([]);

  useEffect(() => {
    // Fetch registration data on component mount
    const fetchData = async () => {
      const result = await getRegister();
      if (result.success !== false) {
        setRegistrations(result);
        // setFilteredRegistrations(result);
      }
    };
    fetchData();
  }, []);

  const handleFilterChange = (event) => {
    setFilterPaid(event.target.value);
    setCurrentPage(1); //reset to the first page on filter change
  };
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1); //reset to the first page on search change
  };
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const filteredRegistrations = registrations.filter(user => {
    if (filterPaid === 'all') {
      return true;
    } else if (filterPaid === 'true') {
      return user.paid;
    } else {
      return !user.paid;
    }
  }).filter(user => {
    if (!searchQuery) {
      return true;
    }
    const lowerCaseQuery = searchQuery.toLowerCase();
    return (user.name && user.name.toLowerCase().includes(lowerCaseQuery)) ||
      (user.registeredBy && user.registeredBy.toLowerCase().includes(lowerCaseQuery))
  });

  const totalPaidCount = registrations.filter(user => user.paid).length;
  const totalUnpaidCount = registrations.filter(user => !user.paid).length;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredRegistrations.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredRegistrations.length / itemsPerPage);

  // Filter registrations based on the selected filter value
  // const filteredRegistrations = registrations.filter(user => {
  //   if (filterPaid === 'all') return true;
  //   return filterPaid === 'true' ? user.paid : !user.paid;
  // });

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
          Total Count: {registrations.length} | Paid Count: {totalPaidCount} | Unpaid Count: {totalUnpaidCount}
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

      {/* Search input and button */}
      <div>
        <input 
          type="text" 
          placeholder="Search by Name or RegisteredBy" 
          value={searchQuery} 
          onChange={handleSearchChange} 
          style={{width: '15%'}}
        />
        {/* <button onClick={handleSearch}>Search</button> */}
      </div>

      {/* Registration table */}
      <table border="1">
        <thead>
          <tr>
            <td style={{ width: '5%' }}>Sr No.</td>
      <td style={{ width: '15%' }}>Name</td>
      <td style={{ width: '15%' }}>Email</td>
      <td style={{ width: '10%' }}>Contact</td>
      <td style={{ width: '10%' }}>Occupation</td>
      <td style={{ width: '20%' }}>Address</td>
      <td style={{ width: '10%' }}>Remarks</td>
      <td style={{ width: '10%' }}>Registered By</td>
      <td style={{ width: '5%' }}>Paid</td>
      {/* <td style={{ width: '10%' }}>Attendance</td> */}
          </tr>
        </thead>
        <tbody>
          {currentItems.map((user, index) => (
            <tr key={index}>
              <td>{indexOfFirstItem + index + 1}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.contact}</td>
              <td>{user.occupation}</td>
              <td>{user.address}</td>
              <td>{user.remarks}</td>
              <td>{user.registeredBy}</td>
              <td>{user.paid ? 'true' : 'false'}</td>
              {/* <td>
                <AttendanceToggle user={user} />
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>
          <div>
      <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button 
            key={index} 
            onClick={() => handlePageChange(index + 1)} 
            disabled={currentPage === index + 1}
          >
            {index + 1}
          </button>
        ))}
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
}
