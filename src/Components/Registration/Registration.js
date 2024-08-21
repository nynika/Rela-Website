import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button, Form, Container, Row, Col } from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css";
import "./Registration.css";
import data from "../../JsonData/data.json";
import language from "../../JsonData/language.json";
import new_countries from "../../JsonData/new_countries.json";
import countries from "../../JsonData/countries.json";
import country_nationality from "../../JsonData/country_nationality.json";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PaymentInfo from "../../Payment/PaymentInfo";
import { CSpinner } from "@coreui/bootstrap-react";
import { newPatientContext } from "../NewPatientContextProvider";

function Registration() {
  const { setNewPatientData } = useContext(newPatientContext);

  let navigate = useNavigate();

  const [isSubmitting, setIsSubmitting] = useState(false);

  let [countDiseases, setCountDiseases] = useState({
    cough: "No",
    flu: "No",
    rashes: "No",
    travel: "No",
    hcworker: "No",
    diarrhea: "No",
    tb: "No",
    diseases: "No",
  });
  let [phonecode, setPhonecode] = useState("+91"); //new payload to be added
  let [phonecode2, setPhonecode2] = useState(""); //new payload to be added
  const [binarydatafs, setBinarydatafs] = useState(""); //new payload to be added
  let [salutation, setSalutation] = useState("");
  let [currentStep, setCurrentStep] = useState(1);
  let [firstName, setFirstName] = useState("");
  let [lastName, setLastName] = useState("");
  let [age, setAge] = useState(0);
  let [gender, setGender] = useState("");
  let [employment, setEmployment] = useState("");
  let [mstatus, setMstatus] = useState("");
  let [country, setCountry] = useState("");
  let [nationality, setNationality] = useState("");
  let [ectype, setEctype] = useState("");
  let [ecname, setEcname] = useState("");
  let [ecnumber, setEcnumber] = useState("");
  const [idtype, setIdtype] = useState("");
  const [idnum, setIdnum] = useState("");
  const [lang, setLang] = useState("");
  const [assist, setAssist] = useState("");
  const [blood, setBlood] = useState("");
  const [resource, setResource] = useState("");
  const [religion, setReligion] = useState(""); //new payload to be added
  let [startDate, setStartDate] = useState(null);
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [pincode, setPincode] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [area, setArea] = useState("");
  const [areas, setAreas] = useState("");
  const [door, setDoor] = useState("");
  const [street, setStreet] = useState("");
  const [radioValue, setRadioValue] = useState("");
  const [checkboxDisabled, setCheckboxDisabled] = useState(null);
  const [cough, setCough] = useState("");
  const [rashes, setRashes] = useState("");
  const [travel, setTravel] = useState("");
  const [flu, setFlu] = useState("");
  const [hcworker, setHcworker] = useState("");
  const [diarrhea, setDiarrhea] = useState("");
  const [tb, setTb] = useState("");
  const [diseases, setDiseases] = useState({
    ChickenPox: "No",
    Measles: "No",
    Mumps: "No",
    Rubella: "No",
  });
  const [search, setSearch] = useState(false);
  const [diseaseStatus, setDiseaseStatus] = useState({
    ChickenPox: false,
    Measles: false,
    Mumps: false,
    Rubella: false,
  });

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

  const [isValid, setIsValid] = useState(false);
  const [iisValid, setIisValid] = useState(false);
  const [iiisValid, setIiisValid] = useState(false);

  const count_nationality = country_nationality.map((nations) => ({
    value: nations.nationalityName,
    label: nations.nationalityID,
  }));

  const handleFileSelect = (event) => {
    const frontSide = event.target.files[0];
    // //console.log(frontSide);
    const frontSideReader = new FileReader();
    frontSideReader.readAsBinaryString(frontSide);
    frontSideReader.onload = (event) => {
      const binaryData = event.target.result;
      setBinarydatafs(binaryData);
    };
  };

  /*   const genders = {
    11: "M",
    22: "M",
    19: "F",
    19: "M",
    12: "T",
    12: "F",
    12: "F",
    11: "M",
    21: "F",
  }; */

  const genders = {
    MASTER: "M",
    BABY: "F",
    BABY: "M",
    MS: "T",
    MR: "M",
    MS: "F",
    MRS: "F",
  };
  const resetStates = () => {
    setAge(0);
    setFirstName("");
    setLastName("");
    setGender("");
    setSalutation("");
    setEcname("");
    setLang("");
    setAssist("");
    setEcnumber("");
    setEctype("");
    setEmployment("");
    setMstatus("");
    setIdtype("");
    setIdnum("");
    setStartDate(null);
    setBlood("");
    setResource("");
    setNationality("");
    setCountry("");
    setReligion("");
    setEmail("");
    setMobile("");
    setPincode("");
    setState("");
    setCity("");
    setArea("");
    setDoor("");
    setStreet("");
    setCough("");
    setRashes("");
    setTravel("");
    setFlu("");
    setHcworker("");
    setDiarrhea("");
    setTb("");
    setDiseases({
      ChickenPox: "No",
      Measles: "No",
      Mumps: "No",
      Rubella: "No",
    });
    setBinarydatafs("");
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isSubmitting) {
      return;
    }
    const oneMonthDetails = Object.values(diseases).filter(
      (value) => value === "Yes"
    ).length;
    setIsSubmitting(true);
    const yesCount = Object.values(countDiseases).filter(
      (value) => value === "Yes"
    ).length;
    if (yesCount >= 3) {
      alert(
        "Your communicable disease screening indicating a visit to our ER, hence requesting you to report to Rela ER"
      );
      setIsSubmitting(false);
      return;
    }

    if (
      cough !== "" &&
      rashes !== "" &&
      travel !== "" &&
      flu !== "" &&
      hcworker !== "" &&
      diarrhea !== "" &&
      tb !== "" &&
      checkboxDisabled !== null
    ) {
      if (!checkboxDisabled) {
        if (oneMonthDetails >= 1) {
          try {
            const response = await axios.post(
              "https://www.relainstitute.in/relalive/api/HIS/Get_Patient_Portal",

              {
                Salutation: salutation,
                FirstName: firstName,
                LastName: lastName,
                DOB: startDate,
                Age: age,
                Gender: gender,
                EmploymentStatus: employment,
                MaritalStatus: mstatus,
                Country: country,
                Nationality: nationality,
                EmergencyContactType: ectype,
                EmergencyContactName: ecname,
                EmergencyContactNumber: ecnumber,
                IdType: idtype,
                IdNumber: idnum,
                PreferredLanguage: lang,
                SpecialAssistance: assist,
                BloodGroup: blood,
                ReferralSource: resource,
                EmailId: email,
                MobileNumber: mobile,
                Pincode: pincode,
                State: state.toUpperCase(),
                City: city.toUpperCase(),
                Area: area.toUpperCase(),
                DoorNoAppartmentName: door.toUpperCase(),
                StreetLocality: street.toUpperCase(),
                Cough: cough,
                Rashes: rashes,
                Travel: travel,
                Flu: flu,
                HealthCareWrker: hcworker,
                Diarrhea: diarrhea,
                TB: tb,
                RecentDisease: radioValue,
                ChickenPox: diseases.ChickenPox,
                Measles: diseases.Measles,
                Mumps: diseases.Mumps,
                Rubella: diseases.Rubella,
                idproof: "",
                Religion: religion,
                CountryCode: phonecode,
                pattype: "pay at hospital",
              }
            );

            if (
              response.data.sno !== "-1" &&
              response.data.msgDesc !== "2" &&
              response.data.msgDesc !== "1"
            ) {
              const uhid = () => {
                return response.data.sno;
              };
              setNewPatientData((prev) => ({
                ...prev,
                name: firstName + " " + lastName,
                mobile: mobile,
                dob: startDate,
                gender: gender,
                age: age,
                uhid: uhid(),
                email: email,
                salutation: salutation,
                countrycode: phonecode,
              }));
              window.scrollTo(0, 0);
              navigate("/new-patient-booking", { replace: true });
              alert(
                "Registration process done successfully. Don't close or refresh the page till your appointment confirmation.",
                {
                  position: toast.POSITION.TOP_CENTER,
                  autoClose: 3000,
                }
              );
            } else if (response.data.sno === "-1") {
              toast.warn("Oops!, Please re-check and submit your response.", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 3000,
              });
              window.scrollTo(0, 0);
              navigate("/", { replace: true });
            } else {
              toast.alert("Patient Details already exists.");
            }
          } catch (error) {
            //console.error(error);
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
          } finally {
            setIsSubmitting(false);
          }
        } else {
          toast.warn(
            "Communicable disease details should be selected if selected 'Yes'"
          );
          setIsSubmitting(false);
        }
      } else if (checkboxDisabled) {
        try {
          const response = await axios.post(
            "https://www.relainstitute.in/relalive/api/HIS/Get_Patient_Portal",

            {
              Salutation: salutation,
              FirstName: firstName,
              LastName: lastName,
              DOB: startDate,
              Age: age,
              Gender: gender,
              EmploymentStatus: employment,
              MaritalStatus: mstatus,
              Country: country,
              Nationality: nationality,
              EmergencyContactType: ectype,
              EmergencyContactName: ecname,
              EmergencyContactNumber: ecnumber,
              IdType: idtype,
              IdNumber: idnum,
              PreferredLanguage: lang,
              SpecialAssistance: assist,
              BloodGroup: blood,
              ReferralSource: resource,
              EmailId: email,
              MobileNumber: mobile,
              Pincode: pincode,
              State: state.toUpperCase(),
              City: city.toUpperCase(),
              Area: area.toUpperCase(),
              DoorNoAppartmentName: door.toUpperCase(),
              StreetLocality: street.toUpperCase(),
              Cough: cough,
              Rashes: rashes,
              Travel: travel,
              Flu: flu,
              HealthCareWrker: hcworker,
              Diarrhea: diarrhea,
              TB: tb,
              RecentDisease: radioValue,
              ChickenPox: diseases.ChickenPox,
              Measles: diseases.Measles,
              Mumps: diseases.Mumps,
              Rubella: diseases.Rubella,
              idproof: "",
              Religion: religion,
              CountryCode: phonecode,
              pattype: "pay at hospital",
            }
          );

          if (response) {
            resetStates();
            const uhid = () => {
              return response.data.sno;
            };

            if ((response.data.msgDesc = "successfully Inserted ")) {
              setNewPatientData((prev) => ({
                ...prev,
                name: firstName + " " + lastName,
                mobile: mobile,
                dob: startDate,
                gender: gender,
                age: age,
                uhid: uhid(),
                email: email,
                salutation: salutation,
                countrycode: phonecode,
              }));
              window.scrollTo(0, 0);
              navigate("/new-patient-booking", { replace: true });
              alert(
                "Registration process done successfully. Don't close or refresh the page till your appointment confirmation.",
                {
                  position: toast.POSITION.TOP_CENTER,
                  autoClose: 3000,
                }
              );
            } else {
              toast.alert("Patient Details already exists.");
            }
          }
        } catch (error) {
          //console.error(error);
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
        } finally {
          setIsSubmitting(false);
        }
      }
    } else {
      toast.info("Consent details must be selected.");
      setIsSubmitting(false);
    }
  };

  const countryCode = [];
  const nationals = [];
  const handleCountryDetails = (event) => {
    countries.map((event) => {
      return countryCode.push(event.dial_code);
    });
  };
  handleCountryDetails();
  const nationalsList = (event) => {
    new_countries.map((event) => {
      return nationals.push(event);
    });
  };
  nationalsList();

  const handleCough = (event) => {
    setCough(event.target.value);
    setCountDiseases({ ...countDiseases, cough: event.target.value });
  };

  const handleRashes = (event) => {
    setRashes(event.target.value);

    setCountDiseases({ ...countDiseases, rashes: event.target.value });
  };

  const handleTravel = (event) => {
    setTravel(event.target.value);

    setCountDiseases({ ...countDiseases, travel: event.target.value });
  };

  const handleFlu = (event) => {
    setFlu(event.target.value);

    setCountDiseases({ ...countDiseases, flu: event.target.value });
  };

  const handleHcworker = (event) => {
    setHcworker(event.target.value);

    setCountDiseases({ ...countDiseases, hcworker: event.target.value });
  };

  const handleDiarrhea = (event) => {
    setDiarrhea(event.target.value);

    setCountDiseases({ ...countDiseases, diarrhea: event.target.value });
  };

  const handleTb = (event) => {
    setTb(event.target.value);

    setCountDiseases({ ...countDiseases, tb: event.target.value });
  };

  const handleDisease = (event) => {
    const { name, checked } = event.target;

    setDiseaseStatus((prevState) => ({
      ...prevState,
      [name]: checked ? true : false,
    }));

    setDiseases((prevState) => ({
      ...prevState,
      [name]: checked ? "Yes" : "No",
    }));
    if (checked) {
      setCountDiseases({ ...countDiseases, diseases: "Yes" });
    }
    if (!checked) {
      setCountDiseases({ ...countDiseases, diseases: "No" });
    }
    // //console.log(diseaseStatus.ChickenPox);
  };

  function handleRadioChange(event) {
    setRadioValue(event.target.value);
    if (event.target.value === "No") {
      setCheckboxDisabled(true);
    } else {
      setCheckboxDisabled(false);
    }
  }

  const handlePincodeChange = async (event) => {
    const pincode = event.target.value.replace(/[^0-9]/g, "");
    if (pincode.length === 6) {
      setSearch(true);
      const response = await axios.get(
        `https://www.relainstitute.in/relalive/api/HIS/area?pincode=${pincode}`
      );
      if (response.data.length > 0) {
        setAreas(response.data);
        setSearch(false);
      }
      fetch(

        "https://www.relainstitute.in/relalive/api/HIS/GetDatabyPinCode",
        {
          method: "POST",
          // Adding body or contents to send
          body: JSON.stringify({
            CountryCode: 0,
            StateCode: 0,
            PinCode: pincode,
          }),
          // Adding headers to the request
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          const { cityName, stateName } = data;
          setCity(cityName);
          setState(stateName);
        })
        .catch((error) => {
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
          //console.error(error);
        });
    } else {
      setSearch(false);
    }
    setPincode(pincode);
  };
  const salutations = data[0].salutations;
  const employementStatus = data[1].employementStatus;
  const maritalStatus = data[2].maritalStatus;
  const bloodGroups = data[3].bloodGroups;
  const emergencyCon = data[6].emergencyContact;
  const idType = data[7].idType;
  // const preferredLang = data[8].preferredLang;
  const religionData = data[9].religionData;
  const preferredLang = language;

  const handleSalutationChange = (salut) => {
    setSalutation(salut);
    setGender(genders[salut]);
  };
  const handleFirstName = (event) => {
    const name = event.target.value.toUpperCase().replace(/[^A-Z a-z]/g, "");
    setFirstName(name);
  };
  const handleLastName = (event) => {
    const name = event.target.value.toUpperCase().replace(/[^A-Z a-z]/g, "");
    setLastName(name);
  };
  const handleEcName = (event) => {
    const name = event.target.value.toUpperCase().replace(/[^A-Z a-z]/g, "");
    setEcname(name);
  };
  const handlePhonecode = (code) => {
    setPhonecode((prevPhoneCode) => prevPhoneCode.replace(phonecode, code));
  };

  const handleEcNumber = (event) => {
    const inputPhoneNumber = event.target.value.replace(/[^0-9]/g, "");
    setEcnumber(inputPhoneNumber);
    const phonePattern = /^[1-9]{1}[0-9]{9}$/;
    setIiisValid(phonePattern.test(inputPhoneNumber));
  };

  const validIdNumber = (idtype, idnum) => {
    switch (idtype) {
      case "AADHAAR CARD":
        const aadharpattern = /^[2-9]{1}[0-9]{3}[0-9]{4}[0-9]{4}$/;
        return aadharpattern.test(idnum);
      case "PAN CARD":
        const panPattern = /^[A-Z]{5}[0-9]{4}[A-Z]$/;
        return panPattern.test(idnum);
      case "VOTER ID":
        const voterIdPattern = /^[a-zA-Z]{3}\d{7}$/;
        return voterIdPattern.test(idnum);
      case "DRIVING LICENCE":
        const drivingLicensePattern = /^[a-zA-Z0-9]{2}[a-zA-Z0-9]{13,14}$/;
        return drivingLicensePattern.test(idnum);
      case "PASSPORT NO":
      case "POLICE/ARMY ID":
        return true;
      default:
        return false;
    }
  };

  const handleNumberLength = () => {
    if (idtype === "AADHAAR CARD") {
      return 12;
    } else if (idtype === "PAN CARD") {
      return 10;
    } else if (idtype === "VOTER ID") {
      return 10;
    } else if (idtype === "DRIVING LICENCE") {
      return 18;
    }
  };
  const handleIdType = (event) => {
    const type = event.target.value;
    setIdtype(type);
  };
  const handleReligion = (event) => {
    const religion = event.target.value;
    setReligion(religion);
  };
  const handleIdNumber = (event) => {
    const number = event.target.value.toUpperCase();
    setIdnum(number);
  };
  const handleLang = (event) => {
    setLang(event.target.value.toUpperCase());
  };
  const handleBlood = (event) => {
    setBlood(event.target.value);
  };
  const handleAssist = (event) => {
    setAssist(event.target.value);
  };
  const handleReferral = (event) => {
    setResource(event.target.value.toUpperCase());
  };
  const handleMobile = (event) => {
    const inputPhoneNumber = event.target.value.replace(/[^0-9]/g, "");
    setMobile(inputPhoneNumber);
    const phonePattern = /^[1-9]{1}[0-9]{9}$/;
    setIisValid(phonePattern.test(inputPhoneNumber));
  };
  const handleEmail = (event) => {
    const inputEmail = event.target.value;
    setEmail(inputEmail.toUpperCase());
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsValid(emailPattern.test(inputEmail));
  };

  const handleDoor = (event) => {
    setDoor(event.target.value.toUpperCase());
  };
  const handleStreet = (event) => {
    setStreet(event.target.value.toUpperCase());
  };
  const handleMstatus = (status) => {
    setMstatus(status);
  };

  const handleDateChange = (event) => {
    if (event.target.value !== "") {
      const selectedDate = new Date(event.target.value);
      const formattedDate = formatDate(selectedDate);
      setStartDate(formattedDate);
      // //console.log(formattedDate);
      // //console.log(selectedDate);
      const ageValue = calculateAge(selectedDate);
      setAge(ageValue);
    } else {
      setAge(0);
      setStartDate(null);
    }
  };

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const calculateAge = (date) => {
    const today = new Date();
    let age = today.getFullYear() - date.getFullYear();
    const monthDiff = today.getMonth() - date.getMonth();
    const dayDiff = today.getDate() - date.getDate();

    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      age--;
    }

    return age.toString();
  };

  const maxDate = new Date().toISOString().slice(0, 10);
  const minimumDate = new Date("1900-01-01");
  const minDate = minimumDate.toISOString().slice(0, 10);

  const handleNext1 = (ev) => {
    if (
      salutation !== "" &&
      firstName !== "" &&
      lastName !== "" &&
      startDate !== null &&
      age !== "" &&
      nationality !== "" &&
      ectype !== "" &&
      ecname !== "" &&
      employment !== "" &&
      gender !== "" &&
      mstatus !== "" &&
      iiisValid
    ) {
      window.scrollTo(0, 0);
      return setCurrentStep(currentStep + 1);
    } else if (!iiisValid) {
      return alert("Invalid mobile number");
    } else if (startDate === null) {
      return alert("Invalid Date of Birth.");
    } else {
      return alert("All fields are mandatory.");
    }
  };

  function handleNext2(ev) {
    if (
      validIdNumber(idtype, idnum) &&
      idnum !== "" &&
      assist !== "" &&
      blood !== "" &&
      resource !== "" &&
      blood !== "" &&
      idType !== "" &&
      lang !== "" &&
      // binarydatafs !== "" &&
      religion !== ""
    ) {
      window.scrollTo(0, 0);
      setCurrentStep(currentStep + 1);
    } else if (!validIdNumber(idtype, idnum)) {
      alert(`Invalid ${idtype.toLowerCase()} number.`);
    } else {
      alert("Please fill out all required fields.");
    }
  }

  function handleNext3(ev) {
    if (
      iisValid &&
      email !== "" &&
      isValid &&
      pincode !== "" &&
      state !== "" &&
      country !== "" &&
      area !== "" &&
      street !== "" &&
      door !== ""
    ) {
      window.scrollTo(0, 0);
      return setCurrentStep(currentStep + 1);
    } else if (!isValid) {
      return alert("Invalid email address/mobile number");
    } else if (!iisValid) {
      return alert("Invalid email address/mobile number");
    } else {
      return alert("Please fill out the all required fields.");
    }
  }
  function handlePrev() {
    window.scrollTo(0, 0);
    setCurrentStep(currentStep - 1);
  }

  return (
    <Container>
      <Row>
        <Form>
          {currentStep === 1 && (
            <div>
              <div
                style={{
                  textAlign: "left",
                  border: "1px solid black",
                  borderRadius: "5px",
                  position: "relative",
                  marginTop: "20px",
                  padding: "10px",
                }}
              >
                <h2 className="absolute">Welcome to Rela Hospital</h2>
                <Row className="mb-4 mt-4 left">
                  <Form.Group
                    as={Col}
                    controlId="salutation"
                    className="input-label"
                  >
                    <Form.Label className="label">
                      Salutation<span className="mandatory">*</span>
                    </Form.Label>
                    <Form.Select
                      required
                      size="md"
                      className="input select"
                      onChange={(e) => handleSalutationChange(e.target.value)}
                      value={salutation}
                    >
                      <option value={""}>Select one</option>
                      {salutations.map((s) => (
                        <option key={s.id + s.salutations} value={s.id}>
                          {s.salutations}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                  <Form.Group as={Col} className="input-label">
                    <Form.Label className="label">
                      First Name<span className="mandatory">*</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      required
                      size="md"
                      placeholder="Enter first name"
                      className="input select"
                      value={firstName}
                      inputMode="text"
                      pattern="[A-Za-z]+"
                      onChange={(event) => handleFirstName(event)}
                    />
                  </Form.Group>

                  <Form.Group as={Col} className="input-label">
                    <Form.Label className="label">
                      Last Name<span className="mandatory">*</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      required
                      size="md"
                      placeholder="Enter last name"
                      className="input select"
                      value={lastName}
                      inputMode="text"
                      pattern="[A-Za-z]+"
                      onChange={(event) => handleLastName(event)}
                    />
                  </Form.Group>
                </Row>

                <Row className="mb-4 left">
                  <Form.Group as={Col} className="input-label">
                    <Form.Label className="label">
                      DOB<span className="mandatory">*</span>
                    </Form.Label>
                    <Form.Control
                      id="birthdate"
                      size="md"
                      type="date"
                      className="input select"
                      defaultValue={startDate}
                      onChange={handleDateChange}
                      max={maxDate}
                      min={minDate}
                    />
                  </Form.Group>

                  <Form.Group as={Col} className="input-label">
                    <Form.Label className="label">Age</Form.Label>
                    <Form.Control
                      type="text"
                      size="md"
                      required
                      placeholder="Your age"
                      className="input select"
                      value={age !== NaN ? age : 0}
                    />
                  </Form.Group>

                  <Form.Group as={Col} className="input-label">
                    <Form.Label className="label">
                      Gender<span className="mandatory">*</span>
                    </Form.Label>
                    <Form.Select
                      size="md"
                      required
                      className="input select"
                      value={gender}
                      disabled={!setSalutation}
                      onChange={(e) => setGender(e.target.value)}
                    >
                      <option disabled value={""}>
                        Select one
                      </option>
                      <option value="M">MALE</option>
                      <option value="F">FEMALE</option>
                      <option value="T">THIRD GENDER</option>
                    </Form.Select>
                  </Form.Group>
                </Row>
                <Row className="mb-4 left">
                  <Form.Group as={Col} className="input-label">
                    <Form.Label className="label">
                      Employment Status<span className="mandatory">*</span>
                    </Form.Label>
                    <Form.Select
                      size="md"
                      required
                      className="input select"
                      value={employment}
                      onChange={(e) => setEmployment(e.target.value)}
                    >
                      <option disabled value={""}>
                        Select one
                      </option>

                      {employementStatus.map((s) => (
                        <option
                          key={s.id + s.employementStatus}
                          value={s.employementStatus}
                        >
                          {s.employementStatus}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                  <Form.Group as={Col} className="input-label">
                    <Form.Label className="label">
                      Nationality<span className="mandatory">*</span>
                    </Form.Label>
                    <Form.Select
                      size="md"
                      required
                      className="input form-control select"
                      value={nationality}
                      onChange={(event) => setNationality(event.target.value)}
                    >
                      {" "}
                      <option disabled value={""}>
                        Select one
                      </option>
                      {count_nationality.map((value) => {
                        return <option key={value.label}>{value.value}</option>;
                      })}
                    </Form.Select>
                  </Form.Group>

                  <Form.Group as={Col} className="input-label">
                    <Form.Label className="label">
                      Marital Status<span className="mandatory">*</span>
                    </Form.Label>
                    <Form.Select
                      size="md"
                      required
                      className="input select"
                      aria-required
                      value={mstatus}
                      onChange={(e) => handleMstatus(e.target.value)}
                    >
                      <option value="" disabled={true}>
                        Select one
                      </option>

                      {maritalStatus.map((s) => (
                        <option
                          key={s.id + s.maritalStatus}
                          value={s.maritalStatus}
                        >
                          {s.maritalStatus}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Row>

                <Row className="mb-4 left">
                  <Form.Group as={Col} className="input-label">
                    <Form.Label className="label">
                      Emergency Contact Type<span className="mandatory">*</span>
                    </Form.Label>
                    <Form.Select
                      size="md"
                      required
                      className="input select"
                      value={ectype}
                      onChange={(e) => setEctype(e.target.value)}
                    >
                      <option disabled value={""}>
                        Select one
                      </option>

                      {emergencyCon.map((s) => (
                        <option
                          key={s.id + s.emergencyContact}
                          value={s.emergencyContact}
                        >
                          {s.emergencyContact}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>

                  <Form.Group as={Col} className="input-label">
                    <Form.Label className="label">
                      Emergency Contact Name<span className="mandatory">*</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      required
                      size="md"
                      placeholder="Emergency Contact Name"
                      value={ecname}
                      className="input select"
                      inputMode="text"
                      pattern="[A-Za-z]+"
                      onChange={(event) => handleEcName(event)}
                    />
                  </Form.Group>

                  <Form.Group as={Col} className="col-mb-6 input-label">
                    <Form.Label className="label">
                      Emergency Contact Number
                      <span className="mandatory">*</span>
                    </Form.Label>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        // width: 330,
                        // height: 40,
                      }}
                      className="input"
                    >
                      <Form.Select
                        size="sm"
                        required
                        style={{
                          width: "70px",
                          height: "40px",
                          backgroundImage: "none",
                          fontWeight: "600",
                        }}
                        value={phonecode}
                        onChange={(event) =>
                          handlePhonecode(event.target.value)
                        }
                        className="select"
                      >
                        <option disabled value={""}>
                          Select one
                        </option>
                        {countries.map((code) => (
                          <option key={code.name + code.dial_code}>
                            {code.dial_code}
                          </option>
                        ))}
                      </Form.Select>
                      <Form.Control
                        type="text"
                        required
                        maxLength={10}
                        placeholder="Emergency Number"
                        value={ecnumber}
                        className="input select "
                        inputMode="numeric"
                        pattern="[0-9]*"
                        onChange={(event) => handleEcNumber(event)}
                      />
                    </div>
                  </Form.Group>
                </Row>

                <div style={{ paddingTop: "10px", textAlign: "center" }}>
                  <Button
                    className="primary"
                    onClick={handleNext1}
                    style={{ width: "150px" }}
                  >
                    Next
                  </Button>
                </div>
              </div>
              <div style={{ marginBottom: "20px" }}></div>
            </div>
          )}
          {currentStep === 2 && (
            <div className="mb-5">
              <div
                style={{
                  textAlign: "left",
                  border: "1px solid black",
                  borderRadius: "5px",
                  position: "relative",
                  marginTop: "20px",
                  padding: "10px",
                }}
              >
                <Row className="mb-4 mt-4 left">
                  <Form.Group as={Col} className="input-label">
                    <Form.Label className="label">
                      ID Type<span className="mandatory">*</span>
                    </Form.Label>
                    <Form.Select
                      size="md"
                      className="input select"
                      required
                      value={idtype}
                      onChange={handleIdType}
                    >
                      <option disabled value="">
                        Select one
                      </option>
                      {idType.map((s) => (
                        <option key={s.id + s.idType} value={s.idType}>
                          {s.idType}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>

                  <Form.Group as={Col} className="input-label">
                    <Form.Label className="label">
                      ID Number<span className="mandatory">*</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      size="md"
                      required
                      placeholder="Enter valid ID number"
                      value={idnum}
                      maxLength={handleNumberLength()}
                      className="input select"
                      onChange={(ev) => handleIdNumber(ev)}
                    />
                  </Form.Group>

                  <Form.Group as={Col} className="input-label">
                    <Form.Label className="label">
                      Preferred Language<span className="mandatory">*</span>
                    </Form.Label>
                    <Form.Select
                      size="md"
                      required
                      className="input select"
                      value={lang}
                      onChange={(ev) => handleLang(ev)}
                    >
                      <option disabled value="">
                        Select one
                      </option>

                      {preferredLang.map((event) => (
                        <option key={event.columnName}>
                          {event.columnName.toUpperCase()}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Row>
                <Row className="mb-4 left">
                  <Form.Group as={Col} className="input-label">
                    <Form.Label className="label">
                      Religion<span className="mandatory">*</span>
                    </Form.Label>
                    <Form.Select
                      size="md"
                      required
                      className="input select"
                      value={religion}
                      onChange={(ev) => handleReligion(ev)}
                    >
                      <option disabled value="">
                        Select one
                      </option>

                      {religionData.map((s) => (
                        <option
                          key={s.id + s.religionData}
                          value={s.religionData}
                        >
                          {s.religionData}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                  <Form.Group as={Col} className="input-label">
                    <Form.Label className="label">
                      Special Assistance<span className="mandatory">*</span>
                    </Form.Label>
                    <Form.Select
                      type="text"
                      size="md"
                      required
                      placeholder="Enter any assistance you may need"
                      value={assist}
                      className="input select"
                      onChange={(ev) => handleAssist(ev)}
                    >
                      <option disabled value="">
                        Select one
                      </option>
                      <option>WHEEL CHAIR</option>
                      <option>STRETCHER</option>
                      <option>NOT APPLICABLE</option>
                    </Form.Select>
                  </Form.Group>
                  <Form.Group as={Col} className="input-label">
                    <Form.Label className="label">
                      Blood Group<span className="mandatory">*</span>
                    </Form.Label>
                    <Form.Select
                      size="md"
                      required
                      className="input select"
                      value={blood}
                      onChange={(ev) => handleBlood(ev)}
                    >
                      <option disabled value="">
                        Select one
                      </option>

                      {bloodGroups.map((s) => (
                        <option
                          key={s.id + s.bloodGroups}
                          value={s.bloodGroups}
                        >
                          {s.bloodGroups}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Row>
                <Row>
                  <Form.Group as={Col} className="input-label">
                    <Form.Label className="label">
                      Referral Source<span className="mandatory">*</span>
                    </Form.Label>
                    <Form.Select
                      size="md"
                      type="text"
                      required
                      value={resource}
                      className="input select"
                      onChange={(ev) => handleReferral(ev)}
                    >
                      <option disabled value="">
                        Select one
                      </option>

                      <option>Walk In</option>
                      <option>DG-Website</option>
                      <option>Newspaper</option>
                      <option>DG-Social Media</option>
                      <option>Friend/Family</option>
                      <option>Corporate Tie-up</option>
                      <option>Neighbourhood</option>
                      <option>Doctor Referral</option>
                      <option>DG-Just Dial</option>
                      <option>GBR</option>
                      <option>DG-Info</option>
                      <option>DG-Practo</option>
                      <option>Breast cancer awareness</option>
                      <option>SMS </option>
                      <option>ATL-Radio</option>
                      <option>ATL-Print Ads</option>
                      <option>ATL-PR</option>
                      <option>BD-Paper Inserts</option>
                      <option>Billboard</option>
                      <option>Patient Referral</option>
                      <option>Employee Referral</option>
                      <option>Whatsapp</option>
                      <option>IPS</option>
                    </Form.Select>
                  </Form.Group>
                  <Form.Group as={Col} className="input-label">
                    <Form.Label className="label" style={{ width: "100px" }}>
                      ID Proof
                      <span>(.png, .jpeg, .pdf)</span>
                    </Form.Label>
                    <Form.Control
                      size="md"
                      type="file"
                      required
                      accept="image/*,.pdf"
                      className="input select"
                      onChange={handleFileSelect}
                    ></Form.Control>
                  </Form.Group>
                </Row>
                <div
                  style={{
                    marginTop: "50px",
                    paddingTop: "10px",
                    textAlign: "center",
                    display: "flex",
                    gap: "20px",
                    alignItems: "center",
                    justifyContent: "center",
                    alignContent: "center",
                  }}
                >
                  <Button
                    className="primary"
                    onClick={handlePrev}
                    style={{ width: "150px" }}
                  >
                    Back
                  </Button>
                  <Button
                    className="primary"
                    onClick={handleNext2}
                    style={{ width: "150px" }}
                  >
                    Next
                  </Button>
                </div>
                <div style={{ marginBottom: "20px" }}></div>
              </div>
            </div>
          )}
          {currentStep === 3 && (
            <div>
              <div
                style={{
                  textAlign: "left",
                  border: "1px solid black",
                  borderRadius: "5px",
                  position: "relative",
                  marginTop: "20px",
                  padding: "10px",
                }}
              >
                <h2 className="absolute">Tell us how to Contact you</h2>
                <Row className="mb-4 mt-4 left ">
                  <Form.Group as={Col} className="input-label">
                    <Form.Label className="label">
                      Mobile Number<span className="mandatory">*</span>
                    </Form.Label>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                      className="input"
                    >
                      <Form.Select
                        size="sm"
                        required
                        style={{
                          width: "70px",
                          height: "40px",
                          fontWeight: "600",
                          backgroundImage: "none",
                        }}
                        value={phonecode2}
                        onChange={(e) =>
                          setPhonecode2((prevPhoneCode) =>
                            prevPhoneCode.replace(phonecode2, e.target.value)
                          )
                        }
                        className="select"
                      >
                        {countries.map((s) => (
                          <option key={s.name + s.dial_code}>
                            {s.dial_code}
                          </option>
                        ))}
                      </Form.Select>
                      <Form.Control
                        type="text"
                        required
                        size="md"
                        placeholder="Enter mobile number"
                        maxLength={10}
                        value={mobile}
                        inputMode="numeric"
                        pattern="[0-9]*"
                        onChange={(event) => handleMobile(event)}
                        className="input select"
                      />
                    </div>
                  </Form.Group>

                  <Form.Group as={Col} className="input-label">
                    <Form.Label className="label">
                      Email ID<span className="mandatory">*</span>
                    </Form.Label>
                    <Form.Control
                      type="email"
                      required
                      size="md"
                      placeholder="Enter email"
                      value={email}
                      className="input select"
                      onChange={(event) => handleEmail(event)}
                    />
                  </Form.Group>

                  <Form.Group as={Col} className="input-label">
                    <Form.Label className="label">
                      Country<span className="mandatory">*</span>
                    </Form.Label>
                    <Form.Select
                      size="md"
                      className="input select"
                      value={country}
                      onChange={(event) => setCountry(event.target.value)}
                    >
                      <option value="">Select one</option>
                      {countries.length && (
                        <>
                          {nationals.map((item) => (
                            <option
                              key={item.countryID}
                              value={item.countryName}
                            >
                              {item.countryName}
                            </option>
                          ))}
                        </>
                      )}
                    </Form.Select>
                  </Form.Group>
                </Row>
                <Row className="mb-4 left">
                  <Form.Group as={Col} className="input-label">
                    <Form.Label className="label">
                      Pincode<span className="mandatory">*</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      size="md"
                      required
                      maxLength={6}
                      inputMode="numeric"
                      pattern="[0-9]*"
                      placeholder="Enter Pincode"
                      value={pincode}
                      className="input select"
                      onChange={handlePincodeChange}
                    />
                    {/* {search && <CSpinner size="sm" style={{ zIndex: "-5" }} />} */}
                  </Form.Group>

                  <Form.Group as={Col} className="input-label">
                    <Form.Label className="label">
                      State<span className="mandatory">*</span>
                    </Form.Label>

                    <Form.Control
                      size="md"
                      className="input select"
                      defaultValue={state.toUpperCase()}
                      required
                      // onChange={handleStateChange}
                    >
                      {/* <option>{state}</option> */}
                    </Form.Control>
                  </Form.Group>
                  <Form.Group as={Col} className="input-label">
                    <Form.Label className="label">
                      City<span className="mandatory">*</span>
                    </Form.Label>
                    <Form.Control
                      size="md"
                      className="input select"
                      defaultValue={city.toUpperCase()}
                      required
                    >
                      {/* <option>{city}</option> */}
                    </Form.Control>
                  </Form.Group>
                </Row>
                <Row className="mb-4 left">
                  <Form.Group as={Col} className="input-label">
                    <Form.Label className="label">
                      Area<span className="mandatory">*</span>
                    </Form.Label>
                    <Form.Select
                      size="md"
                      className="input select"
                      // value={area.toUpperCase()}
                      value={area}
                      onChange={(event) => setArea(event.target.value)}
                      required
                    >
                      <option value="">Select one</option>
                      {areas.length && (
                        <>
                          {areas.map((value) => {
                            return (
                              <option key={value.columnName}>
                                {value.columnName}
                              </option>
                            );
                          })}
                        </>
                      )}
                    </Form.Select>
                  </Form.Group>

                  <Form.Group as={Col} className="input-label">
                    <Form.Label className="label">
                      Door No./ Apartment Name
                      <span className="mandatory">*</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      size="md"
                      required
                      placeholder="Door No./ Apartment Name"
                      value={door.toUpperCase()}
                      className="input select"
                      onChange={(event) => handleDoor(event)}
                    />
                  </Form.Group>
                  <Form.Group as={Col} className="input-label">
                    <Form.Label className="label">
                      Street/ Locality<span className="mandatory">*</span>
                    </Form.Label>

                    <Form.Control
                      type="text"
                      size="md"
                      required
                      placeholder="Street/ Locality"
                      value={street.toUpperCase()}
                      className="input select"
                      onChange={(event) => handleStreet(event)}
                    />
                  </Form.Group>
                </Row>
                <div
                  style={{
                    paddingTop: "10px",
                    textAlign: "center",
                    display: "flex",
                    gap: "20px",
                    alignItems: "center",
                    justifyContent: "center",
                    alignContent: "center",
                  }}
                >
                  <Button
                    className="primary"
                    onClick={handlePrev}
                    style={{ width: "150px" }}
                  >
                    Back
                  </Button>
                  <Button
                    className="primary"
                    onClick={handleNext3}
                    style={{ width: "150px" }}
                  >
                    Next
                  </Button>
                </div>
              </div>
              <div style={{ marginBottom: "20px" }}></div>
            </div>
          )}
          {currentStep === 4 && (
            <div>
              <div
                style={{
                  textAlign: "left",
                  border: "1px solid black",
                  borderRadius: "5px",
                  position: "relative",
                  marginTop: "20px",
                }}
              >
                <h2 className="absolute">Communicable Disease screening </h2>

                <p className="para">
                  Dear Patient, This evaluation form is to take care of you with
                  guidance, incorporating special precautions.
                  {/* <p className="">
                    This evaluation form is to take care of you with guidance,
                    incorporating special precautions.
                  </p> */}
                </p>

                <div className="query">
                  <div>
                    <p>
                      Are you suffering from fever, cough, or any respiratory
                      symptoms in last one week?
                      <span className="mandatory">*</span>
                    </p>
                  </div>
                  <div>
                    {["radio"].map((type) => (
                      <div key={`default-${type}`} className="mb-3 check">
                        <div className="flex">
                          <Form.Check
                            type="radio"
                            id="yes"
                            name={`cough`}
                            value="Yes"
                            label="Yes"
                            checked={cough === "Yes"}
                            onChange={handleCough}
                          />
                          <Form.Check
                            type="radio"
                            id="no"
                            name={`cough`}
                            value="No"
                            label="No"
                            checked={cough === "No"}
                            onChange={handleCough}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="query">
                  <div>
                    <p>
                      Do you have any history of fever and rashes in the past
                      two weeks?<span className="mandatory">*</span>
                    </p>
                  </div>
                  <div>
                    {["radio"].map((type) => (
                      <div key={`default-${type}`} className="mb-3 check">
                        <div className="flex">
                          <Form.Check
                            type="radio"
                            id="yes"
                            name={`rashes`}
                            value="Yes"
                            label="Yes"
                            checked={rashes === "Yes"}
                            onChange={handleRashes}
                          />
                          <Form.Check
                            type="radio"
                            id="no"
                            name={`rashes`}
                            value="No"
                            label="No"
                            checked={rashes === "No"}
                            onChange={handleRashes}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="query">
                  <div>
                    <p>
                      Have you travelled out of country in last 1 month?
                      <span className="mandatory">*</span>
                    </p>
                  </div>
                  <div>
                    {["radio"].map((type) => (
                      <div key={`default-${type}`} className="mb-3 check">
                        <div className="flex">
                          <Form.Check
                            type="radio"
                            id="yes"
                            name={`travel`}
                            value="Yes"
                            label="Yes"
                            checked={travel === "Yes"}
                            onChange={handleTravel}
                          />
                          <Form.Check
                            type="radio"
                            id="no"
                            name={`travel`}
                            value="No"
                            label="No"
                            checked={travel === "No"}
                            onChange={handleTravel}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="query">
                  <div>
                    <p>
                      Has there been any disease outbreak like swine flu, Ebola.
                      Covid- 19 in your community?
                      <span className="mandatory">*</span>
                    </p>
                  </div>
                  <div>
                    {["radio"].map((type) => (
                      <div key={`default-${type}`} className="mb-3 check">
                        <div className="flex">
                          <Form.Check
                            type="radio"
                            id="yes"
                            name={`flu`}
                            value="Yes"
                            label="Yes"
                            checked={flu === "Yes"}
                            onChange={handleFlu}
                          />
                          <Form.Check
                            type="radio"
                            id="no"
                            name={`flu`}
                            value="No"
                            label="No"
                            checked={flu === "No"}
                            onChange={handleFlu}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="query">
                  <div>
                    <p>
                      Are you a health care worker? (Nurse, Physician, allied
                      health service personnel, Laboratory worker)
                      <span className="mandatory">*</span>
                    </p>
                  </div>
                  <div>
                    {["radio"].map((type) => (
                      <div key={`default-${type}`} className="mb-3 check">
                        <div className="flex">
                          <Form.Check
                            type="radio"
                            id="yes"
                            name={`hcworker`}
                            value="Yes"
                            label="Yes"
                            checked={hcworker === "Yes"}
                            onChange={handleHcworker}
                          />
                          <Form.Check
                            type="radio"
                            id="no"
                            name={`hcworker`}
                            value="No"
                            label="No"
                            checked={hcworker === "No"}
                            onChange={handleHcworker}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="query">
                  <div>
                    <p>
                      Have you been exposed to any of the following disease in
                      last 1 month?<span className="mandatory">*</span>
                    </p>
                  </div>
                  <div>
                    {["radio"].map((type) => (
                      <div key={`default-${type}`} className="mb-3 check">
                        <div className="flex">
                          <Form.Check
                            type={type}
                            id={`default-${type}`}
                            name={`disease`}
                            label={`Yes`}
                            value={`Yes`}
                            checked={radioValue === "Yes"}
                            onChange={handleRadioChange}
                          />
                          <Form.Check
                            type={type}
                            id={`default-${type}`}
                            name={`disease`}
                            label={`No`}
                            value={`No`}
                            checked={radioValue === "No"}
                            onChange={handleRadioChange}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ paddingLeft: "30px" }}>
                  {["checkbox"].map((type) => (
                    <div key={`default-${type}`} className="mb-3 check">
                      <div style={{ fontWeight: "600" }}>
                        <Form.Check
                          type={type}
                          id={`default-${type}-ChickenPox`}
                          name="ChickenPox"
                          label="Chicken Pox"
                          checked={diseaseStatus.ChickenPox}
                          disabled={checkboxDisabled}
                          onChange={handleDisease}
                        />
                      </div>
                      <div style={{ fontWeight: "600" }}>
                        <Form.Check
                          type={type}
                          id={`default-${type}-Measles`}
                          name="Measles"
                          label="Measles"
                          checked={diseaseStatus.Measles}
                          disabled={checkboxDisabled}
                          onChange={handleDisease}
                        />
                      </div>
                      <div style={{ fontWeight: "600" }}>
                        <Form.Check
                          type={type}
                          id={`default-${type}-Mumps`}
                          name="Mumps"
                          label="Mumps"
                          checked={diseaseStatus.Mumps}
                          disabled={checkboxDisabled}
                          onChange={handleDisease}
                        />
                      </div>
                      <div style={{ fontWeight: "600" }}>
                        <Form.Check
                          type={type}
                          id={`default-${type}-Rubella`}
                          name="Rubella"
                          label="Rubella"
                          checked={diseaseStatus.Rubella}
                          disabled={checkboxDisabled}
                          onChange={handleDisease}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="query">
                  <div>
                    <p>
                      Currently are you having any diarrhea symptoms?
                      <span className="mandatory">*</span>
                    </p>
                  </div>
                  <div>
                    {["radio"].map((type) => (
                      <div key={`default-${type}`} className="mb-3 check">
                        <div className="flex">
                          <Form.Check
                            type="radio"
                            id="yes"
                            name={`diarrhea`}
                            value="Yes"
                            label="Yes"
                            checked={diarrhea === "Yes"}
                            onChange={handleDiarrhea}
                          />
                          <Form.Check
                            type="radio"
                            id="no"
                            name={`diarrhea`}
                            value="No"
                            label="No"
                            checked={diarrhea === "No"}
                            onChange={handleDiarrhea}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="query">
                  <div>
                    <p>
                      Have you been told/ referred by a health care provider
                      that you have active TB?
                      <span className="mandatory">*</span>
                    </p>
                  </div>
                  <div>
                    {["radio"].map((type) => (
                      <div key={`default-${type}`} className="mb-3 check">
                        <div className="flex">
                          <Form.Check
                            type="radio"
                            id="yes"
                            name={`tb`}
                            value="Yes"
                            label="Yes"
                            checked={tb === "Yes"}
                            onChange={handleTb}
                          />
                          <Form.Check
                            type="radio"
                            id="no"
                            name={`tb`}
                            value="No"
                            label="No"
                            checked={tb === "No"}
                            onChange={handleTb}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                {/* </div> */}
              </div>
              {/* <div
                style={{
                  textAlign: "left",
                  border: "1px solid black",
                  borderRadius: "5px",
                  position: "relative",
                  marginTop: "50px",
                  paddingTop: "10px",
                }}
              > */}

              <div>
                <div
                  style={{
                    textAlign: "left",
                    border: "1px solid black",
                    borderRadius: "5px",
                    position: "relative",
                    marginTop: "50px",
                  }}
                >
                  <h2 className="absolute">General consent</h2>
                  <p className="para justify">
                    I ( Responsible relative/ Patient ) here by consent to
                    authorize Dr. Rela Institute & Medical Centre's physicians
                    and medical professionals to administer and perform medical
                    examination, routine investigations, medical treatment,
                    outpatient procedures, vaccinations and immunization during
                    patient's care, be deemed necessary.
                  </p>
                  <p className="justify">
                    Agreeing this also gives consent to the hospital to use
                    medical information for insurance coverage and to contact
                    him or her by telephone, if needed, regarding appointment
                    and follow-up needs. The consent given online will be
                    considered for offline purposes as well.
                  </p>
                  <p className="justify">
                    I would like to receive whatsapp messages, SMSs and emails
                    from the hospital.
                  </p>
                  <div
                    className="consent"
                    style={{ paddingTop: "10px", marginBottom: "20px" }}
                  >
                    <div>
                      <Button
                        className="primary"
                        onClick={handlePrev}
                        style={{ width: "150px" }}
                      >
                        Previous
                      </Button>
                    </div>

                    <div>
                      <Button
                        className="primary"
                        onClick={handleSubmit}
                        style={{ width: "150px" }}
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Please wait..." : "I Agree"}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Form>
        <ToastContainer position={toast.POSITION.TOP_CENTER} />
        {false && <PaymentInfo data={{ salutation, firstName, lastName }} />}
      </Row>
      <div style={{ marginBottom: "20px" }}></div>
    </Container>
  );
}

export const formValues = {};
export default Registration;
