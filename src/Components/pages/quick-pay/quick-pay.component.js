import React, { useState, useEffect } from 'react';
import axios from 'axios';
import QuickpayTable from './quick-pay-table';
//import CustomButton from '../../common/custom-button/custom-button.component';
//import FormInput from '../../common/form-input/form-input.component';

import CustomButton from '../../common/custom-button/custom-button.component';
import FormInput from '../../common/form-input/form-input.component';

import './servicepay.css';
//  import styles from "./servicepay.module.css";

export default function QuickPay() {
  const SEARCH_API_TEST =
    'http://192.168.15.3/Test_HIS/api/his/Get_EMROPInvestigation_dtl?uhid=';

  //local host
  // const SEARCH_API_LIVE =
  //   'http://192.168.15.3/NewHIS/api/his/Get_EMROPInvestigation_dtl?uhid=';

  const SEARCH_API_LIVE =
    'https://www.relainstitute.in/relalive/api/HIS/Get_EMROPInvestigation_dtl?uhid=';

  const PAYMENT_API_LIVE =
    'https://www.relainstitute.in/relalive/api/HIS/updateOnlinePayment';

  const PAYMENT_API_TEST =
    'https://www.relainstitute.in/RELAAPI/api/HIS/updateOnlinePayment';

  const FINAL_API_TEST =
    'https://www.relainstitute.in/his_payment_Test/Forms/payment_result_live.aspx';

  const FINAL_API_LIVE =
    'https://www.relainstitute.in/his_payment/Forms/payment_result_live.aspx';

  const [data, setData] = useState([]);
  const [uhidList, setUhidList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [uhid, setUhid] = useState('');
  const [uhid1, setUhid1] = useState('Select Uhid');

  const [totalAmountInput, setTotalAmountInput] = useState(0);

  useEffect(() => {
    if (!uhid) {
      // loadUhid();
    }
    const calculatedTotal = selectedRows.length
      ? selectedRows.reduce((sum, idx) => sum + (data[idx]?.amount || 0), 0)
      : 0;

    setTotalAmountInput(calculatedTotal);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedRows, data]);

  const loadUhid = async () => {
    setLoading(true);

    try {
      const response = await axios.get(
        `http://192.168.15.3/NewHIS/api/his/Get_EMROPInvestigation_dtl?uhid=${0}`
      );

      // Ensure fetched data is an array
      const fetchedData = response.data || [];

      // Filter out duplicate UHIDs by using a Set to track unique UHIDs
      const uniqueUhidList = [
        ...new Map(fetchedData.map((item) => [item.uhid, item])).values(),
      ];

      setUhidList(uniqueUhidList); // Set the unique list of UHIDs
    } catch (error) {
      console.error('Error fetching data for UHID:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!uhid) {
      alert('Please enter a valid UHID');
      return;
    }
    // const patid = uhid.toString().substring(5);

    let patid;

    if (uhid.toString().length > 6) {
      patid = uhid.toString().substring(5);
    } else {
      patid = uhid.toString();
    }

    setLoading(true);

    try {
      const response = await axios.get(SEARCH_API_LIVE + `${patid}`);
      const fetchedData = response.data || []; // Ensure fetched data is an array
      setData(fetchedData);

      // Calculate total from fetched data
      const calculatedTotal = fetchedData.reduce(
        (sum, row) => sum + (row.amount || 0),
        0
      );

      setTotalAmountInput(calculatedTotal); // Properly update totalAmountInput
      setSelectedRows([]); // Reset selected rows since new data is fetched
    } catch (error) {
      console.error('Error fetching data for UHID:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (index) => {
    setData((prevData) => prevData.filter((_, i) => i !== index));
  };

  const handleReset = () => {
    setUhid('');
    setData([]);
    setSelectedRows([]);
    setUhid1('Select UHID');
  };

  const handleRowSelectionChange = (selected) => {
    setSelectedRows(selected);
  };

  const handleTotalAmountChange = (e) => {
    setTotalAmountInput(Number(e.target.value));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!data.length || !selectedRows.length) {
      alert('No items selected for payment.');
      return;
    }

    setLoading(true);

    const firstRecord = data[0];
    if (!firstRecord.uhid || !firstRecord.patientName) {
      alert('Patient details are missing. Cannot proceed with the payment.');
      return;
    }

    // Generate unique RefID (Processing ID)
    const date = new Date();
    const sumofVal = `${date.getDate()}${
      date.getMonth() + 1
    }${date.getFullYear()}${date.getHours()}${date.getMinutes()}${date.getSeconds()}`;

    const currentDate = new Date().toISOString().slice(0, 10);
    let surrogatedIds;

    if (selectedRows.length > 0) {
      surrogatedIds = selectedRows
        .map((rowIndex) => data[rowIndex]?.surrogateId)
        .filter(Boolean) // Filter out any undefined or null values
        .join(',');
    }

    try {
      // POST request to update online payment
      await axios.post(PAYMENT_API_LIVE, {
        RefID: sumofVal,
        RefType: 'PayAtLab',
        PatientID: firstRecord.uhid.toString().substring(5),
        PatientName: firstRecord.patientName,
        MobileNo: '',
        EmailID: surrogatedIds,
        DoctorID: firstRecord.docotrCode || '',
        TransactionDate: currentDate,
        TransactionID: '',
        TransactionAmount: totalAmountInput,
        PaymentMode: '',
        StatusCode: '',
        StatusMsg: '',
        PaymentStatus: 'Pending',
        Remarks: '',
        IsActiveflg: 0,
        CreatedCode: 'MEFTEC',
        APPStartDate: '',
        APPEndDate: '',
        AppointmentId: '0',
      });

      // Prepare payment gateway parameters
      const params = new URLSearchParams();
      params.append('PatientID', firstRecord.uhid.toString().substring(5));
      params.append('PatientName', firstRecord.patientName);
      params.append('AppointmentID', '0');
      params.append('chargerate', totalAmountInput);
      params.append('email', '');
      params.append('mobileno', '');
      params.append('processingid', sumofVal);
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
              patient_name: firstRecord.patientName,
              account_number: `UHID${firstRecord.uhid}`,
              amount: totalAmountInput,
              email: '',
              phone: '',
            },
          ],
          processing_id: sumofVal,
          paymode: '',
          transaction_type: '',
          package_code: '',
          appointment_id: '0',
          payment_location: 'Rela Hospital',
          return_url: FINAL_API_LIVE,
          response_url: FINAL_API_LIVE,
        })
      );
      params.append('mid', 'KkZma9ph');
      params.append(
        'check_sum_hash',
        'ODFjYzNjMzM2ODE1ZmUwMzZkN2U1YjJkYzg5YmM3YzU4M2E3N2I1OWJmNTE5MDZiMGNhNWVjZWUyNmY0NjA0NQ=='
      );

      // Send the request to the payment gateway
      const response = await fetch(
        'https://rela.momentpay.live/ma/patient/app/payments',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: params.toString(),
        }
      );

      const responseText = await response.text();
      console.log('Payment Gateway Response:', responseText);

      // Extract redirect URL from response
      const match = responseText.match(/window\.open\(["'](.+?)["']/);
      if (match) {
        const redirectUrl = match[1].trim();
        console.log('Redirecting to:', redirectUrl);
        window.location.href = redirectUrl;
      } else {
        alert('Failed to initiate payment. Please try again.');
        console.error('Could not extract redirect URL:', responseText);
      }
    } catch (error) {
      console.error('Error during payment processing:', error);
      alert(
        'An error occurred while processing your payment. Please try again.'
      );
    }
  };

  const HandleUHIDChange = (selectedOption) => {
    if (selectedOption && selectedOption.label) {
      setUhid1(selectedOption);
      setUhid(selectedOption.label);
    }
  };

  return (
    <div className='quick-pay'>
      {loading && (
        <div className='spinner-overlay'>
          <div className='spinner' />
        </div>
      )}

      <fieldset className='quick-pay-container'>
        <legend className='quick-pay-title'>Quick Pay</legend>
        <div className='quick-pay-form-row'>
          <FormInput
            label='UHID'
            name='uhid'
            value={uhid}
            handleChange={(e) => setUhid(e.target.value)}
            type='text'
            placeholder='Enter UHID'
            shortBox
          />
          <CustomButton type='button' onClick={handleSearch} disabled={loading}>
            {loading ? 'Searching...' : 'Search'}
          </CustomButton>
          <CustomButton type='button' onClick={handleReset}>
            Reset
          </CustomButton>
          <FormInput
            label='Patient Name'
            name='patientName'
            value={data[0]?.patientName || ''}
            readonly
            type='text'
            shortBox
          />
          <FormInput
            label='Doctor Name'
            name='docotrName'
            value={data[0]?.docotrName || ''}
            readonly
            type='text'
            shortBox
          />
        </div>
        <div className='quick-pay-table-row'>
          <QuickpayTable
            data={data}
            onDelete={handleDelete}
            onRowSelectionChange={handleRowSelectionChange}
          />
        </div>
        <div className='quick-pay-button-row'>
          <FormInput
            label='Amount'
            type='number'
            value={totalAmountInput}
            handleChange={handleTotalAmountChange}
            className='total-amount-input'
            placeholder='Total Amount'
            readonly
          />
          <CustomButton
            type='submit'
            disabled={!data.length}
            onClick={handleSubmit}
          >
            Proceed to Pay
          </CustomButton>
        </div>
      </fieldset>
    </div>
  );
}
