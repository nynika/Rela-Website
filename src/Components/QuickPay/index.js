import { useState, useContext } from 'react';
import axios from 'axios';
import { userContext } from '../QuickPay/UserContextProvider';
import './payment_Test.css';
import {
  Container,
  Form,
  Row,
  Col,
  Button,
  Dropdown,
  DropdownButton,
  ButtonGroup,
} from 'react-bootstrap';

function Payments() {
  const {} = useContext(userContext);

  // Define State Variables
  const [mobile, setMobile] = useState('');
  const [doctor, setDoctor] = useState('');
  const [doctorID, setDoctorID] = useState('');
  const [appDate, setAppDate] = useState('');
  const [name, setName] = useState('');
  const [uhidOptions, setUhidOptions] = useState([]);
  const [selectedUhid, setSelectedUhid] = useState('');
  const [appTime, setAppTime] = useState('');
  const [consFees, setConsFees] = useState('');
  const [email, setEmail] = useState('');
  const [appid, setAppid] = useState('');
  const [refID, setRefID] = useState('');

  // Fetch Comments (Appointment Details) by Mobile Number
  const fetchComments = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get(
        `https://www.relainstitute.in/relalive/api/HIS/GetPortal_PatDtl_New?mobileno=${mobile}`
      );
      if (response && response.data) {
        setUhidOptions(response.data);

        if (response.data.length === 0) {
          alert('No appointment found for this mobile number.');
          resetFields();
          return;
        }

        const firstAppointment = response.data[0];
        setName(firstAppointment.patientName);
        setDoctor(firstAppointment.doctor);
        setAppDate(firstAppointment.appDate.split(' ')[0]);
        setAppTime(firstAppointment.appTime);
        setConsFees(firstAppointment.charges);
        setEmail(firstAppointment.email);
        setDoctorID(firstAppointment.doctorId);
        setAppid(firstAppointment.appointmentId);
        setSelectedUhid(firstAppointment.uhid);
      } else {
        alert('Invalid response from the server. Please try again.');
      }
    } catch (error) {
      console.error('Error fetching appointment details:', error);
      alert('Error occurred while fetching details. Please try again.');
    }
  };

  // Reset All Fields
  const resetFields = () => {
    setName('');
    setDoctor('');
    setAppDate('');
    setAppTime('');
    setConsFees('');
    setEmail('');
    setDoctorID('');
    setAppid('');
    setSelectedUhid('');
  };

  // Handle UHID Change
  const handleUhidChange = (selectedId) => {
    setSelectedUhid(selectedId);
    const selectedAppointment = uhidOptions.find(
      (appointment) => appointment.uhid === selectedId
    );
    if (selectedAppointment) {
      setName(selectedAppointment.patientName);
      setDoctor(selectedAppointment.doctor);
      setAppDate(selectedAppointment.appDate.split(' ')[0]);
      setAppTime(selectedAppointment.appTime);
      setConsFees(selectedAppointment.charges);
      setEmail(selectedAppointment.email);
      setDoctorID(selectedAppointment.doctorId);
      setAppid(selectedAppointment.appointmentId);
    }
  };

  // Handle Payment Submission
  const handlePaymentSubmission = async (event) => {
    event.preventDefault();

    // Generate the unique RefID (Processing ID)
    const date = new Date();
    const sumofVal = `${date.getDate()}${date.getMonth()}${date.getFullYear()}${date.getHours()}${date.getMinutes()}${date.getSeconds()}`;

    // Save RefID in State (will be used for Payment)
    setRefID(sumofVal);

    try {
      const currentDate = new Date().toISOString().slice(0, 10);
      await axios.post(
        'https://www.relainstitute.in/relalive/api/HIS/updateOnlinePayment',
        {
          RefID: sumofVal,
          RefType: 'PayAtHospital',
          PatientID: selectedUhid,
          PatientName: name,
          MobileNo: mobile,
          EmailID: email,
          DoctorID: doctorID,
          TransactionDate: currentDate,
          TransactionID: '',
          TransactionAmount: consFees,
          PaymentMode: '',
          StatusCode: '',
          StatusMsg: '',
          PaymentStatus: 'Pending',
          Remarks: '',
          IsActiveflg: 0,
          CreatedCode: 'MEFTEC',
          bloodGroup: '22',
          Religion: '7',
          PrefferedLanguage: '17',
          APPStartDate: appDate,
          APPEndDate: appTime,
          AppointmentId: appid,
        }
      );

      const params = new URLSearchParams();
      params.append('PatientID', selectedUhid);
      params.append('PatientName', name);
      params.append('AppointmentID', appid);
      params.append('chargerate', consFees);
      params.append('email', email);
      params.append('mobileno', mobile);
      params.append('processingid', sumofVal); // Pass the generated RefID as processingid
      params.append(
        'token',
        JSON.stringify({
          auth: {
            user: 'jrsuperspecialityadmin',
            key: 'uwVoleGcWIHfgUwgmOMYR8lgx1G7gCz6',
          },
          username: 'Patient',
          accounts: [
            {
              patient_name: name,
              account_number: `UHID${selectedUhid}`,
              amount: consFees,
              email: email,
              phone: mobile,
            },
          ],
          processing_id: sumofVal, // Pass the same RefID here as processing_id
          paymode: '',
          transaction_type: '',
          package_code: '',
          appointment_id: appid,
          payment_location: 'Rela Hospital',
          return_url:
            'https://www.relainstitute.in/his_payment/Forms/payment_result_live.aspx',
          response_url:
            'https://www.relainstitute.in/his_payment/Forms/payment_result_live.aspx',
        })
      );
      params.append('mid', 'KkZma9ph');
      params.append(
        'check_sum_hash',
        'ODFjYzNjMzM2ODE1ZmUwMzZkN2U1YjJkYzg5YmM3YzU4M2E3N2I1OWJmNTE5MDZiMGNhNWVjZWUyNmY0NjA0NQ=='
      );

      // Send Request to Payment Gateway
      const response = await fetch(
        'https://rela.momentpay.live/ma/patient/app/payments',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: params.toString(),
        }
      );

      const text = await response.text();
      console.log('Response Text:', text);

      // Extract the Redirect URL and Navigate the User
      const match = text.match(/window\.open\(["'](.+?)["']/);
      if (match) {
        window.location.href = match[1].trim();
      } else {
        console.error('Could not extract the redirect URL.');
      }
    } catch (error) {
      console.error('Error during payment processing:', error);
    }
  };

  return (
    <Container>
      <Row>
        <Form>
          <div>
            <div
              style={{
                textAlign: 'left',
                border: '1px solid black',
                borderRadius: '5px',
                position: 'relative',
                padding: '10px',
                marginTop: '60px',
              }}
            >
              <h2 className='absolute'>Pay at Hospital</h2>

              <Row className='mb-5 mt-5 left'>
                <Form.Group as={Col}>
                  <Form.Label className='quickpay_label' id='mobile'>
                    Mobile No:
                  </Form.Label>
                  <Form.Control
                    className='quickpay_input'
                    type='text'
                    value={mobile}
                    maxLength={10}
                    placeholder='Enter the mobile number'
                    required
                    onChange={(e) => {
                      const value = e.target.value;
                      if (/^\d{0,10}$/.test(value)) {
                        setMobile(value);
                      }
                    }}
                  />
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label></Form.Label>
                  <Form.Control
                    value='Search'
                    className='search-button1 btn-primary'
                    onClick={fetchComments}
                    readOnly
                  />
                </Form.Group>
              </Row>

              <Row className='mb-5 left'>
                <Form.Group as={Col}>
                  <Form.Label className='quickpay_label'>UHID</Form.Label>
                  <DropdownButton
                    as={ButtonGroup}
                    variant='primary'
                    title={selectedUhid || 'Select UHID'}
                    onSelect={handleUhidChange}
                  >
                    {uhidOptions.map((appointment) => (
                      <Dropdown.Item
                        key={appointment.uhid}
                        eventKey={appointment.uhid}
                      >
                        {appointment.uhid}
                      </Dropdown.Item>
                    ))}
                  </DropdownButton>
                </Form.Group>

                <Form.Group as={Col}>
                  <Form.Label className='quickpay_label'>
                    Patient Name
                  </Form.Label>
                  <Form.Control
                    className='quickpay_input'
                    name='name'
                    type='text'
                    value={name}
                    readOnly
                  />
                </Form.Group>

                <Form.Group as={Col}>
                  <Form.Label className='quickpay_label'>
                    Doctor Name
                  </Form.Label>
                  <Form.Control
                    className='quickpay_input'
                    name='doctor'
                    type='text'
                    value={doctor}
                    readOnly
                  />
                </Form.Group>
              </Row>

              <Row className='mb-5 left'>
                <Form.Group as={Col}>
                  <Form.Label className='quickpay_label'>
                    Appointment Date
                  </Form.Label>
                  <Form.Control
                    className='quickpay_input'
                    name='appDate'
                    type='text'
                    value={appDate}
                    readOnly
                  />
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label className='quickpay_label'>
                    Appointment Time
                  </Form.Label>
                  <Form.Control
                    className='quickpay_input'
                    name='appTime'
                    type='text'
                    value={appTime}
                    readOnly
                  />
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label className='quickpay_label'>
                    Consultation Fee
                  </Form.Label>
                  <Form.Control
                    className='quickpay_input'
                    name='consfees'
                    type='text'
                    value={consFees}
                    readOnly
                  />
                </Form.Group>
              </Row>
            </div>

            <div
              style={{
                paddingTop: '10px',
                textAlign: 'center',
                marginBottom: '20px',
              }}
            >
              <Button
                className='mt-3'
                variant='success'
                onClick={handlePaymentSubmission}
              >
                Proceed to Pay
              </Button>
            </div>
          </div>
        </Form>
      </Row>
    </Container>
  );
}

export default Payments;
