import React, { useEffect } from 'react';
import './Verify.css';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const Verify = () => {
    // useSearchParams is a hook to easily read the query parameters from the URL
    const [searchParams] = useSearchParams();
    const success = searchParams.get("success");
    const orderId = searchParams.get("orderId");
    
    const navigate = useNavigate();

    useEffect(() => {
        // This effect will run once when the component loads
        if (success === "true") {
            toast.success("Payment Successful! Your order has been placed.");
            // Redirect the user to their orders page after a short delay
            setTimeout(() => {
                navigate("/myorders");
            }, 3000); // 3-second delay
        } else {
            toast.error("Payment Failed. Please try again.");
            // Redirect the user back to the home page or cart
            setTimeout(() => {
                navigate("/");
            }, 3000); // 3-second delay
        }
    }, [success, navigate]); // The effect depends on the success status and the navigate function

    return (
        <div className='verify'>
            <div className="spinner"></div>
            <p>
                {success === "true" 
                    ? "Verifying your payment and placing your order..." 
                    : "Payment failed. Redirecting..."}
            </p>
        </div>
    );
}

export default Verify;

