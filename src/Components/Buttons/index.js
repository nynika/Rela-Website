import React from "react";
import "./index.css";
import { Button } from "react-bootstrap";
import BookAppointment from "../../images/Book-an-appointment.png";
import MasterHealthCheckUp from "../../images/Master-Health-CheckUp.png";
import HomeSampleCollection from "../../images/Home-sample-collection.png";
const Buttons = () => {
  return (
    <div>
      <div className="list_of_buttons margin-top2">
        <Button
          className="appointment "
          style={{
            textAlign: "center",
            borderRadius: "5px",
            position: "relative",
            // marginTop: "250px",
            padding: "10px",
          }}
          // onClick={handleClick}
        >
          <img
            src={BookAppointment}
            alt="rela-logo"
            className="image-buttons"
          />
          <span className="text">BOOK AN APPOINTMENT</span>
        </Button>
        <Button
          className="appointment margin-top0"
          style={{
            textAlign: "center",
            borderRadius: "5px",
            position: "relative",
            // marginTop: "250px",
            padding: "10px",
            backgroundColor: "#505050",
          }}
          // onClick={handleClick}
        >
          <img
            src={MasterHealthCheckUp}
            alt="rela-logo"
            className="image-buttons"
          ></img>
          <span className="text">MASTER HEALTH CHECK UP</span>
        </Button>
        <Button
          className="appointment margin-top0"
          style={{
            textAlign: "center",
            borderRadius: "5px",
            position: "relative",
            // marginTop: "250px",
            padding: "10px",
            backgroundColor: "#505050",
          }}
          // onClick={handleClick}
        >
          <img
            src={HomeSampleCollection}
            alt="rela-logo"
            className="image-buttons"
          ></img>
          <span className="text">HOME SAMPLE COLLECTION</span>
        </Button>
      </div>
    </div>
  );
};

export default Buttons;
