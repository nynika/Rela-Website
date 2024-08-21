import React, { useContext, useEffect } from "react";
import { appointmentContext } from "../ExistingPateintDetailsForm/AppointmentContextProvider";
import { Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./index.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TermsAndConditions from "../TermsAndConditions";

const AppointmentConfirmation = () => {
  const navigate = useNavigate();
  const { appointmentPage } = useContext(appointmentContext);
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
  }, [navigate, appointmentPage.patientName]);

  const handleGo = (e) => {
    e.preventDefault();
    window.scrollTo(0, 0);

    // Show a toast message indicating the confirmation
    toast.success("Appointment confirmed! You will be redirected shortly.", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 90000, // Show the toast for 10 seconds
    });

    // Delay the redirection by 10 seconds
    setTimeout(() => {
      window.location.href = "https://relainstitute.com";
    }, 90000);
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
            marginBottom: "50px",
            fontWeight: "600",
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
                    {appointmentPage.emailId}
                  </td>
                </tr>
                <tr>
                  <th>Age</th>
                  <th>: </th>
                  <td>{appointmentPage.age}</td>
                </tr>
                <tr>
                  <th>UHID</th>
                  <th>: </th>
                  <td>{appointmentPage.uhid}</td>
                </tr>
                <tr>
                  <th>Appointment ID</th>
                  <th>: </th>
                  <td>{appointmentPage.appointmentID}</td>
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
          <div>
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

        <ToastContainer
          position="top-center"
          autoClose={15000} // Show the toast for 10 seconds
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </Container>
    </>
  );
};

export default AppointmentConfirmation;
