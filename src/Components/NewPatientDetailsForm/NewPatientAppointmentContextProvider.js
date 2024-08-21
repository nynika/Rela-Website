import React, { createContext, useState } from "react";

export const newPatientAppointmentContext = React.createContext({});
const NewPatientAppointmentContextProvider = ({ children }) => {
  const [appointmentPage, setAppointmentPage] = useState({

    sno: "",
    uhid: "",
    msgDescp: "",
    appointmentID: "",
    doctorName: "",
    appointmentDate: "",
    timeSlot: "",
    patientName: "",
    age: "",
    emailId: "",
  });
  return (
    <div>
      <newPatientAppointmentContext.Provider
        value={{ appointmentPage, setAppointmentPage }}
      >
        {children}
      </newPatientAppointmentContext.Provider>
    </div>
  );
};

export default NewPatientAppointmentContextProvider;
