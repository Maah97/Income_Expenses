import { useEffect, useState, useContext } from "react"
import { useParams, NavLink, useNavigate } from "react-router-dom"
import { useFormik } from 'formik'
import axios from 'axios'
import { ThemeContext } from "../context/themeContext"
import { useTranslation } from "react-i18next"
import { LangueContext } from "../context/langueContext"

export default function ResetPassword() {
    const { t } = useTranslation()
    const { langue } = useContext(LangueContext)
    const { theme } = useContext(ThemeContext)
    const { token } = useParams();
    const navigate = useNavigate() 
    const [passwordVisible, setPasswordVisible] = useState(false)
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false)
    const [message, setMessage] = useState("");
    const email = localStorage.getItem("email")
    function VisibilityPassword() {
        if (passwordVisible === true) {
            setPasswordVisible(false)
        } else {
            setPasswordVisible(true)
        }
    }
    function VisibilityConfirmPassword() {
        if (confirmPasswordVisible === true) {
            setConfirmPasswordVisible(false)
        } else {
            setConfirmPasswordVisible(true)
        }
    }
    // preparation  de formik avec les regex
    const passwordPresenceChiffre = new RegExp("[0-9]{1}")
    const passwordPresenceMinuscule = new RegExp("[a-z]{1}")
    const passwordPresenceMajuscule = new RegExp("[A-Z]{1}")
    const passwordAbsenceCaractereSpeciaux = new RegExp("[\\ \\+\\\\%\\*\\#\\~\\)\\(\\ù\\=\\.\\;\\§\\£\\µ\\²\\ç\\/\\°\\<\\>\\`\\'\\\"\\^\\¨\\||\\{\\}\\[\\]\\?\\:\\,\\à\\è\\é\\ù]")
    const initialValues = {
        email: email,
        password: "",
        confirmPassword: ""
    }
    const validate = values => {
        let errors = {}
        if (!values.password) {
            errors.password = t("resetPassword.errors.error1")
        }
        if (values.password && values.password.length < 8) {
            errors.password = t("resetPassword.errors.error2")
        } else if (values.password && !passwordPresenceChiffre.test(values.password)) {
            errors.password = t("resetPassword.errors.error3")
        } else if (values.password && !passwordPresenceMinuscule.test(values.password)) {
            errors.password = t("resetPassword.errors.error4")
        } else if (values.password && !passwordPresenceMajuscule.test(values.password)) {
            errors.password = t("resetPassword.errors.error5")
        } else if (values.password && passwordAbsenceCaractereSpeciaux.test(values.password)) {
            errors.password = t("resetPassword.errors.error6")
        }
        if (!values.confirmPassword) {
            errors.confirmPassword = t("resetPassword.errors.error7")
        }
        if (values.password !== values.confirmPassword) {
            errors.confirmPassword = t("resetPassword.errors.error8")
        }
        return errors
    }
    const onSubmit = async (values) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL_USER}/resetPassword/${token}`, { email: values.email, newPassword: values.password, langue: langue });
            setMessage(response.data.message);
            localStorage.removeItem("email");
        } catch (error) {
            setMessage(error.response.data.message);
        } 
    }
    const formik = useFormik ({
        initialValues,
        onSubmit,
        validate
    })
    useEffect(() => {
        if (message == "Password reset successful") {
            setTimeout(() => {
                navigate("/login")
            }, 2500)
        }
    })
    return (
        <section className={theme === 'light' ? "reset-password-page" : "reset-password-page dark"}>
            {
                email
                ?
                <>
                    <h3>{t("resetPassword.h3")}</h3>
                    <form onSubmit={formik.handleSubmit} className="form-reset-password">
                        <label htmlFor="email">Email</label>
                        <input name="email" type="text" disabled value={formik.values.email} />
                        <label htmlFor="password">{t("resetPassword.labelPassword")}</label>
                        <div className="container-password">
                            <input name="password" id="password" type={passwordVisible === true ? "text" : "password"} autoComplete="new-password" required placeholder={t("resetPassword.placeHolderPassword")} onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} />
                            <i onClick={() => VisibilityPassword()} className={`fa-regular fa-eye${passwordVisible === true ? "" : "-slash"}`}></i>
                            {formik.touched.password && formik.errors.password ? <p className='msg-error'>{formik.errors.password}</p> : null}
                        </div>
                        <label htmlFor="confirmPassword">{t("resetPassword.labelConfirmPassword")}</label>
                        <div className="container-password">
                            <input name="confirmPassword" id="repeat-password" type={confirmPasswordVisible === true ? "text" : "password"} required placeholder={t("resetPassword.placeHolderConfirmPassword")} onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.confirmPassword} />
                            <i onClick={() => VisibilityConfirmPassword()} className={`fa-regular fa-eye${confirmPasswordVisible === true ? "" : "-slash"}`}></i>
                            {formik.touched.confirmPassword && formik.errors.confirmPassword ? <p className='msg-error'>{formik.errors.confirmPassword}</p> : null}
                        </div>
                        <button type="submit">{t("resetPassword.btnSubmit")}</button>
                    </form>
                    {message === "" ? null : <p className='msg-error-send'>{message}</p>} 
                </>
                :
                    message === "Password reset successful"
                    ?
                    <div className="reset-password-success">
                        <p className="intro"><i className="fa-regular fa-circle-check"></i> {t("resetPassword.p1")}</p>
                        <p>{t("resetPassword.p2")}</p>
                    </div>
                    :
                    <div className="link-used">
                        <p className="intro"> <i className="fa-solid fa-circle-exclamation"></i> T{t("resetPassword.p3")}</p>
                        <p>{t("resetPassword.p4")}</p>
                        <NavLink className="link-to" to="/forgotPassword">{t("resetPassword.btnSendMail")}</NavLink>
                    </div>
            }
        </section>
    )
}