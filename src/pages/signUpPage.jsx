import { useState } from "react"
import { NavLink } from "react-router-dom"
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

export default function SignUpPage() {
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
    return (
        <div className="signUp-page">
            <p>Sign Up</p>
            <form className="form-login">
                <div className="general-informations">
                    <p>General informations</p>
                    <label htmlFor="username">Name <span>*</span></label>
                    <input type="text" name="username" placeholder="Enter your name" required id="username" />
                    <label htmlFor="birthday">Birthday</label>
                    <input type="date" name="birthday" id="birthday" />
                    <label htmlFor="gender">Gender <span>*</span></label>
                    <select name="gender" id="gender" required>
                        <option value="Man">MALE</option>
                        <option value="Woman">FEMALE</option>
                    </select>
                    <label htmlFor="phoneNumber">Phone Number</label>
                    <PhoneInput
                        country={"us"}
                        enableSearch={true}
                        placeholder="Enter your phone number"
                    />
                    <p id="note">Note : Fields with asterisks are required.</p>
                </div>
                <div className="auhentification-info">
                    <p>Authentification informations</p>
                    <label htmlFor="email">Email <span>*</span></label>
                    <input type="email" placeholder="Enter your Email" required />
                    <label htmlFor="password">Password <span>*</span></label>
                    <div className="container-password">
                        <input id="password" type={passwordVisible === true ? "text" : "password"} autoComplete="new-password" required placeholder="Enter your password" />
                        <i onClick={() => VisibilityPassword()} className={`fa-regular fa-eye${passwordVisible === true ? "" : "-slash"}`}></i>
                    </div>
                    <label htmlFor="password">Confirm your password <span>*</span></label>
                    <div className="container-password">
                        <input id="password" type={confirmPasswordVisible === true ? "text" : "password"} autoComplete="current-password" required placeholder="Repeat your password" />
                        <i onClick={() => VisibilityConfirmPassword()} className={`fa-regular fa-eye${confirmPasswordVisible === true ? "" : "-slash"}`}></i>
                    </div>
                    <p id="note">Note : Fields with asterisks are required.</p>
                </div>
                <div className="btn">
                    <button>Sign Up</button>
                </div>
                <p id="question-logIn">You have an account ? <NavLink className="link-to-signup" to="/login">Log In</NavLink></p>
            </form>
        </div>
    )
}