import { useState } from "react"
import { NavLink } from "react-router-dom"

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
        <div className="connexion-page">
            <p>Sign Up</p>
            <form className="form-login">
                <label htmlFor="email">Email</label>
                <input type="email" placeholder="Enter your Email" required />
                <label htmlFor="password">Password</label>
                <div className="container-password">
                    <input id="password" type={passwordVisible === true ? "text" : "password"} autoComplete="new-password" required placeholder="Enter your password" />
                    <i onClick={() => VisibilityPassword()} className={`fa-regular fa-eye${passwordVisible === true ? "" : "-slash"}`}></i>
                </div>
                <label htmlFor="password">Confirm your password</label>
                <div className="container-password">
                    <input id="password" type={confirmPasswordVisible === true ? "text" : "password"} autoComplete="current-password" required placeholder="Repeat your password" />
                    <i onClick={() => VisibilityConfirmPassword()} className={`fa-regular fa-eye${confirmPasswordVisible === true ? "" : "-slash"}`}></i>
                </div>
                <div className="btn">
                    <button>Sign Up</button>
                </div>
                <p>You have an account ? <NavLink className="link-to-signup" to="/login">Log In</NavLink></p>
            </form>
        </div>
    )
}