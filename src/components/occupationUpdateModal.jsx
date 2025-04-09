import PropTypes from 'prop-types'
import Modal from 'react-modal'
import { useFormik } from 'formik'
import axios from 'axios'
import { ThemeContext } from "../context/themeContext"
import { useContext } from 'react'
import { useTranslation } from "react-i18next"

export default function OccupationUpdateForm(props) {
    const { t } = useTranslation()
    const { theme } = useContext(ThemeContext)
    const initialValues = {
        occupation: props.occupation
    }
    const validate = values => {
        let errors = {}
        if (!values.occupation) {
            errors.occupation = t("occupationUpdateModal.errorOccupation")
        }
        return errors
    }
    const onSubmit =  async (values, { resetForm }) => {
        try {
            await axios.put(`${import.meta.env.VITE_BASE_URL_USER}/updateUser`, 
                {info: "occupation", data: values.occupation}, 
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
            <h3>{t("occupationUpdateModal.h3")}</h3>
            <p>{t("occupationUpdateModal.p")}</p>
            <form onSubmit={formik.handleSubmit} className='update-form'>
                <input name='occupation' type="text" placeholder={t("occupationUpdateModal.placeHolder")} required onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.occupation} />
                {formik.touched.occupation && formik.errors.occupation ? <p id='msg-error'>{formik.errors.occupation}</p> : null}
                <input type="submit" className="btn-save-info" value={t("occupationUpdateModal.save")} />
            </form>
        </Modal>
    )
}

OccupationUpdateForm.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    setIsOpen: PropTypes.func.isRequired,
    occupation: PropTypes.string
}