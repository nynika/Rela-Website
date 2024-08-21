import React, { useContext, useEffect } from "react";
import { Button, Container, ListGroup, ListGroupItem } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./index.css";
import { newPatientAppointmentContext } from "../NewPatientDetailsForm/NewPatientAppointmentContextProvider";
import { newPatientContext } from "../NewPatientContextProvider";
const NewAppointmentConfirmation = () => {
  const navigate = useNavigate();

  const { appointmentPage } = useContext(newPatientAppointmentContext);
  const { newPatientData } = useContext(newPatientContext);
  // console.log(newPatientData);
  // console.log(appointmentPage);

  useEffect(() => {
    const handlePopState = () => {
      window.scrollTo(0, 0);
      navigate("/", { replace: true });
    };
    window.onpopstate = handlePopState;
    return () => {
      window.onpopstate = null;
    };
  }, [navigate]);

  useEffect(() => {
    if (appointmentPage.patientName === "") {
      window.scrollTo(0, 0);
      navigate("/", { replace: true });
    }
  }, [appointmentPage.patientName]);

  const handleGo = (e) => {
    e.preventDefault();
    window.scrollTo(0, 0);
    window.location.href = "https://relainstitute.com";
  };
  return (
    <>
      <Container>
        <div
          style={{
            textAlign: "left",
            border: "1px solid black",
            borderRadius: "5px",
            position: "relative",
            padding: "10px",
            // marginTop: "250px",
            marginBottom: "50px",
          }}
          className="margin-top1"
        >
          <h1 className="absolute">Appointment Confirmation </h1>
          <div>
            <h6 style={{ margin: "10px", fontWeight: "600" }}>
              Dear <span className="color">{appointmentPage.patientName}</span>,
              your appointment with{" "}
              <span className="color">{appointmentPage.doctorName}</span> is
              scheduled on{" "}
              <span className="color">{appointmentPage.appointmentDate}</span>{" "}
              at <span className="color">{appointmentPage.timeSlot}</span>.
            </h6>
          </div>
          <div>
            <table>
              <thead>
                <tr>
                  <th>Patient Name</th>
                  <th>: </th>
                  <td
                    style={{
                      maxWidth: "100px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {appointmentPage.patientName}
                  </td>
                </tr>
                <tr>
                  <th>Email</th>
                  <th>: </th>
                  <td
                    style={{
                      maxWidth: "20px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {newPatientData.email}
                  </td>
                </tr>
                <tr>
                  <th>Age</th>
                  <th>: </th>
                  <td>{newPatientData.age}</td>
                </tr>
                <tr>
                  <th>UHID</th>
                  <th>: </th>
                  <td>{newPatientData.uhid}</td>
                </tr>
                <tr>
                  <th>Appointment ID</th>
                  <th>: </th>
                  <td> {appointmentPage.appointmentID}</td>
                </tr>
                <tr>
                  <th>Appointment Status</th>
                  <th>: </th>
                  <td>{appointmentPage.msgDescp}</td>
                </tr>
                <tr>
                  <th>Doctor Name</th>
                  <th>: </th>
                  <td>{appointmentPage.doctorName}</td>
                </tr>
                <tr>
                  <th>Appointment Date</th>
                  <th>: </th>
                  <td>{appointmentPage.appointmentDate}</td>
                </tr>
                <tr>
                  <th>Appointment Slot</th>
                  <th>: </th>
                  <td>{appointmentPage.timeSlot}</td>
                </tr>
              </thead>
            </table>
          </div>
          <div style={{ fontWeight: "600" }}>
            The confirmation of your appointment along with the QR code has been
            sent to your registered email id and your mobile number via
            whatsapp.
          </div>
          <div style={{ textAlign: "right" }}>
            <Button
              style={{ width: "100px" }}
              className="button"
              onClick={handleGo}
            >
              Return
            </Button>
          </div>
        </div>
      </Container>
    </>
  );
};

export default NewAppointmentConfirmation;
