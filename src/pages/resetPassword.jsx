import { useEffect, useState } from "react"
import { useParams, NavLink, useNavigate } from "react-router-dom"
import { useFormik } from 'formik'
import axios from 'axios'

export default function ResetPassword() {
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
            errors.password = 'You must enter your password'
        }
        if (values.password && values.password.length < 8) {
            errors.password = 'Password must be at least 8 characters'
        } else if (values.password && !passwordPresenceChiffre.test(values.password)) {
            errors.password = 'Password must contain at least one number'
        } else if (values.password && !passwordPresenceMinuscule.test(values.password)) {
            errors.password = 'Password must contain at least one lowercase letter'
        } else if (values.password && !passwordPresenceMajuscule.test(values.password)) {
            errors.password = 'Password must contain at least one uppercase letter'
        } else if (values.password && passwordAbsenceCaractereSpeciaux.test(values.password)) {
            errors.password = 'Password must not contain special characters except : @, _, -, !, $, &'
        }
        if (!values.confirmPassword) {
            errors.confirmPassword = 'Confirm your password'
        }
        if (values.password !== values.confirmPassword) {
            errors.confirmPassword = 'Passwords do not match'
        }
        return errors
    }
    const onSubmit = async (values) => {
        try {
            const response = await axios.post(`http://localhost:3000/api/auth/resetPassword/${token}`, { email: values.email, newPassword: values.password });
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
        <section className="reset-password-page">
            {
                email
                ?
                <>
                    <h3>Reset password</h3>
                    <form onSubmit={formik.handleSubmit} className="form-reset-password">
                        <label htmlFor="email">Email</label>
                        <input name="email" type="text" disabled value={formik.values.email} />
                        <label htmlFor="password">New password</label>
                        <div className="container-password">
                            <input name="password" id="password" type={passwordVisible === true ? "text" : "password"} autoComplete="new-password" required placeholder="Enter your password" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} />
                            <i onClick={() => VisibilityPassword()} className={`fa-regular fa-eye${passwordVisible === true ? "" : "-slash"}`}></i>
                            {formik.touched.password && formik.errors.password ? <p className='msg-error'>{formik.errors.password}</p> : null}
                        </div>
                        <label htmlFor="confirmPassword">Repeat Password</label>
                        <div className="container-password">
                            <input name="confirmPassword" id="repeat-password" type={confirmPasswordVisible === true ? "text" : "password"} required placeholder="Repeat your password" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.confirmPassword} />
                            <i onClick={() => VisibilityConfirmPassword()} className={`fa-regular fa-eye${confirmPasswordVisible === true ? "" : "-slash"}`}></i>
                            {formik.touched.confirmPassword && formik.errors.confirmPassword ? <p className='msg-error'>{formik.errors.confirmPassword}</p> : null}
                        </div>
                        <button type="submit">Reset password</button>
                    </form>
                    {message === "" ? null : <p className='msg-error-send'>{message}</p>} 
                </>
                :
                    message === "Password reset successful"
                    ?
                    <div className="reset-password-success">
                        <p className="intro"><i className="fa-regular fa-circle-check"></i> Your password has been successfully reset.</p>
                        <p>You will be redirected to the login page......</p>
                    </div>
                    :
                    <div className="link-used">
                        <p className="intro"> <i className="fa-solid fa-circle-exclamation"></i> This link is already used</p>
                        <p>Click below to resend the email for reset your password</p>
                        <NavLink className="link-to" to="/forgotPassword">Reset password</NavLink>
                    </div>
            }
        </section>
    )
}