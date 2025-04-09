import PropTypes from 'prop-types'
import Modal from 'react-modal'
import { useFormik } from 'formik'
import axios from 'axios'
import { ThemeContext } from "../context/themeContext"
import { useContext } from 'react'
import { useTranslation } from "react-i18next"

export default function UserNameUpdateForm(props) {
    const { t } = useTranslation()
    const { theme } = useContext(ThemeContext)
    const initialValues = {
        name: props.name
    }
    const validate = values => {
        let errors = {}
        if (!values.name) {
            errors.name = t("userNameUpdateModal.errorName")
        }
        return errors
    }
    const onSubmit =  async (values, { resetForm }) => {
        try {
            await axios.put(`${import.meta.env.VITE_BASE_URL_USER}/updateUser`, 
                {info: "username", data: values.name}, 
                { withCredentials: true }
            ).then(() => {
                resetForm()
                props.setIsOpen(false)
                window.location.reload()
            }).catch((error) => {
                console.log(error);
            })
        } catch (error) {
                console.log(error);            
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
            className={theme === 'light' ? "content-modal-info" : "content-modal-info dark"}
            overlayClassName={theme === 'light' ? "overlay-modal-info" : "overlay-modal-info dark"}
            onRequestClose={() => props.setIsOpen(false)}
        >
            <div className="title-info">
                    <p><span className="green">Incomes</span><span className="red">Expenses</span></p>
                    <div onClick={() => props.setIsOpen(false)} className="i">
                        <i className="fa-solid fa-xmark"></i>
                    </div>
            </div>
            <h3>{t("userNameUpdateModal.h3")}</h3>
            <p>{t("userNameUpdateModal.p")} </p>
            <form onSubmit={formik.handleSubmit} className='update-form'>
                <input name='name' type="text" placeholder={t("userNameUpdateModal.placeHolder")} required onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.name} />
                {formik.touched.name && formik.errors.name ? <p id='msg-error'>{formik.errors.name}</p> : null}
                <input type="submit" className="btn-save-info" value={t("userNameUpdateModal.save")} />
            </form>
        </Modal>
    )
}

UserNameUpdateForm.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    setIsOpen: PropTypes.func.isRequired,
    name: PropTypes.string
}