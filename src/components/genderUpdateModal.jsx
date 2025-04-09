import PropTypes from 'prop-types'
import Modal from 'react-modal'
import { useFormik } from 'formik'
import { useContext } from 'react'
import axios from 'axios'
import { ThemeContext } from "../context/themeContext"
import { useTranslation } from "react-i18next"

export default function GenderUpdateForm(props) {
    const { t } = useTranslation()
    const { theme } = useContext(ThemeContext)
    const initialValues = {
        gender: props.gender
    }
    const validate = values => {
        let errors = {}
        if (!values.gender) {
            errors.gender = t("genderUpdateModal.errorGender")
        }
        return errors
    }
    const onSubmit =  async (values, { resetForm }) => {
        try {
            await axios.put(`${import.meta.env.VITE_BASE_URL_USER}/updateUser`, 
                {info: "gender", data: values.gender}, 
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
            <h3>{t("genderUpdateModal.h3")}</h3>
            <p>{t("genderUpdateModal.p")}</p>
            <form onSubmit={formik.handleSubmit} className='update-form'>
                <select name="gender" id="gender" required onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.gender}>
                    <option value="">{t("genderUpdateModal.option.choose")}</option>
                    <option value={t("genderUpdateModal.option.male")}>{t("genderUpdateModal.option.male")}</option>
                    <option value={t("genderUpdateModal.option.female")}>{t("genderUpdateModal.option.female")}</option>
                </select>
                {formik.touched.gender && formik.errors.gender ? <p id='msg-error'>{formik.errors.gender}</p> : null}
                <input type="submit" className="btn-save-info" value={t("genderUpdateModal.save")} />
            </form>
        </Modal>
    )
}

GenderUpdateForm.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    setIsOpen: PropTypes.func.isRequired,
    gender: PropTypes.string
}