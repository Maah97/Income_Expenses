import PropTypes from 'prop-types'
import { useState } from "react"
import axios from "axios"

export default function WaitingConfirmation(props) {
    const [loading, setLoading] = useState(false);
    const [messageResend, setMessageResend] = useState("")
    const resendEmail = async () => {
        setLoading(true);
        try {
          const response = await axios.post("http://localhost:3000/api/auth/resendMailVerification", { email: props.userEmail });
          setMessageResend(response.data.message);
        } catch (error) {
          setMessageResend(error.response.data.message);
          console.error(error);
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="confirmation-page">
            <p className="title-registration">Registration successful, confirm your mail</p>
            <p className="msg-inscription-done">A confirmation email has been sent to <span>{props.userEmail}</span> Please check your inbox.</p>
            <p className="msg-inscription-done">If you have not received it, you can return it.</p> 
            <button className="btn-resend-email" onClick={resendEmail} disabled={loading}>
                {loading ? "Sending in progress..." : "Resend mail"}
            </button>
            <p className='msg-error-resend'>{messageResend === "" ? null : messageResend}</p>
        </div> 
    )
}

WaitingConfirmation.propTypes = {
    userEmail: PropTypes.string,
}