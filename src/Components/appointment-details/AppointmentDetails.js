
import React from 'react';
import { Button, Container, Row, Col, Card } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';

const AppointmentDetails = () => {
    const location = useLocation();
    const { PatientID, PatientName, AppointmentId, ChargeRate, Email, MobileNo, ProcessingId } = location.state || {};

    const handleNextStep = async () => {
        const params = new URLSearchParams();
        params.append("PatientID", PatientID);
        params.append("PatientName", PatientName);
        params.append("AppointmentID", AppointmentId);
        params.append("chargerate", ChargeRate);
        params.append("email", Email);
        params.append("mobileno", MobileNo);
        params.append("processingid", ProcessingId);
        params.append("token", JSON.stringify({
            auth: {
                user: 'jrsuperspecialityadmin',
                key: 'uwVoleGcWIHfgUwgmOMYR8lgx1G7gCz6'
            },
            username: "Patient",
            accounts: [
                {
                    patient_name: PatientName,
                    account_number: `UHID${PatientID}`,
                    amount: ChargeRate,
                    email: Email,
                    phone: MobileNo
                }
            ],
            processing_id: ProcessingId,
            paymode: "",
            transaction_type: "",
            package_code: "",
            appointment_id: AppointmentId,
            payment_location: "Rela Hospital",
            return_url: "https://www.relainstitute.in/his_payment/Forms/payment_result_live.aspx",
            response_url: "https://www.relainstitute.in/his_payment/Forms/payment_result_live.aspx"
        }));
        params.append("mid", "KkZma9ph");
        params.append("check_sum_hash", "ODFjYzNjMzM2ODE1ZmUwMzZkN2U1YjJkYzg5YmM3YzU4M2E3N2I1OWJmNTE5MDZiMGNhNWVjZWUyNmY0NjA0NQ==");

        try {
            const response = await fetch('https://rela.momentpay.live/ma/patient/app/payments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: params.toString()
            });

            const text = await response.text();
            console.log("Response Text:", text);

            // Extract the URL using regex and redirect
            const match = text.match(/window\.open\(["'](.+?)["']/);
            if (match) {
                window.location.href = match[1].trim();
            } else {
                console.error("Could not extract the redirect URL.");
            }
        } catch (error) {
            console.error("Error during request:", error);
        }
    };

    return (
        <Container className="mt-4">
        <Card>
            <Card.Body>
                <h2 className="mb-4 text-center"><strong>Appointment Details</strong></h2>
                <Row>
                    <Col md={6} className="mb-3 text-center">
                        <p><strong>Patient Name:</strong> {PatientName}</p>
                    </Col>
                    <Col md={6} className="mb-3 text-center">
                        <p><strong>Payable Amount:</strong> {ChargeRate}</p>
                    </Col>
                    <Col md={6} className="mb-3 text-center">
                        <p><strong>Email-ID:</strong> {Email}</p>
                    </Col>
                    <Col md={6} className="mb-3 text-center">
                        <p><strong>Mobile No:</strong> {MobileNo}</p>
                    </Col>
                    {/* Hidden fields */}
                    <input type="hidden" value={PatientID} />
                    <input type="hidden" value={AppointmentId} />
                    <input type="hidden" value={ProcessingId} />
                </Row>
              
                <div className="text-center mt-4">
                    <Button variant="primary" onClick={handleNextStep}>Proceed To Pay</Button>
                </div>
            </Card.Body>
        </Card>
    </Container>
    );
};

export default AppointmentDetails;
