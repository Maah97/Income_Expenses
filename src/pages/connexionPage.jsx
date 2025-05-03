import { useState, useContext } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import { useFormik } from 'formik'
import { AuthContext } from "../context/authContext"
import WaitingConfirmation from "../components/waitingConfirmation"
import { ThemeContext } from "../context/themeContext"
import { useTranslation } from "react-i18next"
import { LangueContext } from "../context/langueContext"

export default function ConnexionPage() {
    const { langue } = useContext(LangueContext)
    const { t } = useTranslation()
    const { theme } = useContext(ThemeContext)
    const navigate = useNavigate()
    const [isRegistered, setIsRegistered] = useState(false)
    const { login, message, setIsPopupAuth, setMsgPopupAuth } = useContext(AuthContext);
    const [passwordVisible, setPasswordVisible] = useState(false)
    const initialValues = {
        email: "",
        password: ""
    }
    const validate = values => {
        let errors = {}
        if (!values.email) {
            errors.email = t("connexionPage.errors.email")
        } else if (!new RegExp("[a-z0-9._-]+@[a-z]+\\.[a-z]+$").test(values.email)) {
            errors.email = t("connexionPage.errors.emailValid")
        }
        if (!values.password) {
            errors.password = t("connexionPage.errors.password")
        }
        return errors
    }
    const onSubmit = async (values) => {
        const logIn =  await login(values.email, values.password, langue)
        if (logIn) {
            navigate("/")
            window.location.reload()
            setIsPopupAuth(true)
            setMsgPopupAuth(t("connexionPage.msgPopup"))
            setTimeout(() => {
                setIsPopupAuth(false)
            }, "3000000")
        }
    }
    const formik = useFormik ({
        initialValues,
        onSubmit,
        validate
    })
    function VisibilityPassword () {
        if (passwordVisible === true) {
            setPasswordVisible(false)
        } else {
            setPasswordVisible(true)
        }
    }
    if (isRegistered) return <WaitingConfirmation userEmail={formik.values.email} />
    return (
        <div className={theme === 'light' ? "connexion-page" : "connexion-page dark"}>
            <p>{t("connexionPage.p")}</p>
            <form onSubmit={formik.handleSubmit} className="form-login">
                <label htmlFor="email">Email</label>
                <input name="email" type="text" placeholder={t("connexionPage.placeHolderEmail")} required onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} />
                {formik.touched.email && formik.errors.email ? <p className='msg-error'>{formik.errors.email}</p> : null}
                <label htmlFor="password">{t("connexionPage.labelPassword")}</label>
                <div className="container-password">
                    <input id="password" name="password" type={passwordVisible === true ? "text" : "password"} autoComplete="new-password" required placeholder={t("connexionPage.placeHolderPassword")} onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} />
                    <i onClick={() => VisibilityPassword()} className={`fa-regular fa-eye${passwordVisible === true ? "" : "-slash"}`}></i>
                    {formik.touched.password && formik.errors.password ? <p className='msg-error'>{formik.errors.password}</p> : null}
                </div>
                <div className="btn">
                    <button type="submit">{t("connexionPage.btnSubmit")}</button>
                    <NavLink className="link-to-reset-password" to="/forgotPassword">{t("connexionPage.btnForgotPassword")}</NavLink>
                </div>
                {message === "" ? null : message === "Incorrect email / password pair" ? <p className="msg-error-existing-email">{t("connexionPage.errors.response1")}</p> : <><p className="msg-error-existing-email">{t("connexionPage.errors.response2")}</p><button className="btn-send-mail-confirmation" onClick={() => setIsRegistered(true)}>{t("connexionPage.btnSend")}</button></>}
                <p className="link-redirection-to-signup">{t("connexionPage.pSignUp")} <NavLink className="link-to-signup" to="/signUp">{t("connexionPage.btnSignup")}</NavLink></p>
            </form>
        </div>
    )
}