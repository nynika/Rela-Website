// import React from "react";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import ListGroup from "react-bootstrap/ListGroup";
// const PaymentResult = () => {
//   const [paymentState, setPayementState] = useState({
//     transactionId: "",
//     referenceId: "",
//     transactionAmount: "",
//     transactionMode: "",
//     responseCode: "",
//     responseMessage: "",
//   });

//   return (
//     <div>
//       <div>
//         <h3>PAYMENT SUCCESS</h3>
//       </div>
//       <br />
//       <div>
//         <ListGroup.Item variant="flush">
//           <ListGroup.Item>
//             Transaction Id: {paymentState.transactionId}
//           </ListGroup.Item>
//           <ListGroup.Item>
//             Reference Id: {paymentState.referenceId}
//           </ListGroup.Item>
//           <ListGroup.Item>
//             Transaction Amount: {paymentState.transactionAmount}
//           </ListGroup.Item>
//           <ListGroup.Item>
//             Transaction Mode: {paymentState.transactionMode}
//           </ListGroup.Item>
//           <ListGroup.Item>
//             Response Code: {paymentState.responseCode}
//           </ListGroup.Item>
//           <ListGroup.Item>
//             ResponseMessage: {paymentState.responseMessage}
//           </ListGroup.Item>
//         </ListGroup.Item>
//       </div>
//     </div>
//   );
// };

// export default PaymentResult;


import { useLocation } from "react-router-dom";

const PaymentResult = () => {
  const location = useLocation();
  const [paymentState, setPaymentState] = useState({
    transactionId: "",
    referenceId: "",
    transactionAmount: "",
    transactionMode: "",
    responseCode: "",
    responseMessage: "",
  });

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    setPaymentState({
      transactionId: queryParams.get("transactionId"),
      referenceId: queryParams.get("referenceId"),
      transactionAmount: queryParams.get("transactionAmount"),
      transactionMode: queryParams.get("transactionMode"),
      responseCode: queryParams.get("responseCode"),
      responseMessage: queryParams.get("responseMessage"),
    });
  }, [location.search]);

  return (
    <div>
      <h3>PAYMENT {paymentState.responseCode === "00" ? "SUCCESS" : "FAILED"}</h3>
      <br />
      <ListGroup.Item variant="flush">
        <ListGroup.Item>Transaction Id: {paymentState.transactionId}</ListGroup.Item>
        <ListGroup.Item>Reference Id: {paymentState.referenceId}</ListGroup.Item>
        <ListGroup.Item>Transaction Amount: {paymentState.transactionAmount}</ListGroup.Item>
        <ListGroup.Item>Transaction Mode: {paymentState.transactionMode}</ListGroup.Item>
        <ListGroup.Item>Response Code: {paymentState.responseCode}</ListGroup.Item>
        <ListGroup.Item>Response Message: {paymentState.responseMessage}</ListGroup.Item>
      </ListGroup.Item>
    </div>
  );
};

export default PaymentResult;

