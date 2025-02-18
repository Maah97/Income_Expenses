import { useState } from "react"
import { NavLink } from "react-router-dom"
import { useFormik } from 'formik'
import axios from 'axios'

export default function ConnexionPage() {
    const [passwordVisible, setPasswordVisible] = useState(false)
    const [message, setMessage] = useState("")
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
        try {
            await axios.post('http://localhost:3000/api/auth/login', {
                email: values.email,
                password: values.password
            }).then((response) => {
                setMessage(response.data.message)
                let tokenAuthentification = response.data.token
                localStorage.setItem("token", tokenAuthentification)
            }).catch((error) => {
                document.querySelectorAll("label").forEach((label) => {
                    label.style.color = "red"
                })
                document.querySelectorAll("input").forEach((input) => {
                    input.style.border = "2px solid red"
                    input.addEventListener("focus", () => {
                        document.querySelectorAll("label").forEach((label) => {
                            label.style.color = "black"
                        })
                        document.querySelectorAll("input").forEach((input) => {
                            input.style.border = "1px solid rgb(72, 126, 212)"
                        })
                        setMessage("")
                    })
                })
                setMessage(error.response.data.message)
            });
        } catch (error) {
            console.error(error)
            document.querySelectorAll("input").forEach((input) => {
                input.style.border = "2px solid red"
                input.addEventListener("focus", () => {
                    input.style.border = "1px solid rgb(72, 126, 212)"
                    setMessage("")
                })
            })
            setMessage("Error connecting to the server.")
        }
    }
    const formik = useFormik ({
        initialValues,
        onSubmit,
        validate
    })
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
                    <NavLink className="link-to-reset-password" to="/resetPassword">Forgot password ?</NavLink>
                </div>
                {message === "" ? null : <p className="msg-error-existing-email">{message}</p>}
                <p className="link-redirection-to-signup">You don&apos;t have an account ? <NavLink className="link-to-signup" to="/signUp">Sign Up</NavLink></p>
            </form>
        </div>
    )
}