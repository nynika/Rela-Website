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
  const navigate = useNavigate();;
  const { setAppointmentPage } = useContext(newPatientAppointmentContext);
  const { newPatientData, setNewPatientData } = useContext(newPatientContext);
  const [appointmentID, setAppointmentID] = useState("");


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
          // 1. First check if the slot is available by calling the Get_AvlSlotValidation API
      const slotValidationResponse = await axios.get(
        `https://www.relainstitute.in/relalive/api/HIS/Get_AvlSlotValidation?DocId=${newPatientData.doctorid}&APPDate=${newPatientData.selectDate}&SlotNo=${newPatientData.slotno}`
      );

      // If the response contains an appointment ID, the slot is already booked
      if (slotValidationResponse.data.length > 0) {
        toast.info(
          "This slot has already been booked. Please try selecting a different slot.",
          {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          }
        );
        return; // Exit the function if the slot is already booked
      }

      // 2. If the slot is available, proceed with creating the appointment
          const response = await axios.post(
            "https://www.relainstitute.in/relalive/api/HIS/createAppointment_seq",
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
            console.log(response.appointmentID);
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
          
          if (error.isAxiosError) {
            if (error.response) {
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
      var sumofVal = `${date.getDate()}${date.getMonth()}${date.getFullYear()}${date.getHours()}${date.getMinutes()}${date.getSeconds()}`;
    
      const getPayment = async (appointmentID) => {
      console.log("Appointment ID: ", appointmentID);
      
 if (!appointmentID) {
        console.error("No appointment ID provided for payment.");
        return; // Exit the function if there is no appointmentID.
    }
      const response = await axios.post(
        "https://www.relainstitute.in/relalive/api/HIS/updateOnlinePayment",
        {
          RefID: sumofVal,
          RefType: "AppointmentNew",
          PatientID: newPatientData.uhid,
          PatientName: newPatientData.name,
          MobileNo: newPatientData.mobile,
          EmailID: newPatientData.email,
          DoctorID: newPatientData.doctorid,
          TransactionDate: new Date().toISOString().split("T")[0], 
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
          AppointmentId: appointmentID, 
        }
      );
      console.log("Payment Response: ", response.data); 
    } 

    
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
          
        // 1. First check if the slot is available by calling the Get_AvlSlotValidation API
      const slotValidationResponse = await axios.get(
        `https://www.relainstitute.in/relalive/api/HIS/Get_AvlSlotValidation?DocId=${newPatientData.doctorid}&APPDate=${newPatientData.selectDate}&SlotNo=${newPatientData.slotno}`
      );

      // If the response contains an appointment ID, the slot is already booked
      if (slotValidationResponse.data.length > 0) {
        toast.info(
          "This slot has already been booked. Please try selecting a different slot.",
          {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          }
        );
        return; // Exit the function if the slot is already booked
      }

      // 2. If the slot is available, proceed with creating the appointment
          const response = await axios.post(
            "https://www.relainstitute.in/relalive/api/HIS/createAppointment_seq",
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
      
          const data = response.data;
          console.log("API Response: ", data);
      
          if (data.msgDescp !== "Conflict") {
            const appointmentID = data.appointmentID;
            setAppointmentID(appointmentID); // Store for future use
            await handlePaymentRedirect(appointmentID);
            toast.info("Appointment slot booked successfully. Don't go back or refresh the page. You'll be redirected to the payment portal.", {
              position: toast.POSITION.TOP_CENTER,
              autoClose: 3000,
            }
          );
        //  handlePaymentRedirect(appointmentID);
        } else {
            toast.info("This slot already booked. Please try again with a different slot.", {
              position: toast.POSITION.TOP_CENTER,
              autoClose: 3000,
            });
          }
        } catch (error) {
          handleAxiosError(error);
        }
      };

      const handlePaymentRedirect = async (appointmentID) => {
        const patientData = newPatientData;
        console.log("Patient Data Before Payment Redirect:", patientData);
        getPayment(appointmentID);

    const processingId = patientData.processingId || sumofVal;
   //const chargeRate = parseInt(patientData.amount);
   const chargeRate = parseInt(patientData.amount) + 100;

    if (!appointmentID) {
      toast.error("Appointment ID not available. Please try again.", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });
      return;
    }

    const payload = {
          PatientID: patientData.uhid,
          PatientName: patientData.name,
          AppointmentId: appointmentID,
          chargeRate: chargeRate,
          email: patientData.email,
          mobileno: patientData.mobile,
          processingid: processingId,
    
          token: JSON.stringify({
            auth: {
              user: "jrsuperspecialityadmin",
              key: "uwVoleGcWIHfgUwgmOMYR8lgx1G7gCz6"
            },
            username: "Patient",
            accounts: [{
              patient_name: patientData.name,
              account_number: `UHID${patientData.uhid}`,
              amount: chargeRate, 
              email: patientData.email,
              phone: patientData.mobile
            }],
            processing_id: processingId,
            paymode: "",
            transaction_type: "",
            package_code: "",
            appointment_id: appointmentID, 
            payment_location: "Rela Hospital",
            return_url: "https://www.relainstitute.in/his_payment/Forms/payment_result_live.aspx",
            response_url: "https://www.relainstitute.in/his_payment/Forms/payment_result_live.aspx"
          }),
    
          mid: "KkZma9ph",
          check_sum_hash: "NjgwMTljZTI5ZTA3ZjRmMmIyZjFkYzhjMGY5MmQzODJmZjdlMmY5MzAwMTU5NjBhZGNhMWY1YjNiYmY1ZDhiNA==",
        };
    
        // Log the constructed payload
        console.log("Constructed Payload:", JSON.stringify(payload, null, 2));
    
        try {
          const response = await fetch("https://rela.momentpay.live/ma/patient/app/payments", {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded"
            },
            body: new URLSearchParams(payload).toString()
          });
    
          const text = await response.text();
          console.log("Response Text:", text);
    
          const match = text.match(/window\.open\(["'](.+?)["']/);
          if (match) {
            const paymentUrl = match[1].trim();
            window.location.href = paymentUrl;
          } else {
            console.error("Could not extract the redirect URL.");
          }
        } catch (error) {
          console.error("Error during request:", error);
        }
      };



    const handleAxiosError = (error) => {
      if (error.isAxiosError) {
        if (error.response) {
          toast.error("Request error occurred. Please try again.", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000,
          });
        } else if (error.request) {
          toast.error("No response received from the server. Please check your network connection.", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000,
          });
        } else {
          toast.error("An error occurred. Please try again later.", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000,
          });
        }
      } else {
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
        await Promise.all([getWebAPIOTP(), getAppointment()]);
      } catch (error) {
        handleAxiosError(error);
      }
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
              onClick={handleSubmit2}>
              {false ? "Submitting..." : "Pay Online"}
              <div>(Save 20 mins waiting time)</div> {}
            </Button>
          </div>
          <div>
            <Button
              className="primary button-submit"
              onClick={handleSubmit}>
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
