// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { BASE_URL } from "../utils/config";

// const UserProfile = () => {
//   const [user, setUser] = useState(null);
//   const [bookings, setBookings] = useState([]);

//   useEffect(() => {
//     const storedUser = JSON.parse(localStorage.getItem("user"));
//     if (storedUser) {
//       setUser(storedUser);
//       fetchBookings(storedUser._id);
//     }
//   }, []);
  
//   const fetchBookings = async (userId) => {
//     try {
//       const res = await axios.get(`${BASE_URL}/book/${userId}`, {
//         withCredentials: true,
//       });
      
//       if (res.data.success) {
//         setBookings(res.data.data);
//       }
//     } catch (err) {
//       console.error("Failed to fetch bookings:", err);
//     }
//   };

//   if (!user) {
//     return <p className="text-center mt-10">Please log in to view your profile.</p>;
//   }

//   return (
//     <div className="max-w-4xl mx-auto p-6 mt-8 bg-white shadow-md rounded-xl">
//       {/* Profile Section */}
//       <div className="flex items-center space-x-6 border-b pb-6 mb-6">
//         <img
//           src={user.photo || "https://via.placeholder.com/150"}
//           alt="User"
//           className="w-24 h-24 rounded-full object-cover"
//         />
//         <div>
//           <h2 className="text-2xl font-semibold">{user.username}</h2>
//           <p className="text-gray-600">{user.email}</p>
//           <p className="text-gray-600">{user.mobile || "No mobile provided"}</p>
//         </div>
//       </div>

//       {/* Booking Section */}
//       <h3 className="text-xl font-semibold mb-4">Your Bookings</h3>
//       {bookings.length === 0 ? (
//         <p className="text-gray-500">You have not booked any tours yet.</p>
//       ) : (
//         <div className="grid gap-4">
//           {bookings.map((booking) => (
//             <div key={booking._id} className="border p-4 rounded-lg shadow-sm">
//               <p><strong>Tour ID:</strong> {booking.tourId}</p>
//               <p><strong>Guest Size:</strong> {booking.guestSize}</p>
//               <p><strong>Booked On:</strong> {new Date(booking.bookAt).toLocaleDateString()}</p>
//               <p><strong>Full Name:</strong> {booking.fullName}</p>
//               <p><strong>Phone:</strong> {booking.phone}</p>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default UserProfile;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/config";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
      fetchBookings(storedUser._id);
    }
  }, []);

  const fetchBookings = async (userId) => {
    try {
      const res = await axios.get(`${BASE_URL}/book/${userId}`, {
        withCredentials: true,
      });

      if (res.data.success) {
        setBookings(res.data.data);
      }
    } catch (err) {
      console.error("Failed to fetch bookings:", err);
    }
  };

  if (!user) {
    return (
      <div className="container text-center mt-5">
        <div className="alert alert-warning">Please log in to view your profile.</div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      {/* Profile Card */}
      <div className="card shadow-lg mb-5 border-0">
        <div className="card-body d-flex align-items-center">
          <img
            src={user.photo || "https://img.freepik.com/premium-photo/memoji-happy-man-white-background-emoji_826801-6837.jpg?w=740"}
            alt="User"
            className="rounded-circle me-4 border border-3 border-primary"
            width="100"
            height="100"
          />
          <div>
            <h3 className="fw-bold mb-1">{user.username}</h3>
            <p className="text-secondary mb-1">
              <i className="bi bi-envelope-fill me-2"></i>{user.email}
            </p>
          </div>
        </div>
      </div>

      {/* Bookings */}
      <h4 className="mb-4 border-bottom pb-2">Your Bookings</h4>
      {bookings.length === 0 ? (
        <div className="alert alert-info">You have not booked any tours yet.</div>
      ) : (
        <div className="row">
          {bookings.map((booking) => (
            <div key={booking._id} className="col-md-6 col-lg-4 mb-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-header bg-warning text-white fw-semibold">
                  Booking ID: {booking._id.slice(-6)}
                </div>
                <div className="card-body">
                  <p className="mb-2"><strong>Tour ID:</strong> {booking.tourId}</p>
                  <p className="mb-2"><strong>Guest Size:</strong> {booking.guestSize}</p>
                  <p className="mb-2"><strong>Booked On:</strong> {new Date(booking.bookAt).toLocaleDateString()}</p>
                  <p className="mb-2"><strong>Full Name:</strong> {booking.fullName}</p>
                  <p className="mb-0"><strong>Phone:</strong> {booking.phone}</p>
                </div>
                {/* <div className="card-footer text-end bg-light">
                  <span className="badge bg-success">Confirmed</span>
                </div> */}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserProfile;
