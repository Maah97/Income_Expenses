import PropTypes from 'prop-types'
import Modal from 'react-modal'
import { useFormik } from 'formik'
import { useState, useContext } from 'react'
import axios from 'axios'
import { ThemeContext } from "../context/themeContext"

export default function UserNameUpdateForm(props) {
    const { theme } = useContext(ThemeContext)
    const [msg, setMsg] = useState("")
    const [oldPasswordVisible, setOldPasswordVisible] = useState(false)
    const [passwordVisible, setPasswordVisible] = useState(false)
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false)
    function VisibilityOldPassword() {
        if (oldPasswordVisible === true) {
            setOldPasswordVisible(false)
        } else {
            setOldPasswordVisible(true)
        }
    }
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
    const initialValues = {
        oldPassword: '',
        password: '',
        confirmPassword: ''
    }
    const passwordPresenceChiffre = new RegExp("[0-9]{1}")
    const passwordPresenceMinuscule = new RegExp("[a-z]{1}")
    const passwordPresenceMajuscule = new RegExp("[A-Z]{1}")
    const passwordAbsenceCaractereSpeciaux = new RegExp("[\\ \\+\\\\%\\*\\#\\~\\)\\(\\ù\\=\\.\\;\\§\\£\\µ\\²\\ç\\/\\°\\<\\>\\`\\'\\\"\\^\\¨\\||\\{\\}\\[\\]\\?\\:\\,\\à\\è\\é\\ù]")
    const validate = values => {
        let errors = {}
        if (!values.oldPassword) {
            errors.oldPassword = 'Old password Required'
        }
        if (!values.password) {
            errors.password = 'New password Required'
        }
        if (!values.confirmPassword) {
            errors.confirmPassword = 'Confirmation Required'
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
        if (values.password !== values.confirmPassword) {
            errors.confirmPassword = 'Passwords do not match'
        }
        return errors
    }
    const onSubmit =  async (values, { resetForm }) => {
        try {
            await axios.put(`${import.meta.env.VITE_BASE_URL_USER}/updateUser`, 
                { info: "password", newPassword: values.password, oldPassword: values.oldPassword }, 
                { withCredentials: true }
            ).then(() => {
                resetForm()
                props.setIsOpen(false)
                window.location.reload()
            }).catch((error) => {
                const inputOldPassword = document.querySelector("#input-old-password")
                const labelOldPassword = document.querySelector("#label-old-password")
                inputOldPassword.style.border = "2px solid red"
                labelOldPassword.style.color = "red"
                inputOldPassword.addEventListener("focus", () => {
                    labelOldPassword.style.color = "black"
                    inputOldPassword.style.border = "2px solid rgb(138, 138, 138)"
                    inputOldPassword.style.boxShadow = "0px 0px 3px rgba(0, 0, 0, 0.363)"
                    setMsg("")
                })
                setMsg(error.response.data.message)
            })
        } catch (error) {
            const inputOldPassword = document.querySelector("#input-old-password")
            const labelOldPassword = document.querySelector("#label-old-password")
            inputOldPassword.style.border = "2px solid red"
            labelOldPassword.style.color = "red"
            inputOldPassword.addEventListener("focus", () => {
                labelOldPassword.style.color = "black"
                inputOldPassword.style.border = "2px solid rgb(138, 138, 138)"
                inputOldPassword.style.boxShadow = "0px 0px 3px rgba(0, 0, 0, 0.363)"
                setMsg("")
            })
            setMsg(error.response.data.message)          
        }
    }
    const formik = useFormik({
        initialValues,
        onSubmit,
        validate
    })
    return (
        <Modal
            isOpen={props.isOpen}
            className={theme === 'light' ? "content-modal-info password" : "content-modal-info password dark"}
            overlayClassName={theme === 'light' ? "overlay-modal-info" : "overlay-modal-info dark"}
            onRequestClose={() => props.setIsOpen(false)}
        >
            <div className="title-info">
                    <p><span className="green">Incomes</span><span className="red">Expenses</span></p>
                    <div onClick={() => props.setIsOpen(false)} className="i">
                        <i className="fa-solid fa-xmark"></i>
                    </div>
            </div>
            <h3>Change your Password</h3>
            <p>You can change your password if you feel it is compromised.</p>
            <form onSubmit={formik.handleSubmit} className='update-form password'>
                <label id="label-old-password" htmlFor="oldPassword">Old password</label>
                <input name="oldPassword" id="input-old-password" type={oldPasswordVisible === true ? "text" : "password"} required placeholder="Enter your old password" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.oldPassword} />
                <i onClick={() => VisibilityOldPassword()} className={`fa-regular fa-eye${oldPasswordVisible === true ? "" : "-slash"}`}></i>
                {formik.touched.oldPassword && formik.errors.oldPassword ? <p id='msg-error'>{formik.errors.oldPassword}</p> : null}
                <label htmlFor="password">New password</label>
                <input name="password" id="password" type={passwordVisible === true ? "text" : "password"} required placeholder="Enter your new password" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} />
                <i onClick={() => VisibilityPassword()} className={`fa-regular fa-eye${passwordVisible === true ? "" : "-slash"}`}></i>
                {formik.touched.password && formik.errors.password ? <p id='msg-error'>{formik.errors.password}</p> : null}
                <label htmlFor="confirmPassword">Confirm password</label>
                <input name="confirmPassword" id="confirmPassword" type={confirmPasswordVisible === true ? "text" : "password"} required placeholder="Repeat your new password" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.confirmPassword} />
                <i onClick={() => VisibilityConfirmPassword()} className={`fa-regular fa-eye${confirmPasswordVisible === true ? "" : "-slash"}`}></i>
                {formik.touched.confirmPassword && formik.errors.confirmPassword ? <p id='msg-error'>{formik.errors.confirmPassword}</p> : null}
                <button id='btn-submit' type="submit" className="btn-save-info">Save</button>
            </form>
            <p className='error-password'>{msg}</p>
        </Modal>
    )
}

UserNameUpdateForm.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    setIsOpen: PropTypes.func.isRequired,
}