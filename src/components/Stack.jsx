import React, { useEffect, useState } from "react";
import { Row, Col } from "reactstrap";

const StackOverflow = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalReputation, setTotalReputation] = useState(0);

  useEffect(() => {
    if (!loading) {
      return;
    }
    const targetUrl =
      "https://api.stackexchange.com/2.3/users?order=desc&sort=reputation&site=stackoverflow";

    fetch(targetUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `Network response was not ok: ${response.statusText}`
          );
        }
        return response.json();
      })
      .then((data) => {
        setUsers(data.items);
        setLoading(false);

        // Calculate the total reputation
        const totalReputation = data.items.reduce(
          (sum, user) => sum + user.reputation,
          0
        );
        setTotalReputation(totalReputation);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, [loading]);

  const getAlignmentStyle = (index) => {
    switch (index % 3) {
      case 0:
        return { textAlign: "left" };
      case 1:
        return { textAlign: "center" };
      case 2:
        return { textAlign: "right" };
      default:
        return {};
    }
  };

  const getBackgroundColorStyle = (index) => {
    // Set background color to pink for every fourth item
    if ((index + 1) % 4 === 0) {
      return { backgroundColor: "pink" };
    }
    return {};
  };

  const getReputationPercentage = (reputation) => {
    if (totalReputation === 0) return 0;
    return ((reputation / totalReputation) * 100).toFixed(2); // Display as percentage with 2 decimal places
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Top Stack Overflow Users</h2>
      {/* Display the total reputation */}
      <h4 className="mb-4">Total Reputation: {totalReputation}</h4>
      <Row>
        {users.map((user, index) => (
          <Col key={user.user_id} md={4} className="mb-4">
            <div
              className="list-group-item list-group-item-action"
              style={{
                ...getAlignmentStyle(index), // Apply alignment styles
                ...getBackgroundColorStyle(index), // Apply background color styles
              }}
            >
              <div className="d-flex align-items-center">
                <div>
                  <h5 className="mb-1">
                    SN: {index + 1} - {user.display_name}
                  </h5>
                  <p className="mb-1">Reputation: {user.reputation}</p>
                  {/* Display the reputation percentage */}
                  <small>
                    {user.location} - {getReputationPercentage(user.reputation)}%
                  </small>
                  <br />
                </div>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default StackOverflow;
