import React, { useContext, useState, useLayoutEffect } from "react";
import axios from "axios";
import forge from "node-forge";

const PaymentInfo = (props) => {
  const [state, setState] = useState({
    PatientName: "",
    uhid: "",
    Mail: "",
    Mobile: "",
    ProcessingId: "",
    "charge rate": "",
    mid: "ieJCv3nB",
    check_sum_hash: "",
  });
  const myData = {
    refType: "Registration",
    patientName: state.PatientName,
    uhid: state.uhid,
    chargerate: state["charge rate"],
    email: state.Mail,
    mobileno: state.Mobile,
    processingid: state.ProcessingId,
    reqresponseurl:
      "https://appointment.relainstitute.com/patient-portal-his/payment_result_reg",
  };
  useLayoutEffect(() => {
    const check_sum_hash = generateHash(
      "jrsuperspecialityhospitalsprivatelimitedadmin|f4b093f9746747b17db05b7dc3420cfc5f46180c3e7af755cde20ed5a45514c8|" +
        myData.processingid +
        "|ieJCv3nB|A1JYGdTXGiK9kTflQZDY8bReHihFSCUZ"
    );

    setState((prev) => ({ ...prev, check_sum_hash: check_sum_hash }));
  }, [myData.processingid]);
  const generateHash = (text) => {
    let md = forge.md.sha256.create();
    md.start();
    md.update(text, "utf8");
    let hashtext = md.digest().toHex();
    let base64 = btoa(hashtext);
    return base64;
  };

  var token =
    '{"auth":{"user":"jrsuperspecialityhospitalsprivatelimitedadmin","key":"NZmo9FwtHGrkkSZXhhS4gb3LLdIJpqPj"},"username": "Patient", "accounts": [{"patient_name": "' +
    myData.patientName +
    '", "account_number": "UHID' +
    myData.uhid +
    '", "amount": "' +
    myData.chargerate +
    '", "email": "' +
    myData.email +
    '","phone": "' +
    myData.mobileno +
    '"}], "processing_id": "' +
    myData.processingid +
    '","paymode": "","transaction_type":"","package_code":"","appointment_id":"","payment_location":"Test Hospital","return_url": "' +
    myData.reqresponseurl +
    '","response_url": "' +
    myData.reqresponseurl +
    '"}';

  const handlePay = async (event) => {
    event.preventDefault();

    // var token =
    //   '{"auth":{"user":"jrsuperspecialityhospitalsprivatelimitedadmin","key":"NZmo9FwtHGrkkSZXhhS4gb3LLdIJpqPj"},"username": "Patient", "accounts": [{"patient_name": "' +
    //   myData.patientName +
    //   '", "account_number": "UHID' +
    //   myData.uhid +
    //   '", "amount": "' +
    //   myData.chargerate +
    //   '", "email": "' +
    //   myData.email +
    //   '","phone": "' +
    //   myData.mobileno +
    //   '"}], "processing_id": "' +
    //   myData.processingid +
    //   '","paymode": "","transaction_type":"","package_code":"","appointment_id":"","payment_location":"Test Hospital","return_url": "' +
    //   myData.reqresponseurl +
    //   '","response_url": "' +
    //   myData.reqresponseurl +
    //   '"}';

    const check_sum_hash = generateHash(
      "jrsuperspecialityhospitalsprivatelimitedadmin|f4b093f9746747b17db05b7dc3420cfc5f46180c3e7af755cde20ed5a45514c8|" +
        myData.processingid +
        "|ieJCv3nB|A1JYGdTXGiK9kTflQZDY8bReHihFSCUZ"
    );

    setState((prev) => ({ ...prev, check_sum_hash: check_sum_hash }));
    const formData = new FormData(event.target);

    try {
      const response = await axios.post(
        "https://testing.in.salucro.net/patient/app/payments",
        formData
      );

      // Handle the response as needed
      console.log(response);
    } catch (error) {
      // Handle the error
      console.error(error);
    }
  };

  // $("#txttoken").val(myVal);
  // $("#mid").val("ieJCv3nB");
  // $("#check_sum_hash").val(
  // generateHash(
  //   "jrsuperspecialityhospitalsprivatelimitedadmin|NZmo9FwtHGrkkSZXhhS4gb3LLdIJpqPj|" +
  //     myData.processingid +
  //     "|ieJCv3nB|A1JYGdTXGiK9kTflQZDY8bReHihFSCUZ"
  // );

  console.log(state.token);
  console.log(state.mid);
  console.log(state.check_sum_hash);

  // const token = {
  //   auth: {
  //     user: "superadmin",
  //     key: "f4b093f9746747b17db05b7dc3420cfc5f46180c3e7af755cde20ed5a45514c8",
  //   },
  //   username: "Patient",
  //   accounts: [
  //     {
  //       patient_name: "Ramesh",
  //       account_number: "UHID" + myData.uhid,
  //       amount: myData.chargerate,
  //       email: myData.email,
  //       phone: myData.mobileno,
  //     },
  //   ],
  //   processing_id: myData.processingid,
  //   paymode: "",
  //   response_url:
  //     "https://appointment.relainstitute.com/patient-portal-his/payment_result_reg",
  //   return_url:
  //     "https://appointment.relainstitute.com/patient-portal-his/payment_result_reg",
  // };

  return (
    <div style={{ textAlign: "center", marginTop: "250px", padding: "10px" }}>
      <form onSubmit={handlePay}>
        <input
          type="text"
          name="PatientName"
          id="patientname"
          value={state.PatientName}
          onChange={(event) =>
            setState({ ...state, PatientName: event.target.value })
          }
        />
        <input
          type="text"
          name="uhid"
          id="uhid"
          value={state.uhid}
          onChange={(event) => setState({ ...state, uhid: event.target.value })}
        />
        <input
          type="text"
          name="charge rate"
          id="amount"
          value={state["charge rate"]}
          onChange={(event) =>
            setState({ ...state, "charge rate": event.target.value })
          }
        />
        <input
          type="text"
          name="Mail"
          id="email"
          value={state.Mail}
          onChange={(event) => setState({ ...state, Mail: event.target.value })}
        />
        <input
          type="text"
          name="Mobile"
          id="mobile"
          value={state.Mobile}
          onChange={(event) =>
            setState({ ...state, Mobile: event.target.value })
          }
        />
        <input
          type="text"
          name="ProcessingId"
          id="processingId"
          value={state.ProcessingId}
          onChange={(event) =>
            setState({ ...state, ProcessingId: event.target.value })
          }
        />
        <input
          type="text"
          name="token"
          id="txttoken"
          value={JSON.stringify(token)}
        />
        <input type="text" name="mid" id="mid" value={state.mid} />
        <input
          type="text"
          name="check_sum_hash"
          id="check_sum_hash"
          value={state.check_sum_hash}
          onChange={(event) =>
            setState({ ...state, check_sum_hash: event.target.value })
          }
        />
        <h3 className="text-center">
          <button id="paynow" type="submit">
            Pay Now
          </button>
        </h3>
      </form>
    </div>
  );
};

export default PaymentInfo;
