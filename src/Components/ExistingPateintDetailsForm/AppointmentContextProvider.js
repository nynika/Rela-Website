import React, { createContext, useState } from "react";

export const appointmentContext = React.createContext({});

const AppointmentContextProvider = ({ children }) => {
  const [appointmentPage, setAppointmentPage] = useState({
    emailId: "",
    timeSlot: "",
    appointmentDate: "",
    doctorName: "",
    uhid: "",
    age: "",
    patientName: "",
    appointmentID: "",
    msgDescp: "",
    sno: "",
  });
  return (
    <div>
      <appointmentContext.Provider
        value={{ appointmentPage, setAppointmentPage }}
      >
        {children}
      </appointmentContext.Provider>
    </div>
  );
};

export default AppointmentContextProvider;
