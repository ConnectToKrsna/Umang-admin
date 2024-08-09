import React, { useState } from "react";

export default function AttendanceToggle({ user }) {
  const [isPresent, setIsPresent] = useState(user.attendance || false);
  const [loading, setLoading] = useState(false); // Optional: to handle loading state
  const [error, setError] = useState(null); // Optional: to handle errors

  const handleAttendanceChange = async () => {
    const updatedAttendance = !isPresent;
    setIsPresent(updatedAttendance);
    setLoading(true);

    try {
      const response = await fetch(`https://umang-admin.vercel.app/api/register/${user._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ attendance: updatedAttendance }),
      });

      if (!response.ok) {
        throw new Error(`Failed to update attendance: ${response.statusText}`);
      }

      const result = await response.json();
      if (!result.success) {
        throw new Error("Failed to update attendance on the server.");
      }

      setLoading(false);
    } catch (error) {
      console.error("Error updating attendance:", error);
      setIsPresent(!updatedAttendance); // Revert the change on error
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <div>
      <input
        type="checkbox"
        checked={isPresent}
        onChange={handleAttendanceChange}
        disabled={loading} // Optional: disable checkbox during update
      />
      {isPresent ? "Present" : "Absent"}
      {loading && <span>Updating...</span>} {/* Optional: show loading indicator */}
      {error && <p style={{ color: "red" }}>Error: {error}</p>} {/* Optional: show error */}
    </div>
  );
}
