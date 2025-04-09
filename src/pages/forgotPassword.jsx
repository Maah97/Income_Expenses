import { useFormik } from 'formik'
import { useState, useContext } from 'react'
import axios from 'axios'
import { ThemeContext } from "../context/themeContext"
import { useTranslation } from "react-i18next"

export default function ForgotPassword() {
    const { t } = useTranslation()
    const { theme } = useContext(ThemeContext)
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState("")
    const initialValues = {
        email: ""
    }
    const validate = values => {
        let errors = {}
        if (!values.email) {
            errors.email = t("forgotPassword.errors.email")
        } else if (!new RegExp("[a-z0-9._-]+@[a-z]+\\.[a-z]+$").test(values.email)) {
            errors.email = t("forgotPassword.errors.emailValid")
        }
        return errors
    }
    const onSubmit = async (values) => {
        setLoading(false);
        try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL_USER}/sendMailResetPassword`, { email: values.email });
            setMessage(response.data.message);
            setLoading(true);
            localStorage.setItem("email", values.email);
        } catch (error) {
            setMessage(error.response.data.message);
            console.error(error);
        } finally {
            setLoading(false);
        }
    }
    const formik = useFormik ({
        initialValues,
        onSubmit,
        validate
    })
    return (
        <div className={theme === 'light' ? "connexion-page" : "connexion-page dark"}>
            <p>{t("forgotPassword.p")}</p>
            <form onSubmit={formik.handleSubmit} className="form-login">
                <label htmlFor="email">Email</label>
                <input id='email' name="email" type="text" placeholder={t("forgotPassword.placeHolderEmail")} required onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} />
                {formik.touched.email && formik.errors.email ? <p className='msg-error'>{formik.errors.email}</p> : null}
                <div className="btn">
                    <button className="btn-send-reset-password">{loading ? t("forgotPassword.btnRedirection") : t("forgotPassword.btnSend")}</button>
                </div>
                <p>{t("forgotPassword.pRecovery")}</p>
            </form>
            {message === "" ? null : <p className='msg-error-send'>{message}</p>}
        </div>
    )
}