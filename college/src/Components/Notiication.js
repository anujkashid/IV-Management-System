import React, { useEffect, useState } from "react";
import axios from "axios";
import ColHeader from "./Navbar";

const Notification = () => {
  const [visitData, setVisitData] = useState([]);
  const collegename = localStorage.getItem("CollegeName");

  // Fetch visit data
  useEffect(() => {
    axios
      .get("http://localhost:8000/getvisit")
      .then((response) => {
        const today = new Date().toISOString().split("T")[0];
        const filteredData = response.data.userData.filter(
          (visit) =>
            visit.college_name === collegename &&
            visit.Date_of_visit >= today &&
            visit.notification_status !== "seen"
        );
        setVisitData(filteredData);
      })
      .catch((error) => {
        console.error("Error fetching visit data:", error);
      });
  }, [collegename]);

  const handleSeen = (id) => {
    const fetchData = { notification_status: "seen" };
    axios
      .put(`http://localhost:8000/updatevisit/${id}`, fetchData)
      .then(() => {
        // Optionally, update state to reflect changes immediately without refetching
        setVisitData(prevState =>
          prevState.map(visit =>
            visit._id === id
              ? { ...visit, notification_status: "seen" }
              : visit
          )
        );
      })
      .catch((err) => {
        console.error("Error updating notification status:", err);
      });
  };

  return (
    <div className="h-100 vh-100" style={{ backgroundColor: "#EEEEFF" }}>
      <ColHeader />
      <div className="container mt-4">
        <h3 className="text-center mb-4 text-danger">Notifications</h3>
        {visitData.length === 0 ? (
          <p>No notifications to display.</p>
        ) : (
          visitData.map((visit) => {
            const visitDate = new Date(visit.Date_of_visit)
              .toISOString()
              .split("T")[0];
            return (
              <div
                key={visit.id}
                className="alert alert-primary d-flex justify-content-between align-items-center"
              >
                <div>
                  {visit.Visit_accept === "accept" ? (
                    <p>
                      Your visit on <strong>{visitDate}</strong> has been accepted.
                    </p>
                  ) : visit.Visit_accept === "reject" ? (
                    <p>
                      Your visit on <strong>{visitDate}</strong> has been rejected.
                      <br />
                      Reason: <strong>{visit.reason}</strong>
                    </p>
                  ) : (
                    <p>
                      Pending status for your visit on {visitDate}.
                      <br />
                      Pay fees {visit.fees} to confirm visit.
                    </p>
                  )}
                </div>

                <button
                  className="btn btn-success btn-md"
                  onClick={() => handleSeen(visit._id)}
                  disabled={visit.Visit_accept !== "accept" && visit.Visit_accept !== "reject"}
                >
                  Seen
                </button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Notification;
