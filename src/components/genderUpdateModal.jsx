import PropTypes from 'prop-types'
import Modal from 'react-modal'
import { useFormik } from 'formik'
import axios from 'axios'

export default function GenderUpdateForm(props) {
    const initialValues = {
        gender: props.gender
    }
    const validate = values => {
        let errors = {}
        if (!values.gender) {
            errors.gender = 'Gender Required'
        }
        return errors
    }
    const onSubmit =  async (values, { resetForm }) => {
        try {
            await axios.put('http://localhost:3000/api/auth/updateUser', 
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
            className="content-modal-info"
            overlayClassName="overlay-modal-info"
            onRequestClose={() => props.setIsOpen(false)}
        >
            <div className="title-info">
                    <p><span className="green">Incomes</span><span className="red">Expenses</span></p>
                    <div onClick={() => props.setIsOpen(false)} className="i">
                        <i className="fa-solid fa-xmark"></i>
                    </div>
            </div>
            <h3>Change your gender</h3>
            <p>Your may change your information gender here if you want</p>
            <form onSubmit={formik.handleSubmit} className='update-form'>
                <select name="gender" id="gender" required onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.gender}>
                    <option value="">-- choose</option>
                    <option value="MALE">MALE</option>
                    <option value="FEMALE">FEMALE</option>
                </select>
                {formik.touched.gender && formik.errors.gender ? <p id='msg-error'>{formik.errors.gender}</p> : null}
                <input type="submit" className="btn-save-info" value="Save" />
            </form>
        </Modal>
    )
}

GenderUpdateForm.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    setIsOpen: PropTypes.func.isRequired,
    gender: PropTypes.string
}