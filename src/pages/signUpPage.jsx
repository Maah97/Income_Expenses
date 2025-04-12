import { useState, useContext } from "react"
import { NavLink } from "react-router-dom"
import PhoneInput from "react-phone-input-2"
import "react-phone-input-2/lib/style.css"
import { useFormik } from 'formik'
import axios from 'axios'
import WaitingConfirmation from "../components/waitingConfirmation"
import { AuthContext } from "../context/authContext"
import { format } from "date-fns"
import { enUS } from "date-fns/locale"
import { ThemeContext } from "../context/themeContext"
import { LangueContext } from "../context/langueContext"
import { useTranslation } from "react-i18next"

export default function SignUpPage() {
    const { t } = useTranslation()
    const { langue } = useContext(LangueContext)
    const { theme } = useContext(ThemeContext)
    const { user } = useContext(AuthContext);
    const date = format(new Date(), "MM/dd/yyyy", { locale: enUS });
    const [passwordVisible, setPasswordVisible] = useState(false)
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false)
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
    const emailregExp = new RegExp("[a-z0-9._-]+@[a-z]+\\.[a-z]+$")
    const passwordPresenceChiffre = new RegExp("[0-9]{1}")
    const passwordPresenceMinuscule = new RegExp("[a-z]{1}")
    const passwordPresenceMajuscule = new RegExp("[A-Z]{1}")
    const passwordAbsenceCaractereSpeciaux = new RegExp("[\\ \\+\\\\%\\*\\#\\~\\)\\(\\ù\\=\\.\\;\\§\\£\\µ\\²\\ç\\/\\°\\<\\>\\`\\'\\\"\\^\\¨\\||\\{\\}\\[\\]\\?\\:\\,\\à\\è\\é\\ù]")
    const initialValues = {
        userName: "",
        birthday: "",
        gender: "",
        occupation: "",
        phoneNumber: "",
        email: "",
        password: "",
        repeatPassword: ""
    }
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [isRegistered, setIsRegistered] = useState(false);
    const [email, setEmail] = useState("");
    const onSubmit =  async (values, { resetForm }) => {
        if (loading) return setLoading(true)
        try {
            await axios.post(`${import.meta.env.VITE_BASE_URL_USER}/signup`,{
                userName: values.userName,
                birthDay: values.birthday,
                gender: values.gender,
                occupation: values.occupation,
                phoneNumber: values.phoneNumber,
                email: values.email,
                password: values.password,
                dateInscription: date,
                langue: langue
            }).then((response) => {
                setIsRegistered(true);
                setEmail(values.email);
                resetForm();
                setMessage(response.data.message);     
            }).catch((error) => {
                const inputEmail = document.querySelector(".required-input")
                const labelEmail = document.querySelector(".required-label")
                inputEmail.style.border = "2px solid red"
                labelEmail.style.color = "red"
                inputEmail.addEventListener("focus", () => {
                    inputEmail.style.border = "1px solid rgb(72, 126, 212)"
                    labelEmail.style.color = "black"
                    setMessage("")
                })
                setMessage(error.response.data.message)    
            })
        } catch (error) {
            console.error(error)
            const inputEmail = document.querySelector(".required-input")
            inputEmail.style.border = "2px solid red"
            inputEmail.addEventListener("focus", () => {
                inputEmail.style.border = "1px solid rgb(72, 126, 212)"
                setMessage("")
            })
            setMessage("Error connecting to the server.")   
        }  finally {
            setLoading(false);
        }
    }
    const validate = values => {
        let errors = {}
        if (!values.userName) {
            errors.userName = t("signUpPage.errors.userName")
        }
        if (values.userName && values.userName.length < 4) {
            errors.userName = t("signUpPage.errors.userNameValid")
        }
        if (!values.gender) {
            errors.gender = t("signUpPage.errors.gender")
        }
        if (!values.email) {
            errors.email = t("signUpPage.errors.email")
        } else if (values.email && !emailregExp.test(values.email)) {
             errors.email = t("signUpPage.errors.userEmailValid")
        }  
        if (!values.password) {
            errors.password = t("signUpPage.errors.password")
        }
        if (values.password && values.password.length < 8) {
            errors.password = t("signUpPage.errors.passwordValid1")
        } else if (values.password && !passwordPresenceChiffre.test(values.password)) {
            errors.password = t("signUpPage.errors.passwordValid2")
        } else if (values.password && !passwordPresenceMinuscule.test(values.password)) {
            errors.password = t("signUpPage.errors.passwordValid3")
        } else if (values.password && !passwordPresenceMajuscule.test(values.password)) {
            errors.password = t("signUpPage.errors.passwordValid4")
        } else if (values.password && passwordAbsenceCaractereSpeciaux.test(values.password)) {
            errors.password = t("signUpPage.errors.passwordValid5")
        }
        if (!values.repeatPassword) {
            errors.repeatPassword = t("signUpPage.errors.repeatPassword")
        }
        if (values.password !== values.repeatPassword) {
            errors.repeatPassword = t("signUpPage.errors.repeatPasswordValid")
        }
        return errors
    }
    const formik = useFormik ({
        initialValues,
        onSubmit,
        validate
    })
    if (isRegistered) return <WaitingConfirmation userEmail={email} />

    return (
        <div className={theme === 'light' ? "signUp-page" : "signUp-page dark"}>
            <p>{user ? t("signUpPage.p1") : t("signUpPage.p2")}</p>
            <form onSubmit={formik.handleSubmit} className="form-login">
                <div className="general-informations">
                    <p>{t("signUpPage.form.p1")}</p>
                    <label id="label-userName" htmlFor="userName">{t("signUpPage.form.labelName")} <span>*</span></label>
                    <input type="text" name="userName" placeholder={t("signUpPage.form.placeHolderName")} required id="userName" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.userName} />
                    {formik.touched.userName && formik.errors.userName ? <p className='msg-error'>{formik.errors.userName}</p> : null}
                    <label htmlFor="birthday">{t("signUpPage.form.labelBirthday")}</label>
                    <input type="date" name="birthday" id="birthday" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.birthday} />
                    <label htmlFor="gender">{t("signUpPage.form.labelGender")} <span>*</span></label>
                    <select name="gender" id="gender" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.gender} required>
                        <option value="">{t("signUpPage.form.chooseGender")}</option>
                        <option value={t("signUpPage.form.genderMale")}>{t("signUpPage.form.genderMale")}</option>
                        <option value={t("signUpPage.form.genderFemale")}>{t("signUpPage.form.genderFemale")}</option>
                    </select>
                    {formik.touched.gender && formik.errors.gender ? <p className='msg-error'>{formik.errors.gender}</p> : null}
                    <label htmlFor="occupation">{t("signUpPage.form.labelOccupation")}</label>
                    <input type="text" name="occupation" placeholder={t("signUpPage.form.placeHolderOccupation")} id="occupation" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.occupation} />
                    <label htmlFor="phoneNumber">{t("signUpPage.form.labelPhone")}</label>
                    <PhoneInput
                        country={"us"}
                        inputProps={{
                            name: "phoneNumber"
                        }}
                        enableSearch={true}
                        placeholder={t("signUpPage.form.placeHolderPhone")}
                        onBlur={formik.handleBlur} 
                        onChange={(value) => {
                                formik.setFieldValue("phoneNumber", value)
                            }
                        }
                        value={formik.values.phoneNumber}
                    />
                    <p id="note">{t("signUpPage.form.p3")}</p>
                </div>
                <div className="auhentification-info">
                    <p>{t("signUpPage.form.p2")}</p>
                    <label className="required-label" id="email-label" htmlFor="email">Email <span>*</span></label>
                    <input className="required-input" name="email" type="email" placeholder={t("signUpPage.form.placeHolderEmail")} onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} required />
                    {formik.touched.email && formik.errors.email ? <p  id="msg-error-email" className='msg-error'>{formik.errors.email}</p> : null}
                    <label htmlFor="password">{t("signUpPage.form.labelPassword")} <span>*</span></label>
                    <div className="container-password">
                        <input name="password" id="password" type={passwordVisible === true ? "text" : "password"} autoComplete="new-password" required placeholder={t("signUpPage.form.placeHolderPassword")} onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} />
                        <i onClick={() => VisibilityPassword()} className={`fa-regular fa-eye${passwordVisible === true ? "" : "-slash"}`}></i>
                        {formik.touched.password && formik.errors.password ? <p className='msg-error'>{formik.errors.password}</p> : null}
                    </div>
                    <label id="label-repeat-password" htmlFor="password">{t("signUpPage.form.labelRepeatPassword")} <span>*</span></label>
                    <div className="container-password">
                        <input name="repeatPassword" id="repeat-password" type={confirmPasswordVisible === true ? "text" : "password"} required placeholder={t("signUpPage.form.placeHolderRepeatPassword")} onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.repeatPassword} />
                        <i onClick={() => VisibilityConfirmPassword()} className={`fa-regular fa-eye${confirmPasswordVisible === true ? "" : "-slash"}`}></i>
                        {formik.touched.repeatPassword && formik.errors.repeatPassword ? <p className='msg-error'>{formik.errors.repeatPassword}</p> : null}
                    </div>
                    <p id="note">{t("signUpPage.form.p3")}</p>
                </div>
                <div className="btn">
                    <button type="submit">{t("signUpPage.form.btnSubmit")}</button>
                </div>
                {message === "This email is already in use." ? <p className="msg-error-existing-email">{t("signUpPage.form.p4")}</p> : null}
                <p id="question-logIn">{t("signUpPage.form.p5")} <NavLink className="link-to-login" to="/login">{t("signUpPage.form.btnLogin")}</NavLink></p>
            </form>
        </div>
    )
}