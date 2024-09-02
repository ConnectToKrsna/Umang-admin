
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

// Function to convert JSON data to CSV format
const convertToCSV = (data) => {
  const headers = [
    "Sr No.",
    "Name",
    "Email",
    "Contact",
    "Occupation",
    "Address",
    "Remarks",
    "Registered By",
    "Paid"
  ];

  // Function to escape and wrap fields that contain special characters
  const escapeField = (field) => {
    if (typeof field === 'string') {
      return `"${field.replace(/"/g, '""')}"`; // Escape double quotes by doubling them
    }
    return field;
  };

  const rows = data.map((user, index) => [
    index + 1,
    escapeField(user.name),
    escapeField(user.email),
    escapeField(user.contact),
    escapeField(user.occupation),
    escapeField(user.address),
    escapeField(user.remarks),
    escapeField(user.registeredBy),
    user.paid ? "true" : "false"
  ]);

  return [
    headers.join(","), // Join headers with commas
    ...rows.map(row => row.join(",")) // Join each row's fields with commas
  ].join("\n"); // Join rows with newlines
};

// Function to trigger CSV download
const downloadCSV = (data, filename = "registrations.csv") => {
  const csvString = convertToCSV(data);
  const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");

  link.href = URL.createObjectURL(blob);
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// New function to download attendance data of present users
const downloadAttendanceCSV = (data, filename = "attendance.csv") => {
  const attendanceData = data.filter(user => user.attendance);
  downloadCSV(attendanceData, filename);
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
      (user.registeredBy && user.registeredBy.toLowerCase().includes(lowerCaseQuery)) ||
      (user.contact && String(user.contact).toLowerCase().includes(lowerCaseQuery)) // Convert contact to string safely
  });

  const totalPaidCount = registrations.filter(user => user.paid).length;
  const totalUnpaidCount = registrations.filter(user => !user.paid).length;
  const totalAttendanceCount = registrations.filter(user => user.attendance).length;

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
          Total Count: {registrations.length} | Paid Count: {totalPaidCount} | Unpaid Count: {totalUnpaidCount} | Attendance Count: {totalAttendanceCount}
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
      <td style={{ width: '6%' }}>Attendance</td>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((user, index) => (
            <tr key={user._id}>
              <td>{indexOfFirstItem + index + 1}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.contact}</td>
              <td>{user.occupation}</td>
              <td>{user.address}</td>
              <td>{user.remarks}</td>
              <td>{user.registeredBy}</td>
              <td>{user.paid ? 'true' : 'false'}</td>
              <td>
                <AttendanceToggle user={user} />
              </td>
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
      {/* Download button */}
      <div>
        <button onClick={() => downloadCSV(filteredRegistrations)}>
          Download This Data
        </button>
        <button onClick={() => downloadAttendanceCSV(registrations)}>
          Download Attendance Data
        </button>
      </div>
    </div>
  );
}
