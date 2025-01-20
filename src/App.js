import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './Components/NavBar/NavBar';
import Registration from './Components/Registration/Registration';
import BookAnAppointment from './Components/Appointment/BookAnAppointment';
import ExistingPatientDetails from './Components/ExistingPateintDetailsForm';
import { ExistingPatientContextProvider } from './Components/ExistingPatientContextProvider';
import AppointmentContextProvider from '../src/Components/ExistingPateintDetailsForm/AppointmentContextProvider';
import AppointmentConfirmation from './Components/AppointmentConfirmationPage';
import { NewPatientContextProvider } from './Components/NewPatientContextProvider';
import NewPatientDetails from './Components/NewPatientDetailsForm';
import NewAppointmentConfirmation from './Components/NewAppointmentConfirmationPage';
import NewPatientAppointmentContextProvider from './Components/NewPatientDetailsForm/NewPatientAppointmentContextProvider';
import TermsAndConditions from './Components/TermsAndConditions';
import Buttons from './Components/Buttons';
import Payments from './Components/QuickPay';
import UserContextProvider from './Components/QuickPay/UserContextProvider';
import Appointmentdetails from './Components/appointment-details/AppointmentDetails';
import Quickpaycomponent from './Components/pages/quick-pay/quick-pay.component';

import './App.css';

function App() {
  return (
    <div>
      <UserContextProvider>
        <ExistingPatientContextProvider>
          <AppointmentContextProvider>
            <NewPatientContextProvider>
              <NewPatientAppointmentContextProvider>
                <Router>
                  <header>
                    <NavBar />
                  </header>
                  <Buttons />
                  <Routes>
                    <Route path='/' element={<BookAnAppointment />} />
                    <Route
                      path='/newpatient-creation'
                      element={<Registration />}
                    />
                    <Route
                      path='/existing-patient-booking'
                      element={<ExistingPatientDetails />}
                    />
                    <Route
                      path='/new-patient-booking'
                      element={<NewPatientDetails />}
                    />
                    <Route
                      path='/appointment-confirmation'
                      element={<AppointmentConfirmation />}
                    />
                    <Route
                      path='/newappointment-confirmation'
                      element={<NewAppointmentConfirmation />}
                    />
                    <Route path='/quickpay' element={<Payments />} />

                    <Route
                      path='/appointment-details'
                      element={<Appointmentdetails />}
                    />

                    <Route
                      path='/ServiceQuickPay'
                      element={<Quickpaycomponent />}
                    />
                  </Routes>

                  <TermsAndConditions />
                </Router>
              </NewPatientAppointmentContextProvider>
            </NewPatientContextProvider>
          </AppointmentContextProvider>
        </ExistingPatientContextProvider>
      </UserContextProvider>
    </div>
  );
}

export default App;
