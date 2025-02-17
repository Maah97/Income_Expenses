import axios from "axios"
import { useEffect, useState } from "react"
import { NavLink } from "react-router-dom"
import { useParams } from "react-router-dom"

export function VerifyAccount() {
    const { token } = useParams();
    const [message, setMessage] = useState("Vérification en cours...");
    const [loading, setLoading] = useState(true);
    const [isVerified, setIsVerified] = useState(false);
    const [email, setEmail] = useState("");
    const [messageResend, setMessageResend] = useState("");
    useEffect(() => {
        axios.get(`http://localhost:3000/api/auth/verify/${token}`)
        .then((response) => {
            if (response.data.message === true) {
              setMessage("Your account is now active ! Click to the link bellow you will be redirected to the login page");
              setIsVerified(true);
            } else {
              setMessage("Invalid or expired link.");
              setIsVerified(false);
              setEmail(response.data.email);
            }
            setLoading(false);
        })
        .catch(() => {
            setMessage("Error connecting to the server.")
            setLoading(false);
            setIsVerified(false);
        });
    }, [token]);
    const resendEmail = async () => {
        setLoading(true);
        try {
          const response = await axios.post("http://localhost:3000/api/auth/resendMail", { email: email });
          setMessageResend(response.data.message);
        } catch (error) {
          setMessageResend(error.response.data.message);
          console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="verify-account">
            <p style={isVerified ? {color: "green"} : {color: "red"}}>{isVerified ? "Felicitations your account is verified !" : "Sorry ! Your account verification failed"}</p>
            <p className="message-verify-account">{message}</p>
            {
                isVerified 
                ? 
                <NavLink className="btn-redirect-login-page" to="/login" disabled={loading}>
                    {loading ? "Redirection in progress..." : "Log In"}
                </NavLink>
                :
                <div className="resend-email-after-failed">
                    {
                        message === "Invalid or expired link." 
                        ? 
                        null
                        :
                        <>
                            <label htmlFor="email">Enter your email to resend the verification email</label>
                            <input name="email"  onChange={(e) => setEmail(e.target.value)} type="text" required />
                        </>  
                    }
                    <button type="sumit" className="btn-resend-email" onClick={resendEmail} disabled={loading}>
                        {loading ? "Sending in progress..." : "Resend mail"}
                    </button>
                    {messageResend === "" ? null : <p className='msg-error-resend'>{messageResend}</p>}
                </div>
            }
        </div>
    )
}