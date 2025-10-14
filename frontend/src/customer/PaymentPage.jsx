// // import React, { useState } from 'react';
// // import './customer.css';
// // import { useNavigate } from 'react-router-dom';

// // const PaymentPage = () => {
// //   const [paymentMethod, setPaymentMethod] = useState('');
// //   const navigate = useNavigate();

// //   const handlePayment = () => {
// //     if (!paymentMethod) {
// //       alert('Please select a payment method');
// //       return;
// //     }
// //     alert(`Payment successful via ${paymentMethod}!`);
// //     localStorage.removeItem('cart');
// //     navigate('/customerhome');
// //   };

// //   return (
// //     <div className="container mt-4">
// //       <h2 className="text-center mb-4">Choose Payment Method</h2>
// //       <div className="payment-options">
// //         <label>
// //           <input type="radio" value="UPI" checked={paymentMethod === 'UPI'} onChange={(e) => setPaymentMethod(e.target.value)} />
// //           UPI
// //         </label>
// //         <label>
// //           <input type="radio" value="Net Banking" checked={paymentMethod === 'Net Banking'} onChange={(e) => setPaymentMethod(e.target.value)} />
// //           Net Banking
// //         </label>
// //         <label>
// //           <input type="radio" value="Debit Card" checked={paymentMethod === 'Debit Card'} onChange={(e) => setPaymentMethod(e.target.value)} />
// //           Debit Card
// //         </label>
// //         <label>
// //           <input type="radio" value="Credit Card" checked={paymentMethod === 'Credit Card'} onChange={(e) => setPaymentMethod(e.target.value)} />
// //           Credit Card
// //         </label>
// //       </div>
// //       <div className="text-center mt-3">
// //         <button className="payment-btn" onClick={handlePayment}>Pay Now</button>
// //       </div>
// //     </div>
// //   );
// // };

// // export default PaymentPage;
// import React, { useState } from 'react';
// import './customer.css';
// import { useNavigate } from 'react-router-dom';

// const PaymentPage = () => {
//   const [paymentMethod, setPaymentMethod] = useState('');
//   const navigate = useNavigate();

//   const handlePayment = () => {
//     if (!paymentMethod) {
//       alert('Please select a payment method');
//       return;
//     }

//     switch (paymentMethod) {
//       case 'UPI':
//         navigate('/upi-payment');
//         break;
//       case 'Net Banking':
//         navigate('/netbanking-payment');
//         break;
//       case 'Debit Card':
//       case 'Credit Card':
//         navigate('/card-payment', { state: { method: paymentMethod } });
//         break;
//       default:
//         alert('Invalid payment method');
//     }
//   };

//   return (
//     <div className="container mt-4">
//       <h2 className="text-center mb-4">Choose Payment Method</h2>
//       <div className="payment-options">
//         <label>
//           <input type="radio" value="UPI" checked={paymentMethod === 'UPI'} onChange={(e) => setPaymentMethod(e.target.value)} />
//           UPI
//         </label>
//         <label>
//           <input type="radio" value="Net Banking" checked={paymentMethod === 'Net Banking'} onChange={(e) => setPaymentMethod(e.target.value)} />
//           Net Banking
//         </label>
//         <label>
//           <input type="radio" value="Debit Card" checked={paymentMethod === 'Debit Card'} onChange={(e) => setPaymentMethod(e.target.value)} />
//           Debit Card
//         </label>
//         <label>
//           <input type="radio" value="Credit Card" checked={paymentMethod === 'Credit Card'} onChange={(e) => setPaymentMethod(e.target.value)} />
//           Credit Card
//         </label>
//       </div>
//       <div className="text-center mt-3">
//         <button className="payment-btn" onClick={handlePayment}>Pay Now</button>
//       </div>
//     </div>
//   );
// };

// export default PaymentPage;
import React, { useState } from 'react';
import './customer.css';
import { useNavigate } from 'react-router-dom';

const PaymentPage = () => {
  const [paymentMethod, setPaymentMethod] = useState('');
  const navigate = useNavigate();

  const handlePayment = () => {
    if (!paymentMethod) {
      alert('Please select a payment method');
      return;
    }

    switch (paymentMethod) {
      case 'UPI':
        navigate('/upi-payment');
        break;
      case 'Net Banking':
        navigate('/netbanking-payment');
        break;
      case 'Debit Card':
      case 'Credit Card':
        navigate('/card-payment', { state: { method: paymentMethod } });
        break;
      default:
        alert('Invalid payment method');
    }
  };

  return (
    <div className="container mt-4 payment-container">
      <h2 className="text-center mb-4">Choose Payment Method</h2>
      <div className="payment-options">
        <label>
          <input
            type="radio"
            value="UPI"
            checked={paymentMethod === 'UPI'}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          UPI
        </label>
        <label>
          <input
            type="radio"
            value="Net Banking"
            checked={paymentMethod === 'Net Banking'}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          Net Banking
        </label>
        <label>
          <input
            type="radio"
            value="Debit Card"
            checked={paymentMethod === 'Debit Card'}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          Debit Card
        </label>
        <label>
          <input
            type="radio"
            value="Credit Card"
            checked={paymentMethod === 'Credit Card'}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          Credit Card
        </label>
      </div>
      <div className="text-center mt-3">
        <button className="payment-btn" onClick={handlePayment}>
          Pay Now
        </button>
      </div>
    </div>
  );
};

export default PaymentPage;
