import axios from "axios"
import { useEffect, useState } from "react"
import { NavLink } from "react-router-dom"
import { useParams } from "react-router-dom"
import { useTranslation } from "react-i18next"

export function VerifyAccount() {
    const { t } = useTranslation()
    const { token } = useParams();
    const [message, setMessage] = useState("Vérification en cours...");
    const [loading, setLoading] = useState(true);
    const [isVerified, setIsVerified] = useState(false);
    const [email, setEmail] = useState("");
    const [messageResend, setMessageResend] = useState("");
    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BASE_URL_USER}/verify/${token}`)
        .then((response) => {
            if (response.data.message === true) {
              setMessage(t("verifyAccount.message"));
              setIsVerified(true);
            } else {
              setMessage(t("verifyAccount.message1"));
              setIsVerified(false);
              setEmail(response.data.email);
            }
            setLoading(false);
        })
        .catch(() => {
            setMessage(t("verifyAccount.message2"))
            setLoading(false);
            setIsVerified(false);
        });
    }, [token, t]);
    const resendEmail = async () => {
        setLoading(true);
        try {
          const response = await axios.post(`${import.meta.env.VITE_BASE_URL_USER}/resendMailVerification`, { email: email });
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
            <p style={isVerified ? {color: "green"} : {color: "red"}}>{isVerified ? t("verifyAccount.p1") : t("verifyAccount.p2")}</p>
            <p className="message-verify-account">{message}</p>
            {
                isVerified 
                ? 
                <NavLink className="btn-redirect-login-page" to="/login" disabled={loading}>
                    {loading ? t("verifyAccount.loading") : t("verifyAccount.logIn")}
                </NavLink>
                :
                <div className="resend-email-after-failed">
                    {
                        message === "Invalid or expired link." 
                        ? 
                        null
                        :
                        <>
                            <label htmlFor="email">{t("verifyAccount.labelEmail")}</label>
                            <input name="email"  onChange={(e) => setEmail(e.target.value)} type="text" required />
                        </>  
                    }
                    <button type="sumit" className="btn-resend-email" onClick={resendEmail} disabled={loading}>
                        {loading ? t("verifyAccount.progress") : t("verifyAccount.resend")}
                    </button>
                    {messageResend === "" ? null : <p className='msg-error-resend'>{messageResend}</p>}
                </div>
            }
        </div>
    )
}