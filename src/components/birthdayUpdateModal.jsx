import PropTypes from 'prop-types'
import Modal from 'react-modal'
import { useFormik } from 'formik'
import axios from 'axios'
import { useContext } from 'react'
import { ThemeContext } from "../context/themeContext"

export default function BirthdayUpdateForm(props) {
    const { theme } = useContext(ThemeContext)
    const initialValues = {
        birthday: props.birthday
    }
    const validate = values => {
        let errors = {}
        if (!values.birthday) {
            errors.birthday = 'birthday Required'
        }
        return errors
    }
    const onSubmit =  async (values, { resetForm }) => {
        try {
            await axios.put(`${import.meta.env.VITE_BASE_URL_USER}/updateUser`, 
                {info: "birthday", data: values.birthday}, 
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
            <h3>Change your birthday</h3>
            <p>Your birthday helps other users when to tell you happy birthday and crate an estimation financial income with your age. </p>
            <form onSubmit={formik.handleSubmit} className='update-form'>
                <input name='birthday' type="date" placeholder='Enter your new birthday' required onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.birthday} />
                {formik.touched.birthday && formik.errors.birthday ? <p id='msg-error'>{formik.errors.birthday}</p> : null}
                <input type="submit" className="btn-save-info" value="Save" />
            </form>
        </Modal>
    )
}

BirthdayUpdateForm.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    setIsOpen: PropTypes.func.isRequired,
    birthday: PropTypes.string
}