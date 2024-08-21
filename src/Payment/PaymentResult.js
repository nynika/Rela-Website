import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import ListGroup from "react-bootstrap/ListGroup";
const PaymentResult = () => {
  const [paymentState, setPayementState] = useState({
    transactionId: "",
    referenceId: "",
    transactionAmount: "",
    transactionMode: "",
    responseCode: "",
    responseMessage: "",
  });

  return (
    <div>
      <div>
        <h3>PAYMENT SUCCESS</h3>
      </div>
      <br />
      <div>
        <ListGroup.Item variant="flush">
          <ListGroup.Item>
            Transaction Id: {paymentState.transactionId}
          </ListGroup.Item>
          <ListGroup.Item>
            Reference Id: {paymentState.referenceId}
          </ListGroup.Item>
          <ListGroup.Item>
            Transaction Amount: {paymentState.transactionAmount}
          </ListGroup.Item>
          <ListGroup.Item>
            Transaction Mode: {paymentState.transactionMode}
          </ListGroup.Item>
          <ListGroup.Item>
            Response Code: {paymentState.responseCode}
          </ListGroup.Item>
          <ListGroup.Item>
            ResponseMessage: {paymentState.responseMessage}
          </ListGroup.Item>
        </ListGroup.Item>
      </div>
    </div>
  );
};

export default PaymentResult;
