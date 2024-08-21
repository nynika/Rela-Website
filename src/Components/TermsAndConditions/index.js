import React from "react";
import "./index.css";

const TermsAndConditions = () => {
  return (
    <div className="container1">
      <div className="terms">
        <a href="https://www.relainstitute.com/terms-and-conditions/">
          Terms and Conditions
        </a>{" "}
        |{" "}
        <a href="https://www.relainstitute.com/cancellation-refund-policy/">
          Cancellation and Refund Policy
        </a>{" "}
        |{" "}
        <a href="https://www.relainstitute.com/privacy-policy/">
          Privacy Policy
        </a>{" "}
        | <a href="https://www.relainstitute.com/disclaimer/">Disclaimer</a>
      </div>
      <div className="allrights">
        Copyrights © 2024 Dr Rela Institute & Medical Centre. All Rights Reserved.
      </div>
      <div style={{ marginBottom: "20px" }}></div>
    </div>
  );
};

export default TermsAndConditions;
