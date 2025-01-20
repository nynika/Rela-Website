import React, { createContext, useState } from "react";
import "./payment_Test.css";


export const userContext = createContext();

const UserContextProvider = (props) => {
  const [user, setUser] = useState({
    Salutation: "",
    FirstName: "",
    LastName: "",
    DOB: "",
    Age: "",
    Gender: "",
    EmploymentStatus: "",
    MaritalStatus: "",
    Country: "",
    Nationality: "",
    EmergencyContactType: "",
    EmergencyContactName: "",
    EmergencyContactNumber: "",
    IdType: "",
    IdNumber: "",
    PreferredLanguage: "",
    SpecialAssistance: "",
    BloodGroup: "",
    ReferralSource: "",
    EmailId: "",
    MobileNumber: "",
    Pincode: "",
    State: "",
    City: "",
    Area: "",
    DoorNoAppartmentName: "",
    StreetLocality: "",
  });

  const updateUser = (name) => {
    setUser((prev) => ({ ...prev, ...name }));
  };
  return (
    <div>
      <userContext.Provider value={{ user, updateUser }}>
        {props.children}
      </userContext.Provider>
    </div>
  );
};

export default UserContextProvider;


