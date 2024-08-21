import React, { useContext, useEffect, useState } from "react";
import { Col, Row, Form, Container, Button } from "react-bootstrap";
import { newPatientContext } from "../NewPatientContextProvider";
import { useNavigate } from "react-router-dom";
import "./index.css";
import axios from "axios";
import { newPatientAppointmentContext } from "./NewPatientAppointmentContextProvider";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const NewPatientDetails = () => {
  const navigate = useNavigate();
  const [gen, setGen] = useState("");
  const [state, setState] = useState("");
  const { newPatientData } = useContext(newPatientContext);
  // //console.log(newPatientData);
  const { setAppointmentPage } = useContext(newPatientAppointmentContext);

  useEffect(() => {
    if (newPatientData.amount === "") {
      window.scrollTo(0, 0);
      navigate("/", { replace: true });
    }
  }, []);

  const handleSubmit = async () => {
    var date = new Date();
    var seconds = date.getSeconds();
    var minutes = date.getMinutes();
    var hour = date.getHours();
    var year = date.getFullYear();
    var month = date.getMonth();
    var day = date.getDate();
    var sumofVal =
      day + "" + month + "" + year + "" + hour + "" + minutes + "" + seconds;
    if (
      newPatientData.uhid !== " " ||
      newPatientData.name !== "" ||
      newPatientData.amount !== ""
    ) {
      try {
        const response = await axios.post(
          "http://relainstitute.in/RELAAPI/api/HIS/createAppointment_seq",
          {
            PatientName: newPatientData.name,
            Salutation: newPatientData.salutation,
            MobileNo: newPatientData.mobile,
            PhoneNo1: "",
            DocId: newPatientData.doctorid,
            APPDate: newPatientData.selectDate,
            APPSeqno: newPatientData.appseqno,
            Appcd: 0,
            PaymentType: 0,
            SlotNo: newPatientData.slotno,
            Gender: newPatientData.gender,
            UserId: "RIMC",
            DOB: newPatientData.dob,
            Nationality: newPatientData.nationality,
            Address_1: newPatientData.address1,
            Pincode: newPatientData.pincode,
            StateName: newPatientData.statename,
            CountryName: newPatientData.country,
            CityName: newPatientData.cityname,
            Area: newPatientData.area,
          }
        );

        if (response.data.msgDescp !== "Conflict") {
          // //console.log(response.data);
          setAppointmentPage((prev) => ({
            ...prev,
            sno: response.data.sno,
            msgDescp: response.data.msgDescp,
            appointmentID: response.data.appointmentID,
            patientName: response.data.patientName,
            age: response.data.age,
            uhid: response.data.uhid,
            doctorName: response.data.doctorName,
            appointmentDate: response.data.appointmentDate,
            timeSlot: response.data.timeSlot,
            emailId: response.data.emailId,
          }));

          const responseWeb = await axios.post(
            "https://www.relainstitute.in/relalive/api/HIS/WebApi_OTP_Log",
            {
              RefId: sumofVal,
              PaymentStatus: "Offline",
              AppointmentId: response.data.appointmentID,
              PatientType: "Old",
              UHID: response.data.uhid,
            }
          );
          const resultCode = responseWeb.data.resultCode;
          if (resultCode === 1) {
            alert(
              "Appointment slot booked successfully. Don't go back or click exit button."
            );
            window.scrollTo(0, 0);
            navigate("/newappointment-confirmation", { replace: true });
          }
        } else {
          toast.info(
            "This slot already booked. Please try again with different slot.",
            {
              position: "top-center",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            }
          );
        }
      } catch (error) {
        //console.log(error);
        if (error.isAxiosError) {
          // Axios network error
          if (error.response) {
            //console.log(error.response.data);
            //console.log(error.response.status);
            //console.log(error.response.headers);
            toast.error("Request error occurred. Please try again.", {
              position: toast.POSITION.TOP_CENTER,
              autoClose: 3000,
            });
          } else if (error.request) {
            //console.log(error.request);
            toast.error(
              "No response received from the server. Please check your network connection.",
              {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 3000,
              }
            );
          } else {
            //console.log("Error", error.message);
            toast.error("An error occurred. Please try again later.", {
              position: toast.POSITION.TOP_CENTER,
              autoClose: 3000,
            });
          }
        } else {
          // Other non-Axios errors
          toast.error("An error occurred. Please try again later.", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000,
          });
        }
      }
    } else {
      alert("Unable to proceed the payment, Please try again after some time.");
    }
  };

  const handleSubmit2 = async () => {
    var date = new Date();
    var seconds = date.getSeconds();
    var minutes = date.getMinutes();
    var hour = date.getHours();
    var year = date.getFullYear();
    var month = date.getMonth();
    var day = date.getDate();
    var sumofVal =
      day + "" + month + "" + year + "" + hour + "" + minutes + "" + seconds;
    let getPayment = async () => {
      await axios.post(
        "https://www.relainstitute.in/relalive/api/HIS/updateOnlinePayment",
        {
          RefID: sumofVal,
          RefType: "Appointment",
          PatientID: newPatientData.uhid,
          PatientName: newPatientData.name,
          MobileNo: newPatientData.mobile,
          EmailID: newPatientData.email,
          DoctorID: newPatientData.doctorid,
          TransactionDate:
            new Date().getFullYear() +
            "-" +
            new Date().getMonth() +
            1 +
            "-" +
            new Date().getDate(),
          TransactionID: "",
          TransactionAmount: newPatientData.amount + 100,
          PaymentMode: "",
          StatusCode: "",
          StatusMsg: "",
          PaymentStatus: "Pending",
          Remarks: "",
          IsActiveflg: 0,
          CreatedCode: "MEFTEC",
          APPStartDate: newPatientData.selectDate,
          APPEndDate: newPatientData.startTime,
        }
      );
    };
    let getWebAPIOTP = async () => {
      await axios.post(
        "https://www.relainstitute.in/relalive/api/HIS/WebApi_OTP_Log",
        {
          RefId: sumofVal,
          PaymentStatus: "Online",
          AppointmentId: 0,
          PatientType: "New",
          UHID: newPatientData.uhid,
        }
      );
    };
    let getAppointment = async () => {
      try {
        const response = await axios.post(
          "http://relainstitute.in/RELAAPI/api/HIS/createAppointment_seq",
          {
            PatientName: newPatientData.name,
            Salutation: newPatientData.salutation,
            MobileNo: newPatientData.mobile,
            PhoneNo1: "",
            DocId: newPatientData.doctorid,
            APPDate: newPatientData.selectDate,
            APPSeqno: newPatientData.appseqno,
            Appcd: 0,
            PaymentType: 0,
            SlotNo: newPatientData.slotno,
            Gender: newPatientData.gender,
            UserId: "RIMC",
            DOB: newPatientData.dob,
            Nationality: newPatientData.nationality,
            Address_1: newPatientData.address1,
            Pincode: newPatientData.pincode,
            StateName: newPatientData.statename,
            CountryName: newPatientData.country,
            CityName: newPatientData.cityname,
            Area: newPatientData.area,
          }
        );
        const data = response;
        // //console.log(data);
        if (data.data.msgDescp !== "Conflict") {
          alert(
            "Appointment slot booked successfully. Don't go back or refresh the page. You'll be redirected to the payment portal."
          );

          window.location.href = `http://180.235.120.78/NewPat_Appointment/?PatientID=${
            newPatientData.uhid
          }&PatientName=${newPatientData.name}&chargerate=${
            parseInt(newPatientData.amount) + 100
          }&email=${newPatientData.email}&mobileno=${
            newPatientData.mobile
          }&processingid=${sumofVal}`;
          // https://salucro.co.in/patient/app/payments
        } else {
          toast.info(
            "This slot already booked. Please try again with different slot.",
            {
              position: "top-center",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            }
          );
        }
      } catch (error) {
        handleAxiosError(error);
      }
    };
    const handleAxiosError = (error) => {
      //console.log(error);
      if (error.isAxiosError) {
        // Axios network error
        if (error.response) {
          //console.log(error.response.data);
          //console.log(error.response.status);
          //console.log(error.response.headers);
          toast.error("Request error occurred. Please try again.", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000,
          });
        } else if (error.request) {
          //console.log(error.request);
          toast.error(
            "No response received from the server. Please check your network connection.",
            {
              position: toast.POSITION.TOP_CENTER,
              autoClose: 3000,
            }
          );
        } else {
          //console.log("Error", error.message);
          toast.error("An error occurred. Please try again later.", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000,
          });
        }
      } else {
        // Other non-Axios errors
        toast.error("An error occurred. Please try again later.", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
        });
      }
    };
    if (
      newPatientData.uhid !== " " &&
      newPatientData.name !== "" &&
      newPatientData.amount !== ""
    ) {
      try {
        await Promise.all([getWebAPIOTP(), getAppointment(), getPayment()]);
      } catch (error) {
        //console.log(error);
        handleAxiosError(error);
      }
    } else {
      alert("Error occured.");
    }
  };
  return (
    <Container>
      <div
        style={{
          textAlign: "left",
          border: "1px solid black",
          borderRadius: "5px",
          position: "relative",
          // marginTop: "250px",
          padding: "10px",
        }}
        className="margin-top1"
      >
        <h2 className="absolute">Hello {newPatientData.name}</h2>
        <Row>
          <Form.Group className="input-label" as={Col} controlId="salutation">
            <Form.Label className="label">
              UHID Number<span className="mandatory">*</span>
            </Form.Label>
            <Form.Control
              required
              size="md"
              readOnly
              value={newPatientData.uhid + " " + newPatientData.name}
              className="inputs"
            ></Form.Control>
          </Form.Group>
        </Row>
        <Row className="mb-5 mt-5 left">
          <Form.Group className="input-label" as={Col}>
            <Form.Label className="label">
              Patient Name<span className="mandatory">*</span>
            </Form.Label>
            <Form.Control
              type="text"
              required
              size="md"
              className="inputs"
              readOnly
              value={newPatientData.name}
              inputsMode="text"
              pattern="[A-Za-z]+"
              placeholder="Patient's Name"
            />
          </Form.Group>
          <Form.Group className="input-label" as={Col}>
            <Form.Label className="label">
              DOB<span className="mandatory">*</span>
            </Form.Label>
            <Form.Control
              type="text"
              required
              size="md"
              className="inputs"
              inputsMode="text"
              pattern="[A-Za-z]+"
              readOnly
              value={newPatientData.dob}
              placeholder="Patient's DOB"
            />
          </Form.Group>
          <Form.Group className="input-label" as={Col}>
            <Form.Label className="label">
              Age<span className="mandatory">*</span>
            </Form.Label>
            <Form.Control
              type="text"
              required
              size="md"
              className="inputs"
              readOnly
              value={newPatientData.age}
              inputsMode="text"
              pattern="[A-Za-z]+"
              placeholder="Patient's Age"
            />
          </Form.Group>
        </Row>
        <Row className="mb-5 mt-5 left">
          <Form.Group className="input-label" as={Col} controlId="salutation">
            <Form.Label className="label">
              Gender<span className="mandatory">*</span>
            </Form.Label>
            <Form.Control
              required
              size="md"
              className="inputs"
              readOnly
              value={newPatientData.gender}
              placeholder="Patient's Gender"
            ></Form.Control>
          </Form.Group>
          <Form.Group className="input-label" as={Col}>
            <Form.Label className="label">
              Department<span className="mandatory">*</span>
            </Form.Label>
            <Form.Control
              type="text"
              required
              size="md"
              className="inputs"
              readOnly
              value={newPatientData.department}
              inputsMode="text"
              pattern="[A-Za-z]+"
            />
          </Form.Group>
          <Form.Group className="input-label" as={Col}>
            <Form.Label className="label">
              Doctor Name<span className="mandatory">*</span>
            </Form.Label>
            <Form.Control
              type="text"
              required
              size="md"
              className="inputs"
              inputsMode="text"
              pattern="[A-Za-z]+"
              readOnly
              value={newPatientData.doctor}
            />
          </Form.Group>
        </Row>
        <Row className="mb-5 mt-5 left">
          <Form.Group className="input-label" as={Col}>
            <Form.Label className="label">
              Booking Date<span className="mandatory">*</span>
            </Form.Label>
            <Form.Control
              type="text"
              required
              size="md"
              className="inputs"
              inputsMode="text"
              pattern="[A-Za-z]+"
              readOnly
              value={newPatientData.selectDate}
            />
          </Form.Group>

          <Form.Group className="input-label" as={Col} controlId="salutation">
            <Form.Label className="label">
              Selected Time<span className="mandatory">*</span>
            </Form.Label>
            <Form.Control
              required
              size="md"
              className="inputs"
              readOnly
              value={newPatientData.selectTime}
            ></Form.Control>
          </Form.Group>

          <Form.Group className="input-label" as={Col}>
            <Form.Label className="label">
              Amount<span className="mandatory">*</span>
            </Form.Label>
            <Form.Control
              type="text"
              required
              size="md"
              className="inputs"
              readOnly
              value={parseInt(newPatientData.amount) + 100}
              inputsMode="text"
              pattern="[A-Za-z]+"
            />
          </Form.Group>
        </Row>
        <div
          className="consent"
          style={{ paddingTop: "10px", marginBottom: "20px" }}
        >
          <div>
            <Button
              className="primary button-submit"
              type="button"
              onClick={handleSubmit2}
            >
              {false ? "Submitting..." : "Pay Online"}
              <div>(Save 20 mins waiting time)</div> {}
            </Button>
          </div>
          <div>
            <Button
              className="primary button-submit"
              onClick={handleSubmit}

              // disabled={isSubmitting}
            >
              {false ? "Submitting..." : "Pay at Hospital"}
            </Button>
          </div>
        </div>
      </div>

      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div style={{ marginBottom: "20px" }}></div>
    </Container>
  );
};

export default NewPatientDetails;
