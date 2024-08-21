import React, { useState } from "react";

export const newPatientContext = React.createContext({});

export const NewPatientContextProvider = ({ children }) => {
  const [newPatientData, setNewPatientData] = useState({
    /* name: "",
    mobile: "",
    dob: "",
    gender: "",
    uhid: "",
    department: "",
    age: "",
    doctor: "",
    selectDate: "",
    selectTime: "",
    amount: "",
    doctorid: "",
    startTime: "",
    endTime: "",
    email: "",
    salutation: "",
    countrycode: "",
    refId: "", */

    name: "",
    mobile: "",
    dob: "",
    gender: "",
    uhid: "",
    department: "",
    age: "",
    doctor: "",
    selectDate: "",
    selectTime: "",
    amount: "",
    doctorid: "",
    startTime: "",
    endTime: "",
    email: "",
    salutation: "",
    countrycode: "",
    country: "",
    nationality: "",
    appointmentID: "",
  });
  const [user, setUser] = useState([]);
  return (
    <div>
      <newPatientContext.Provider
        value={{ newPatientData, setNewPatientData, setUser, user }}
      >
        {children}
      </newPatientContext.Provider>
    </div>
  );
};
