import { useState, useContext } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import { useFormik } from 'formik'
import { AuthContext } from "../context/authContext"

export default function ConnexionPage() {
    const navigate = useNavigate()
    const { login, message } = useContext(AuthContext);
    const [passwordVisible, setPasswordVisible] = useState(false)
    const initialValues = {
        email: "",
        password: ""
    }
    const validate = values => {
        let errors = {}
        if (!values.email) {
            errors.email = "You must enter an email address"
        } else if (!new RegExp("[a-z0-9._-]+@[a-z]+\\.[a-z]+$").test(values.email)) {
            errors.email = "Invalid email address"
        }
        if (!values.password) {
            errors.password = 'You must enter a password'
        }
        return errors
    }
    const onSubmit = async (values) => {
        const logIn =  await login(values.email, values.password)
        if (logIn) {
            navigate("/")
            window.location.reload()
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
    return (
        <div className="connexion-page">
            <p>Log In</p>
            <form onSubmit={formik.handleSubmit} className="form-login">
                <label htmlFor="email">Email</label>
                <input name="email" type="text" placeholder="Enter your Email" required onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} />
                {formik.touched.email && formik.errors.email ? <p className='msg-error'>{formik.errors.email}</p> : null}
                <label htmlFor="password">Password</label>
                <div className="container-password">
                    <input id="password" name="password" type={passwordVisible === true ? "text" : "password"} autoComplete="new-password" required placeholder="Enter your password" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} />
                    <i onClick={() => VisibilityPassword()} className={`fa-regular fa-eye${passwordVisible === true ? "" : "-slash"}`}></i>
                    {formik.touched.password && formik.errors.password ? <p className='msg-error'>{formik.errors.password}</p> : null}
                </div>
                <div className="btn">
                    <button type="submit">Log In</button>
                    <NavLink className="link-to-reset-password" to="/forgotPassword">Forgot password ?</NavLink>
                </div>
                {message === "" ? null : <p className="msg-error-existing-email">{message}</p>}
                <p className="link-redirection-to-signup">You don&apos;t have an account ? <NavLink className="link-to-signup" to="/signUp">Sign Up</NavLink></p>
            </form>
        </div>
    )
}