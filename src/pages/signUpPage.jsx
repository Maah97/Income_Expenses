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

export default function SignUpPage() {
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
            await axios.post('http://localhost:3000/api/auth/signup',{
                userName: values.userName,
                birthDay: values.birthday,
                gender: values.gender,
                occupation: values.occupation,
                phoneNumber: values.phoneNumber,
                email: values.email,
                password: values.password,
                dateInscription: date
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
            errors.userName = 'You must enter your name'
        }
        if (values.userName && values.userName.length < 4) {
            errors.userName = 'Put a name whose has at least 4 characters'
        }
        if (!values.gender) {
            errors.gender = 'You must select your gender'
        }
        if (!values.email) {
            errors.email = 'You must enter your email'
        } else if (values.email && !emailregExp.test(values.email)) {
             errors.email = 'Enter a valid email like : web.dev02@project.com'
        }  
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
        if (!values.repeatPassword) {
            errors.repeatPassword = 'You must confirm your password'
        }
        if (values.password !== values.repeatPassword) {
            errors.repeatPassword = 'Passwords do not match'
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
        <div className="signUp-page">
            <p>{user ? "Add an Account" : "Sign Up"}</p>
            <form onSubmit={formik.handleSubmit} className="form-login">
                <div className="general-informations">
                    <p>General informations</p>
                    <label id="label-userName" htmlFor="userName">Name <span>*</span></label>
                    <input type="text" name="userName" placeholder="Enter your name" required id="userName" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.userName} />
                    {formik.touched.userName && formik.errors.userName ? <p className='msg-error'>{formik.errors.userName}</p> : null}
                    <label htmlFor="birthday">Birthday</label>
                    <input type="date" name="birthday" id="birthday" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.birthday} />
                    <label htmlFor="gender">Gender <span>*</span></label>
                    <select name="gender" id="gender" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.gender} required>
                        <option value="">-- choose</option>
                        <option value="MALE">MALE</option>
                        <option value="FEMALE">FEMALE</option>
                    </select>
                    {formik.touched.gender && formik.errors.gender ? <p className='msg-error'>{formik.errors.gender}</p> : null}
                    <label htmlFor="occupation">Occcupation</label>
                    <input type="text" name="occupation" placeholder="Enter your occupation" id="occupation" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.occupation} />
                    <label htmlFor="phoneNumber">Phone Number</label>
                    <PhoneInput
                        country={"us"}
                        inputProps={{
                            name: "phoneNumber"
                        }}
                        enableSearch={true}
                        placeholder="Enter your phone number"
                        onBlur={formik.handleBlur} 
                        onChange={(value) => {
                                formik.setFieldValue("phoneNumber", value)
                            }
                        }
                        value={formik.values.phoneNumber}
                    />
                    <p id="note">Note : Fields with asterisks are required.</p>
                </div>
                <div className="auhentification-info">
                    <p>Authentification informations</p>
                    <label className="required-label" id="email-label" htmlFor="email">Email <span>*</span></label>
                    <input className="required-input" name="email" type="email" placeholder="Enter your Email" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} required />
                    {formik.touched.email && formik.errors.email ? <p  id="msg-error-email" className='msg-error'>{formik.errors.email}</p> : null}
                    <label htmlFor="password">Password <span>*</span></label>
                    <div className="container-password">
                        <input name="password" id="password" type={passwordVisible === true ? "text" : "password"} autoComplete="new-password" required placeholder="Enter your password" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} />
                        <i onClick={() => VisibilityPassword()} className={`fa-regular fa-eye${passwordVisible === true ? "" : "-slash"}`}></i>
                        {formik.touched.password && formik.errors.password ? <p className='msg-error'>{formik.errors.password}</p> : null}
                    </div>
                    <label id="label-repeat-password" htmlFor="password">Confirm your password <span>*</span></label>
                    <div className="container-password">
                        <input name="repeatPassword" id="repeat-password" type={confirmPasswordVisible === true ? "text" : "password"} required placeholder="Repeat your password" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.repeatPassword} />
                        <i onClick={() => VisibilityConfirmPassword()} className={`fa-regular fa-eye${confirmPasswordVisible === true ? "" : "-slash"}`}></i>
                        {formik.touched.repeatPassword && formik.errors.repeatPassword ? <p className='msg-error'>{formik.errors.repeatPassword}</p> : null}
                    </div>
                    <p id="note">Note : Fields with asterisks are required.</p>
                </div>
                <div className="btn">
                    <button type="submit">Sign Up</button>
                </div>
                {message === "This email is already in use." ? <p className="msg-error-existing-email">Registration failed because this email is already in use. Change this Email and retry.</p> : null}
                <p id="question-logIn">You have an account ? <NavLink className="link-to-signup" to="/login">Log In</NavLink></p>
            </form>
        </div>
    )
}