import { useState } from "react"
import { NavLink } from "react-router-dom"

export default function ConnexionPage() {
    const [passwordVisible, setPasswordVisible] = useState(false)
    function VisibilityPassword() {
        if (passwordVisible === true) {
            setPasswordVisible(false)
        } else {
            setPasswordVisible(true)
        }
    }
    return (
        <div className="connexion-page">
            <p>Log In</p>
            <form className="form-login">
                <label htmlFor="email">Email</label>
                <input type="email" placeholder="Enter your Email" required />
                <label htmlFor="password">Password</label>
                <div className="container-password">
                    <input id="password" type={passwordVisible === true ? "text" : "password"} autoComplete="new-password" required placeholder="Enter your password" />
                    <i onClick={() => VisibilityPassword()} className={`fa-regular fa-eye${passwordVisible === true ? "" : "-slash"}`}></i>
                </div>
                <div className="btn">
                    <button>Sign In</button>
                    <NavLink className="link-to-reset-password" to="/resetPassword">Forgot password ?</NavLink>
                </div>
                <p>You don&apos;t have an account ? <NavLink className="link-to-signup" to="/signUp">Sign Up</NavLink></p>
            </form>
        </div>
    )
}