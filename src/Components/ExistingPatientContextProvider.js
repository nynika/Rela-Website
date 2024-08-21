import React, { useState, createContext } from "react";

export const existingPatientContext = React.createContext({});

export const ExistingPatientContextProvider = ({ children }) => {
  const [existingPatientData, setExistingPatientData] = useState({
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
    refId:"",
  });
  const [users, setUsers] = useState([]);
  return (
    <div>
      <existingPatientContext.Provider
        value={{ existingPatientData, setExistingPatientData, setUsers, users }}
      >
        {children}
      </existingPatientContext.Provider>
    </div>
  );
};
