import React, {
  useState,
  useEffect,
  useContext,
  forwardRef,
  useRef,
} from "react";
import { Button, Row, Col } from "react-bootstrap";
import "./BookAnAppointment.css";
import { Form } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import DatePicker from "react-datepicker";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import { existingPatientContext } from "../ExistingPatientContextProvider";
import { newPatientContext } from "../NewPatientContextProvider";

const BookAnAppointment = () => {
  const slotsContainerRef = useRef(null);

  const ExampleCustomInput = forwardRef(({ value, onClick, onChange }, ref) => (
    <input
      value={value}
      className="example-custom-input"
      onClick={onClick}
      onChange={onChange}
      ref={ref}
    ></input>
  ));
  const { existingPatientData, setExistingPatientData, setUsers } = useContext(
    existingPatientContext
  );

  const { setNewPatientData } = useContext(newPatientContext);

  const [data, setData] = useState({
    department: [],
    selectedDept: "",
    selectedDeptName: "",
    listOfDoctors: [],
    selectedDoctorName: "",
    chargerate: "",
    doctorId: "",
    appseqno: "",
    slotno: "",
  });
  const showdetails = true;
  const [bookingDate, setbookingDate] = useState();
  const [uniqueButton, setUniqueButton] = useState([]);
  const [appointmentDetails, setAppointmentDetails] = useState(null);
  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState("");
  const [selectedSlotEnd, setSelectedSlotEnd] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [formatDate, setFormatDate] = useState("");
  const [number, setNumber] = useState("");
  const [validNumber, setValidNumber] = useState(false);
  const [otp, setOtp] = useState("");
  const [showSendOTP, setShowSendOTP] = useState(true);
  const [click, setClick] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [showresendOTP, setShowResendOTP] = useState(false);
  const [timer, setTimer] = useState(60);
  const [spin, setSpin] = useState(false);
  const navigate = useNavigate();
  const doctorsArray = [];

  const handleShowConsultation = async (event, doctor, doctorName, amount) => {
    event.preventDefault();
    setData((prev) => ({
      ...prev,
      selectedDoctorName: doctorName,
      chargerate: amount,
      doctorId: doctor,
    }));
    setUniqueButton([doctor]);
    setbookingDate();
    setAppointmentDetails(null);
    setShowModal(false);
  };

  const handleNumber = (event) => {
    const inputPhoneNumber = event.target.value.replace(/[^0-9]/g, "");
    setNumber(inputPhoneNumber);
    const phonePattern = /^[6-9]{1}[0-9]{9}$/;
    setValidNumber(phonePattern.test(inputPhoneNumber));
  };
  const handleOTP = (event) => {
    const inputOTP = event.target.value.replace(/[^0-9]/g, "");
    setOtp(inputOTP);
  };

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

  // //console.log(showModal);
  useEffect(() => {
    if (slotsContainerRef.current) {
      // //console.log(slotsContainerRef, slotsContainerRef.current);
      window.scrollTo({
        top: slotsContainerRef.current.offsetTop,
        behavior: "smooth",
      });
    }
  }, [slots]);

  useEffect(() => {
    const getDepartments = async () => {
      try {
        const response = await axios.get(
          "https://www.relainstitute.in/relalive/api/HIS/Departments"
        );

        setData({ ...data, department: response.data });
      } catch (error) {
        //console.log(error);
      }
    };

    getDepartments();
  }, []);

  useEffect(() => {
    setUniqueButton([]);
    handleGetDoctors();
    setSelectedSlot("");
    setShowModal(false);
    setNumber("");
    setOtp("");
    setShowSendOTP(true);
  }, [data.selectedDept]);

  useEffect(() => {
    setUniqueButton([]);
    setSelectedSlot("");
    setShowModal(false);
    setNumber("");
    setOtp("");
    setShowSendOTP(true);
  }, [data.listOfDoctors]);

  useEffect(() => {
    setSlots([]);
    setSelectedSlot("");
    setShowModal(false);
    setNumber("");
    setOtp("");
    setShowSendOTP(true);
  }, [appointmentDetails]);

  const handleGetDoctors = async () => {
    try {
      if (data.selectedDept) {
        const response = await axios.post(
          "https://www.relainstitute.in/relalive/api/HIS/DepartmentWiseDoctorID",
          { DepID: data.selectedDept, DoctorID: "0" }
        );
        // //console.log(response.data);
        setData({ ...data, listOfDoctors: response.data });
        // //console.log(doctorsArray);
      }
    } catch (error) {
      //console.log(error);
    }
  };
  const slotsDecider = [];

  useEffect(() => {
    const handleAppointmentBooking = async () => {
      if (
        appointmentDetails !== null &&
        appointmentDetails.doctorId !== null &&
        appointmentDetails.date !== null
      ) {
        try {
          const response = await axios.post(
            "https://www.relainstitute.in/RELAAPI/api/HIS/AvailableSlot_ampm_seq",
            {
              SlotDate: appointmentDetails.date,
              DoctorID: appointmentDetails.doctorId,
            }
          );
          // //console.log(response.data);
          if (response.data.length === 0) {
            alert("Doctor slots are full. Please try a different day!");
          } else if (response.data.length) {
            slotsDecider.push(response.data);
            // //console.log(response.data);
            slotsDecider[0].map((slotDetails) =>
              setSlots((prev) => [...prev, slotDetails])
            );
            // //console.log(slots);
          }
        } catch (error) {
          //console.log(error);
        }
      } else {
        //console.log("1");
      }
    };
    handleAppointmentBooking();
  }, [appointmentDetails]);

  const handleDateChange = (date) => {
    setbookingDate(date);
    const formattedDate = dateInputChangeHandler(date);
    // //console.log(formattedDate);
    setFormatDate(formattedDate);
    setAppointmentDetails({ doctorId: uniqueButton[0], date: formattedDate });
  };

  const dateInputChangeHandler = (bookingDate) => {
    // //console.log(bookingDate.toDateString().slice(4).split(" "));
    const date = bookingDate.toDateString().slice(4).split(" ");
    return date[1] + "/" + date[0] + "/" + date[2];
  };
  const handleTimePicker = (event) => {
    event.preventDefault();
    setSelectedSlot(event.target.value.slice(0, -11).trim());
    setSelectedSlotEnd(event.target.value.trim().substring(11));
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };
  const handleSendOTP = async () => {
    setClick(true);
    const refId =
      new Date().getFullYear() +
      "" +
      (new Date().getMonth() + 1) +
      "" +
      new Date().getDate() +
      number +
      "" +
      Math.round(Math.random() * 1000);
    //console.log(refId);
    setExistingPatientData((prev) => ({ ...prev, refId: refId }));
    try {
      if (
        validNumber &&
        formatDate !== "" &&
        selectedSlot !== "" &&
        selectedSlotEnd !== ""
      ) {
        const response = await axios.post(
          "https://www.relainstitute.in/relalive/api/HIS/sendotp_Portal",
          {
            CountryCode: "+91",
            MobileNo: number,
            otp: "",
            RefId: refId,
            DoctorId: data.doctorId,
            AppStartDate: formatDate + selectedSlot, //"22/May/202311:30 AM"
            AppEndDate: formatDate + selectedSlotEnd, //"22/May/202311:45 AM"
            PaymentStatus: "",
            AppointmentId: 0,
            PatientType: "",
            UHID: "",
          }
        );
        if (
          response.data.authenticated === "OTP Delivered" &&
          validNumber === true
        ) {
          toast.success("OTP sent to the respective mobile number.");
          setShowSendOTP(false);
          // setOTPContent("Verify OTP");
          setShowResendOTP(true);

          setTimer(60);
          const interval = setInterval(() => {
            setTimer((prev) => prev - 1);
          }, 1000);

          setTimeout(() => {
            clearInterval(interval);
            setShowSendOTP(true);
            setClick(false);
            setShowResendOTP(true);
            setNumber("");
            setOtp("");
            setValidNumber(false);
          }, 60000);
        } else if (
          response.data.authenticated !== "OTP Delivered" &&
          validNumber === true
        ) {
          setShowSendOTP(true);
        } else if (validNumber === false) {
          alert("Invalid mobile number.");
          setClick(false);
        } else {
          alert("Please try again after sometime.");
        }
      } else if (!validNumber) {
        toast.error("Invalid Mobile Number");
        setClick(false);
      }
    } catch (error) {
      //console.log(error);
    }
  };

  const handleVerifyOTP = async () => {
    setSpin(true);
    try {
      const response = await axios.post(
        "https://www.relainstitute.in/relalive/api/HIS/verifyotp",
        {
          OTP: otp,
          MobileNo: number,
        }
      );
      // //console.log(response.data);
      if (response.data) {
        setVerifying(true);

        if (!showSendOTP && verifying) {
          // setOTPContent("Verifying..");
        }
        const refId =
          new Date().getFullYear() +
          "" +
          (new Date().getMonth() + 1) +
          "" +
          new Date().getDate() +
          number +
          "" +
          Math.round(Math.random() * 1000);
        //console.log(refId);
        setNewPatientData((prev) => ({
          ...prev,
          department: data.selectedDeptName,
          doctor: data.selectedDoctorName,
          selectDate: formatDate,
          selectTime: selectedSlot,
          amount: data.chargerate,
          doctorid: data.doctorId,
          appseqno: selectedSlot,
          slotno: selectedSlot,
          startTime: selectedSlot,
          endTime: selectedSlotEnd,
        }));
      }
      if (
        response.data.status === "New Patient" &&
        response.data.response === "Authenticated"
      ) {
        // toast.success("OTP verified successfully");
        setShowModal(false);
        alert(
          "Patient Details not found. You will be redirected to the registration process. Don't worry your booking slot is still saved from our side."
        );
        const refId =
          new Date().getFullYear() +
          "" +
          (new Date().getMonth() + 1) +
          "" +
          new Date().getDate() +
          number +
          "" +
          Math.round(Math.random() * 1000);
        //console.log(refId);
        setNewPatientData((prev) => ({
          ...prev,
          department: data.selectedDeptName,
          doctor: data.selectedDoctorName,
          selectDate: formatDate,
          selectTime: selectedSlot,
          amount: data.chargerate,
          doctorid: data.doctorId,
          appseqno: selectedSlot,
          slotno: selectedSlot,
          startTime: selectedSlot,
          endTime: selectedSlotEnd,
        }));
        setExistingPatientData((prev) => ({
          ...prev,
          department: data.selectedDeptName,
          doctor: data.selectedDoctorName,
          selectDate: formatDate,
          selectTime: selectedSlot,
          amount: data.chargerate,
          doctorid: data.doctorId,
          appseqno: selectedSlot,
          slotno: selectedSlot,
          startTime: selectedSlot,
          endTime: selectedSlotEnd,
        }));
        window.scrollTo(0, 0);
        navigate("/newpatient-creation");
        setSpin(false);
      }
      if (response.data.response === "OTP Mismatched") {
        alert("Invalid OTP");
        setSpin(false);
      }
      if (response.data.status === "Patient Details Available") {
        setShowModal(false);
        // toast.success("OTP verified successfully");
        const patientData = response.data.patientDTO[0];
        const allPatientDatum = response.data.patientDTO;
        // //console.log(allPatientDatum);

        // setUser((prev) => [...prev, allPatientDatum]); for new patient
        setUsers((prev) => [...prev, allPatientDatum]); // for exisiting patient
        const refId =
          new Date().getFullYear() +
          "" +
          (new Date().getMonth() + 1) +
          "" +
          new Date().getDate() +
          number +
          "" +
          Math.round(Math.random() * 1000);
        //console.log(refId);
        setExistingPatientData((prev) => ({
          ...prev,
          name: patientData.patientName,
          mobile: patientData.mobileNo,
          dob: patientData.dob,
          gender: patientData.gender,
          uhid: patientData.uhid,
          age: patientData.age,
          department: data.selectedDeptName,
          doctor: data.selectedDoctorName,
          selectDate: formatDate,
          selectTime: selectedSlot,
          //  selectTime: selectedSlot + "-" + selectedSlotEnd,
          amount: data.chargerate,
          doctorid: data.doctorId,
          appseqno: selectedSlot,
          slotno: selectedSlot,
          startTime: selectedSlot,
          endTime: selectedSlotEnd,
        }));
        // //console.log(existingPatientData.department);
        window.scrollTo(0, 0);
        navigate("/existing-patient-booking");
        setSpin(false);
      }
    } catch (error) {
      //console.log(error);
      setSpin(false);
    }
  };
  return (
    <>
      <div>
        <div style={{ textAlign: "center" }}>
          {showdetails && (
            <div
              style={{
                paddingLeft: "50px",
                paddingRight: "50px",
                marginTop: "50px",
              }}
            >
              <Form.Select
                className="select width"
                value={data.selectedDept}
                onChange={(event) =>
                  setData({
                    ...data,
                    selectedDept: event.target.value,
                    selectedDeptName:
                      event.target[event.target.selectedIndex].getAttribute(
                        "data-name"
                      ),
                  })
                }
              >
                <option value="" disabled defaultValue className="select">
                  Select department
                </option>
                {data.department.length && (
                  <>
                    {data.department.map((department) => {
                      return (
                        <option
                          className="select"
                          value={department.columnCode}
                          key={department.columnName}
                          data-name={department.columnName}
                        >
                          {department.columnName}
                        </option>
                      );
                    })}
                  </>
                )}
              </Form.Select>
            </div>
          )}

          {data.listOfDoctors && (
            <>
              {data.listOfDoctors.map((doctors) => {
                // //console.log(data.listOfDoctors);
                return (
                  <>
                    <div
                      style={{
                        padding: "5px",
                        marginRight: "auto",
                        marginLeft: "auto",
                      }}
                    >
                      <div className="container-1">
                        <div className="doctor-image">
                          <img
                            src={
                              doctors.photo_img !== null
                                ? `data:image/jpeg;base64,${doctors.photo_img}`
                                : "https://st3.depositphotos.com/9998432/19046/v/600/depositphotos_190466420-stock-illustration-default-placeholder-doctor-half-length.jpg"
                            }
                            alt={doctors.doctorname}
                            className="images"
                          />
                        </div>

                        <div className="text-align">
                          <h3 style={{ fontSize: "20px", fontWeight: "600" }}>
                            {doctors.doctorname}
                          </h3>
                          <h3
                            style={{
                              marginBottom: "15px",
                              fontSize: "15px",
                              fontWeight: "600",
                            }}
                          >
                            {doctors.qualification}
                          </h3>
                          <div>
                            <Button
                              href={doctors.profilelink}
                              className="profile-visit-consult"
                              style={{
                                marginBottom: "15px",
                                marginTop: "15px",
                                backgroundColor: "#aaa9a9",
                                outline: "none",
                                boxShadow: "none !important",
                                color: "white",
                                border: "none",
                                width: "110px",
                                height: "40px",
                                fontWeight: "600",
                                // borderTopLeftRadius: "10px",
                                // borderBottomLeftRadius: "10px",
                                textAlign: "left",
                                verticalAlign: "center",
                              }}
                            >
                              View Profile
                            </Button>
                          </div>

                          <>
                            <div className="flex4">
                              <div>
                                <Button
                                  className="profile-visit-consult"
                                  // onClick={handleView}
                                  style={{
                                    marginBottom: "15px",
                                    marginTop: "15px",
                                    backgroundColor: "#f3a01c",
                                    outline: "none",
                                    boxShadow: "none !important",
                                    color: "white",
                                    border: "none",
                                    width: "180px",
                                    height: "40px",
                                    fontWeight: "600",
                                    textAlign: "left",
                                    // borderTopRightRadius: "10px",
                                    // borderBottomRightRadius: "10px",
                                  }}
                                  onClick={(event) =>
                                    handleShowConsultation(
                                      event,
                                      doctors.doctorid,
                                      doctors.doctorname,
                                      doctors.chargerate
                                    )
                                  }
                                >
                                  Hospital Consultation
                                </Button>
                              </div>

                              <div>
                                {uniqueButton.length === 1 &&
                                  uniqueButton[0] === doctors.doctorid && (
                                    <div className="flex5">
                                      <div></div>

                                      <div className="slotdate_slot">
                                        {
                                          <div>
                                            <>Select Date:</>
                                            <DatePicker
                                              className="date-picker"
                                              wrapperClassName="datePicker"
                                              selected={bookingDate}
                                              dateFormat="dd-MM-yyyy"
                                              onChange={handleDateChange}
                                              minDate={new Date()}
                                              monthsShown={1}
                                              popperPlacement="bottom"
                                              placeholder={"Select a date"}
                                              customInput={
                                                <ExampleCustomInput />
                                              }
                                            ></DatePicker>
                                          </div>
                                        }
                                      </div>
                                      {/* )} */}
                                    </div>
                                  )}
                              </div>
                            </div>
                          </>
                        </div>
                      </div>
                    </div>
                    <div className="slot-visibility">
                      {uniqueButton.length === 1 &&
                        uniqueButton[0] === doctors.doctorid && (
                          <>
                            {slots.length > 0 && (
                              <>
                                <Row className="button-slots">
                                  <Col
                                    xs="10"
                                    sm="10"
                                    md="10"
                                    lg="12"
                                    xl="12"
                                    xxl="12"
                                  >
                                    {" "}
                                    <div
                                      className="slotdate_slot"
                                      ref={slotsContainerRef}
                                    >
                                      <h6 style={{ fontWeight: "600" }}>
                                        Select Slot:
                                      </h6>
                                    </div>
                                    {slots.map((data) => (
                                      <>
                                        <Button
                                          className="button-next"
                                          value={[
                                            data.startDateTime,
                                            " ",
                                            data.endDateTime,
                                          ]}
                                          onClick={handleTimePicker}
                                          style={{
                                            backgroundColor:
                                              data.startDateTime.trim() ===
                                              selectedSlot
                                                ? "green"
                                                : "white",
                                            padding: "5px",
                                            margin: "10px",
                                            fontSize: "14px",

                                            color:
                                              data.startDateTime.trim() ===
                                              selectedSlot
                                                ? "white"
                                                : "green",
                                            border: "1px solid green",
                                            borderRadius: "15px",
                                          }}
                                        >
                                          {data.startDateTime}
                                          {/*         {data.startDateTime}-
                                          {data.endDateTime}  */}
                                        </Button>
                                      </>
                                    ))}
                                  </Col>
                                </Row>
                              </>
                            )}
                          </>
                        )}
                    </div>
                  </>
                );
              })}
            </>
          )}
          <div style={{ marginBottom: "20px" }}></div>
          <div></div>
          <Modal
            show={showModal}
            onHide={handleClose}
            backdrop="static"
            style={
              {
                // width: "400px",
              }
            }
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title style={{ fontWeight: "600" }}>
                Mobile Number verification
              </Modal.Title>
            </Modal.Header>
            <Modal.Body style={{}}>
              <Form>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label style={{ fontWeight: "600" }}>
                    Mobile Number<span className="mandatory">*</span>
                  </Form.Label>
                  <div
                    style={{
                      display: "flex",
                      gap: "0px",
                    }}
                  >
                    <Form.Control
                      type="text"
                      readOnly
                      value="+91"
                      className="select"
                      style={{ width: "50px" }}
                    />

                    <Form.Control
                      style={{ width: "200px" }}
                      type="text"
                      required
                      maxLength={10}
                      placeholder="Enter mobile number"
                      value={number}
                      className="select"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      onChange={(event) => handleNumber(event)}
                    />
                  </div>
                </Form.Group>
                {showSendOTP === false && (
                  <>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label style={{ fontWeight: "600" }}>
                        OTP<span className="mandatory">*</span>
                      </Form.Label>
                      <Form.Control
                        // style={{ width: "250px" }}
                        type="text"
                        required
                        maxLength={4}
                        placeholder="Enter OTP"
                        value={otp}
                        className="select newotp"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        onChange={(event) => handleOTP(event)}
                      />
                    </Form.Group>
                  </>
                )}
              </Form>
              {showresendOTP && timer > 0 && (
                <>
                  <div
                    style={{
                      textAlign: "left",
                      margin: "auto",
                      padding: "auto",
                    }}
                  >
                    OTP will be expired in{" "}
                    <span style={{ fontWeight: "600" }}>{timer}</span> seconds.
                    Resend OTP will be enabled after the timer ends.
                  </div>
                </>
              )}
            </Modal.Body>
            <Modal.Footer>
              {spin && <h6 style={{ fontWeight: "600" }}>verifying....</h6>}
              <Button
                variant="primary"
                onClick={handleSendOTP}
                disabled={click}
              >
                {/* {sentOTP ? "OTP Sent" : "Send OTP"} */}
                Send OTP
              </Button>
              <Button
                variant="primary"
                onClick={handleVerifyOTP}
                disabled={showSendOTP}
              >
                Verify OTP
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>

      <ToastContainer position={toast.POSITION.TOP_CENTER} />
    </>
  );
};

export default BookAnAppointment;
