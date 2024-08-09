import React, { useState } from "react";

export default function AttendanceToggle({ user }) {
  const [isPresent, setIsPresent] = useState(user.attendance || false);

  const handleAttendanceChange = async () => {
    const updatedAttendance = !isPresent;
    setIsPresent(updatedAttendance);

    try {
      const response = await fetch(http://localhost:3000/api/register/${user._id}, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ attendance: updatedAttendance }),
      });

      if (!response.ok) {
        throw new Error("Failed to update attendance");
      }
    } catch (error) {
      console.error("Error updating attendance:", error);
      setIsPresent(isPresent); // Revert the change on error
    }
  };

  return (
    <div>
      <input
        type="checkbox"
        checked={isPresent}
        onChange={handleAttendanceChange}
      />
      {isPresent ? 'Present' : 'Absent'}
    </div>
  );
}