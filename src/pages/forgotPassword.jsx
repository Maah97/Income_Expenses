import { useFormik } from 'formik'
import { useState } from 'react'
import axios from 'axios'

export default function ForgotPassword() {
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState("")
    const initialValues = {
        email: ""
    }
    const validate = values => {
        let errors = {}
        if (!values.email) {
            errors.email = "You must enter an email address"
        } else if (!new RegExp("[a-z0-9._-]+@[a-z]+\\.[a-z]+$").test(values.email)) {
            errors.email = "Invalid email address"
        }
        return errors
    }
    const onSubmit = async (values) => {
        setLoading(false);
        try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL_USER}/sendMailResetPassword`, { email: values.email });
            setMessage(response.data.message);
            setLoading(true);
            localStorage.setItem("email", values.email);
        } catch (error) {
            setMessage(error.response.data.message);
            console.error(error);
        } finally {
            setLoading(false);
        }
    }
    const formik = useFormik ({
        initialValues,
        onSubmit,
        validate
    })
    return (
        <div className="connexion-page">
            <p>Reset Password</p>
            <form onSubmit={formik.handleSubmit} className="form-login">
                <label htmlFor="email">Email</label>
                <input id='email' name="email" type="text" placeholder="Enter your Email" required onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} />
                {formik.touched.email && formik.errors.email ? <p className='msg-error'>{formik.errors.email}</p> : null}
                <div className="btn">
                    <button className="btn-send-reset-password">{loading ? "Redirection in progress..." : "Send"}</button>
                </div>
                <p>A recovery link will be sent to you by email if you click Send</p>
            </form>
            {message === "" ? null : <p className='msg-error-send'>{message}</p>}
        </div>
    )
}