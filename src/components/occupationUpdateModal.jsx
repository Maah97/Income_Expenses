import PropTypes from 'prop-types'
import Modal from 'react-modal'
import { useFormik } from 'formik'
import axios from 'axios'

export default function OccupationUpdateForm(props) {
    const initialValues = {
        occupation: props.occupation
    }
    const validate = values => {
        let errors = {}
        if (!values.occupation) {
            errors.occupation = 'Occupation Required'
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
            <h3>Change your occupation</h3>
            <p>Your occupation helps other users what professional activities you are doing.</p>
            <form onSubmit={formik.handleSubmit} className='update-form'>
                <input name='occupation' type="text" placeholder='Enter your new occupation' required onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.occupation} />
                {formik.touched.occupation && formik.errors.occupation ? <p id='msg-error'>{formik.errors.occupation}</p> : null}
                <input type="submit" className="btn-save-info" value="Save" />
            </form>
        </Modal>
    )
}

OccupationUpdateForm.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    setIsOpen: PropTypes.func.isRequired,
    occupation: PropTypes.string
}