import React from "react";
import Navbar from "./Navbar";
import { Row, Col } from "reactstrap";

const Home = () => {
  return (
    <>
      <div className="w-auto vh-100 position-relative">
        <div className="bg-blur position-absolute top-0 end-0 w-100 h-100 "></div>
        <Navbar />
        <Row>
          <Col md={6}>
            <div className=" typewriter  p-5 px-3 my-2 my-md-5 ">
              <p
                className="fs-1  fw-bold text-center py-2 py-md-5  "
                style={{ fontFamily: "Georgia, Times New Roman, Times, serif" }}
              >
                "The key is not to prioritize what’s on your schedule, but to
                schedule your priorities." <br />{" "}
                <i className="fw-lighter">Stephen Covey</i>
              </p>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Home;
