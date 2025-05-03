import PropTypes from 'prop-types'
import { useState, useContext } from "react"
import axios from "axios"
import { useTranslation } from "react-i18next"
import { LangueContext } from "../context/langueContext"

export default function WaitingConfirmation(props) {
    const { t } = useTranslation()
    const { langue } = useContext(LangueContext)
    const [loading, setLoading] = useState(false);
    const [messageResend, setMessageResend] = useState("")
    const resendEmail = async () => {
        setLoading(true);
        try {
          const response = await axios.post(`${import.meta.env.VITE_BASE_URL_USER}/resendMailVerification`, { email: props.userEmail, langue: langue });
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
            <p className="title-registration">{t("waitingConfirmation.p1")}</p>
            <p className="msg-inscription-done">{t("waitingConfirmation.p2")} <span>{props.userEmail}</span> {t("waitingConfirmation.p3")}</p>
            <p className="msg-inscription-done">If {t("waitingConfirmation.p4")}</p> 
            <button className="btn-resend-email" onClick={resendEmail} disabled={loading}>
                {loading ? t("waitingConfirmation.progress") : t("waitingConfirmation.resend")}
            </button>
            <p className='msg-error-resend'>{messageResend === "" ? null : messageResend}</p>
        </div> 
    )
}

WaitingConfirmation.propTypes = {
    userEmail: PropTypes.string,
}