import PropTypes from 'prop-types'
import Modal from 'react-modal'
import { useFormik } from 'formik'
import PhoneInput from "react-phone-input-2"
import axios from 'axios'
import { useState, useContext } from 'react'
import { ThemeContext } from "../context/themeContext"
import { useTranslation } from "react-i18next"

export default function PhoneUpdateForm(props) {
    const { t } = useTranslation()
    const { theme } = useContext(ThemeContext)
    const [formattedPhone, setFormattedPhone] = useState("");
    const formatPhoneNumber = (phone) => {
        if (!phone) return "";
        return phone.replace(/^(\+\d{2})(\d{1})(\d{2})(\d{2})(\d{2})(\d{2})$/, "$1 $2 $3 $4 $5 $6");
    };
    const initialValues = {
        phone: props.phone
    }
    const validate = values => {
        let errors = {}
        if (!values.phone) {
            errors.phone = t("phoneUpdateModal.errorPhone")
        }
        return errors
    }
    const onSubmit =  async (values, { resetForm }) => {
        const finalPhone = formatPhoneNumber(values.phone);
        console.log(formattedPhone);
        
        try {
            await axios.put(`${import.meta.env.VITE_BASE_URL_USER}/updateUser`, 
                {info: "phone number", data: finalPhone}, 
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
            <h3>{t("phoneUpdateModal.h3")}</h3>
            <p>{t("phoneUpdateModal.p")}</p>
            <form onSubmit={formik.handleSubmit} className='update-form'>
                <PhoneInput
                    country={"us"}
                    inputProps={{
                        name: "phone"
                    }}
                    enableSearch={true}
                    placeholder={t("phoneUpdateModal.placeHolder")}
                    onBlur={formik.handleBlur} 
                    onChange={(value) => {
                            formik.setFieldValue("phone", value)
                            setFormattedPhone(formatPhoneNumber(value))
                        }
                    }
                    value={formik.values.phone}
                />
                {formik.touched.phone && formik.errors.phone ? <p id='msg-error'>{formik.errors.phone}</p> : null}
                <input type="submit" className="btn-save-info" value={t("phoneUpdateModal.save")} />
            </form>
        </Modal>
    )
}

PhoneUpdateForm.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    setIsOpen: PropTypes.func.isRequired,
    phone: PropTypes.string
}