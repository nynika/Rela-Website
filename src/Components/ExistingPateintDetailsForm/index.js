import React, { useState, useContext, useEffect, useLayoutEffect } from "react";
import { Col, Row, Form, Container, Button } from "react-bootstrap";
import { existingPatientContext } from "../ExistingPatientContextProvider";
import { useNavigate } from "react-router-dom";
import "./index.css";
import axios from "axios";
import { appointmentContext } from "./AppointmentContextProvider";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TermsAndConditions from "../TermsAndConditions";

const ExistingPatientDetails = () => {
  const navigate = useNavigate();

  const { existingPatientData, users } = useContext(existingPatientContext);
  const { appoitmentPage, setAppointmentPage } = useContext(appointmentContext);

  // //console.log(appoitmentPage);
  const [age, setAge] = useState("");
  const [selectedUser, setSelectedUser] = useState("");
  const [listOfUserDetails, setListOfUserDetails] = useState([]);
  const [details, setDetails] = useState({
    selectedUserOtherDetails: {
      patientName: "",
      dob: "",
      uhid: "",
      gender: "",
      mobile: "",
      email: "",
      todayDate: "",
    },
  });
  const [counter, setCounter] = useState(0);

  useLayoutEffect(() => {
    users.map((data) => {
      return data.map((data) => {
        return setListOfUserDetails((prev) => [...prev, { data }]);
      });
    });
    const date = new Date();
    const Year = date.getFullYear();
    const Month = date.getMonth();
    const Dates = date.getDate();
    setDetails((prev) => ({
      ...prev,
      selectedUserOtherDetails: {
        todayDate: Year + "-" + Month + "-" + Dates, //2023-06-14
      },
    }));
  }, []);

  useEffect(() => {
    if (existingPatientData.amount === "") {
      window.scrollTo(0, 0);
      navigate("/", { replace: true });
    }
  }, []);

  useLayoutEffect(() => {
    if (selectedUser) {
      const data = listOfUserDetails.filter(
        (data) => data.data.uhid === selectedUser
      );
      // //console.log(data[0].data);

      setDetails((prev) => ({
        ...prev,
        selectedUserOtherDetails: {
          patientName: data[0].data.patientName,
          dob: data[0].data.dob,
          gender: data[0].data.gender,
          uhid: data[0].data.uhid,
          mobile: data[0].data.mobileNo,
          email: data[0].data.email,
        },
      }));
      setCounter((prev) => prev + 1);
    }
  }, [selectedUser]);

  useEffect(() => {
    if (details.selectedUserOtherDetails.dob !== "") {
      const selectedDate = new Date(details.selectedUserOtherDetails.dob);
      const ageValue = calculateAge(selectedDate);
      if (ageValue >= 0) {
        setAge(parseInt(ageValue));
        // //console.log(age);
      } else setAge(0);
    } else return;
  }, [details.selectedUserOtherDetails.dob]);

  const calculateAge = (date) => {
    const today = new Date();
    let age = today.getFullYear() - date.getFullYear();
    const monthDiff = today.getMonth() - date.getMonth();
    const dayDiff = today.getDate() - date.getDate();

    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      age--;
    }
    // //console.log(parseInt(age));
    return parseInt(age);
  };

  const handleGoRegistration = () => {
    window.scrollTo(0, 0);
    navigate("/newpatient-creation");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    var date = new Date();
    var seconds = date.getSeconds();
    var minutes = date.getMinutes();
    var hour = date.getHours();
    var year = date.getFullYear();
    var month = date.getMonth();
    var day = date.getDate();
    var sumofVal =
      day + "" + month + "" + year + "" + hour + "" + minutes + "" + seconds;
    if (counter !== 0) {
      try {
        const response = await axios.post(
          "https://www.relainstitute.in/RELAAPI/api/HIS/createAppointment_seq",
          {
            /*   UHID: details.selectedUserOtherDetails.uhid,
            DocId: existingPatientData.doctorid,
            APPStartDate:
              existingPatientData.selectDate +
              " " +
              existingPatientData.startTime,
            APPEndDate:
              existingPatientData.selectDate +
              " " +
              existingPatientData.endTime,
            Appcd: 0,
            UserId: "RIMC", */

            AppId: 0,
            UHID: details.selectedUserOtherDetails.uhid,
            DocId: existingPatientData.doctorid,
            APPDate: existingPatientData.selectDate,
            APPSeqno: existingPatientData.appseqno,
            UserId: "RIMC",
            Appcd: 0,
            PaymentType: 0,
            SlotNo: existingPatientData.slotno,
            PatientName: details.selectedUserOtherDetails.patientName,
            Salutation: "",
            MobileNo: details.selectedUserOtherDetails.mobile,
            PhoneNo1: "",
            Gender: details.selectedUserOtherDetails.gender,
            DOB: details.selectedUserOtherDetails.dob,
            Nationality: "",
            Address_1: "",
            Pincode: "",
            StateName: "",
            CountryName: "",
            CityName: "",
            Area: "",
            Payment: existingPatientData.amount,
          }
        );
        if (response.data.msgDescp !== "Conflict") {
          //console.log(response.data.uhid);
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
          if (responseWeb.data.resultCode === 1) {
            alert(
              "Appointment slot booked successfully. Don't go back or refresh the page."
            );
            window.scrollTo(0, 0);
            navigate("/appointment-confirmation", { replace: true });
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
      toast.warn(
        "Select patient's information before proceeding payment or create new patient id.",
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
  };
  // //console.log(selectedUser);

  const handleSubmit2 = async (e) => {
    e.preventDefault();
    var date = new Date();
    var seconds = date.getSeconds();
    var minutes = date.getMinutes();
    var hour = date.getHours();
    var year = date.getFullYear();
    var month = date.getMonth();
    var day = date.getDate();
    var sumofVal =
      day + "" + month + "" + year + "" + hour + "" + minutes + "" + seconds;
    if (counter !== 0) {
      try {
        const createAppointment_seq = await axios.post(
          "https://www.relainstitute.in/RELAAPI/api/HIS/createAppointment_seq",
          {
            /*   UHID: details.selectedUserOtherDetails.uhid,
            DocId: existingPatientData.doctorid,
            APPStartDate:
              existingPatientData.selectDate +
              " " +
              existingPatientData.startTime,
            APPEndDate:
              existingPatientData.selectDate +
              " " +
              existingPatientData.endTime,
            Appcd: 0,
            UserId: "RIMC",
            Appcd: 0, */
            AppId: 0,
            UHID: details.selectedUserOtherDetails.uhid,
            DocId: existingPatientData.doctorid,
            APPDate: existingPatientData.selectDate,
            APPSeqno: existingPatientData.appseqno,
            UserId: "RIMC",
            Appcd: 0,
            PaymentType: 0,
            SlotNo: existingPatientData.slotno,
            PatientName: details.selectedUserOtherDetails.patientName,
            Salutation: "",
            MobileNo: details.selectedUserOtherDetails.mobile,
            PhoneNo1: "",
            Gender: details.selectedUserOtherDetails.gender,
            DOB: details.selectedUserOtherDetails.dob,
            Nationality: "",
            Address_1: "",
            Pincode: "",
            StateName: "",
            CountryName: "",
            CityName: "",
            Area: "",
            Payment: existingPatientData.amount,
          }
        );
        if (createAppointment_seq.data.msgDescp !== "Conflict") {
          const response = await axios.post(
            "https://www.relainstitute.in/relalive/api/HIS/updateOnlinePayment",
            {
              RefID: sumofVal,
              RefType: "Appointment",
              PatientID: details.selectedUserOtherDetails.uhid,
              PatientName: details.selectedUserOtherDetails.patientName,
              MobileNo: details.selectedUserOtherDetails.mobile,
              EmailID: "rela@gmail.com",
              DoctorID: existingPatientData.doctorid,
              TransactionDate:
                new Date().getFullYear() +
                "-" +
                new Date().getDate() +
                "-" +
                parseInt(new Date().getMonth() + 1),
              TransactionID: "",
              TransactionAmount: existingPatientData.amount,
              PaymentMode: "",
              StatusCode: "",
              StatusMsg: "",
              PaymentStatus: "Pending",
              Remarks: "",
              IsActiveflg: 0,
              CreatedCode: "MEFTEC",
              //    APPStartDate: existingPatientData.selectDate,
              //    APPEndDate: existingPatientData.startTime,
              AppointmentId: createAppointment_seq.data.appointmentID,
            }
          );
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
          //console.log(responseWeb);
          if (response.data) {
            alert(
              "Appointment slot booked successfully. Don't go back or refresh the page."
            );

            if (
              existingPatientData.uhid !== " " &&
              existingPatientData.name !== "" &&
              existingPatientData.amount !== ""
            ) {
              //DataAgies_Appointment_OldPat
              window.location.href = `http://180.235.120.78/Appointment_PayAtHospital/?PatientID=${details.selectedUserOtherDetails.uhid}&PatientName=${details.selectedUserOtherDetails.patientName}&chargerate=${existingPatientData.amount}&email=prabha@gmail.com&mobileno=${details.selectedUserOtherDetails.mobile}&processingid=${sumofVal}`;
            }
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
      toast.warn(
        "Select patient's information before proceeding payment or create new patient id.",
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
            // marginTop: "250px",
            padding: "10px",
          }}
          className="margin-top1"
        >
          <h2 className="absolute">
            Hello {details.selectedUserOtherDetails.patientName}
          </h2>
          <Row>
            <Form.Group as={Col} controlId="salutation" className="input-label">
              <Form.Label className="label">
                UHID Number<span className="mandatory">*</span>
              </Form.Label>
              <div className="patient-flex">
                <Form.Select
                  required
                  size="md"
                  className="inputs select"
                  readOnly
                  value={selectedUser}
                  onChange={(event) => setSelectedUser(event.target.value)}
                >
                  <option
                    disabled
                    value={""}
                    style={{ color: "#f3a01c", fontWeight: "600" }}
                  >
                    Select the Patient's UHID
                  </option>
                  {listOfUserDetails.length && (
                    <>
                      {listOfUserDetails.map((data, i) => {
                        return (
                          <>
                            <option
                              key={data.data.uhid}
                              value={data.data.uhid}
                              style={{ color: "#f3a01c", fontWeight: "600" }}
                            >
                              {data.data.uhid} & {data.data.patientName}
                            </option>
                          </>
                        );
                      })}
                    </>
                  )}
                </Form.Select>
                <h6
                  onClick={handleGoRegistration}
                  style={{
                    color: "#f3a01c",
                    textDecoration: "underline",
                    fontWeight: "bold",
                  }}
                >
                  Create New Patient .Id
                </h6>
              </div>
            </Form.Group>
          </Row>
          <Row className="mb-5 mt-5 left">
            <Form.Group as={Col} className="input-label">
              <Form.Label className="label">
                Patient Name<span className="mandatory">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                required
                size="md"
                className="inputs select"
                readOnly
                defaultValue={details.selectedUserOtherDetails.patientName}
                inputMode="text"
                pattern="[A-Za-z]+"
                placeholder="Patient's Name"
              />
            </Form.Group>
            <Form.Group as={Col} className="input-label">
              <Form.Label className="label">
                DOB<span className="mandatory">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                required
                size="md"
                className="inputs select"
                inputMode="text"
                pattern="[A-Za-z]+"
                readOnly
                defaultValue={details.selectedUserOtherDetails.dob}
                placeholder="Patient's DOB"
              />
            </Form.Group>
            <Form.Group as={Col} className="input-label">
              <Form.Label className="label">
                Age<span className="mandatory">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                required
                size="md"
                className="inputs select"
                readOnly
                value={age}
                inputMode="text"
                // pattern="[A-Za-z]+"
                placeholder="Patient's Age"
              />
            </Form.Group>
          </Row>
          <Row className="mb-5 mt-5 left">
            <Form.Group as={Col} controlId="salutation" className="input-label">
              <Form.Label className="label">
                Gender<span className="mandatory">*</span>
              </Form.Label>
              <Form.Control
                required
                size="md"
                className="inputs select"
                readOnly
                defaultValue={details.selectedUserOtherDetails.gender}
                placeholder="Patient's Gender"
              ></Form.Control>
            </Form.Group>
            <Form.Group as={Col} className="input-label">
              <Form.Label className="label">
                Department<span className="mandatory">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                required
                size="md"
                className="inputs select"
                readOnly
                defaultValue={existingPatientData.department}
                inputMode="text"
                pattern="[A-Za-z]+"
              />
            </Form.Group>
            <Form.Group as={Col} className="input-label">
              <Form.Label className="label">
                Doctor Name<span className="mandatory">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                required
                size="md"
                className="inputs select"
                inputMode="text"
                pattern="[A-Za-z]+"
                readOnly
                defaultValue={existingPatientData.doctor}
              />
            </Form.Group>
          </Row>
          <Row className="mb-5 mt-5 left">
            <Form.Group as={Col} className="input-label">
              <Form.Label className="label">
                Booking Date<span className="mandatory">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                required
                size="md"
                className="inputs select"
                inputMode="text"
                pattern="[A-Za-z]+"
                readOnly
                defaultValue={existingPatientData.selectDate}
              />
            </Form.Group>
            <Form.Group as={Col} controlId="salutation" className="input-label">
              <Form.Label className="label">
                Selected Time<span className="mandatory">*</span>
              </Form.Label>
              <Form.Control
                required
                size="md"
                className="inputs select"
                readOnly
                defaultValue={existingPatientData.selectTime}
              ></Form.Control>
            </Form.Group>
            <Form.Group as={Col} className="input-label">
              <Form.Label className="label">
                Amount<span className="mandatory">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                required
                size="md"
                className="inputs select"
                readOnly
                defaultValue={existingPatientData.amount}
                inputMode="text"
                pattern="[A-Za-z]+"
              />
            </Form.Group>
          </Row>
          <div className="consent" style={{ paddingTop: "10px" }}>
            <div>
              <Button
                className="primary button-submit"
                type="button"
                // onClick={handleSubmit2}
                // style={{ width: "250px", height: "60px",fontWeight:"600" }}
                // disabled={isSubmitting2}
                onClick={(e) => handleSubmit2(e)}
              >
                <div>{false ? "Submitting..." : "Pay Online"} </div>
                <div>(Save 20 mins waiting time)</div> {}
              </Button>
            </div>
            <div>
              <Button
                className="primary button-submit"
                type="button"
                onClick={handleSubmit}
                // style={{ width: "250px", height: "60px",fontWeight:"600" }}
                // disabled={isSubmitting}
              >
                {false ? "Submitting..." : "Pay at Hospital"}
              </Button>
            </div>
          </div>
          <section style={{ color: "#f3a01c" }}>
            <div style={{ fontWeight: "600" }}>Disclaimer:</div>
            <div style={{ fontWeight: "600" }}>
              For new patient registration, please carry all your original
              documents at the time of hospital visit.
            </div>
          </section>
        </div>
        <div style={{ marginBottom: "20px" }}></div>

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
      </Container>
      {/* <TermsAndConditions /> */}
    </>
  );
};

export default ExistingPatientDetails;
