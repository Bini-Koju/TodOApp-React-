import React, { useEffect, useState } from "react";
import axios from "axios";

const New = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch data from the API
    axios
      .get(
        "https://api.stackexchange.com/2.3/users?order=desc&sort=reputation&site=stackoverflow&pagesize=100"
      )
      .then((response) => {
        // Filter users whose location includes "Nepal"
        const nepaliUsers = response.data.items.filter(
          (user) =>
            user.location && user.location.toLowerCase().includes("nepal")
        );
        setUsers(nepaliUsers);
      })
      .catch((error) => {
        console.error("Error fetching the data", error);
      });
  }, []);

  return (
    <div className="container mt-5 page-content">
      <h2 className="mb-4">Top Stack Overflow Users from Nepal</h2>
      <div className="list-group">
        {users.length > 0 ? (
          users.map((user) => (
            <div
              key={user.user_id}
              className="list-group-item list-group-item-action"
            >
              <div className="d-flex align-items-center">
                <img
                  src={user.profile_image}
                  alt={user.display_name}
                  className="img-thumbnail me-3"
                  style={{ width: "50px", borderRadius: "50%" }}
                />
                <div>
                  <h5 className="mb-1">{user.display_name}</h5>
                  <p className="mb-1">Reputation: {user.reputation}</p>
                  <small>{user.location}</small>
                  <br />
                  <a href={user.link} target="_blank" rel="noopener noreferrer">
                    View Profile
                  </a>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No users found from Nepal.</p>
        )}
      </div>
    </div>
  );
};

export default New;
