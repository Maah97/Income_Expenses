import PropTypes from 'prop-types'
import Modal from 'react-modal'
import { useFormik } from 'formik'
import axios from 'axios'

export default function UserNameUpdateForm(props) {
    const initialValues = {
        name: props.name
    }
    const validate = values => {
        let errors = {}
        if (!values.name) {
            errors.name = 'Name Required'
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
            <h3>Change your name</h3>
            <p>Your name helps other users recognize when you note this website and lets you know when you are logged in to your account. </p>
            <form onSubmit={formik.handleSubmit} className='update-form'>
                <input name='name' type="text" placeholder='Enter your new name' required onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.name} />
                {formik.touched.name && formik.errors.name ? <p id='msg-error'>{formik.errors.name}</p> : null}
                <input type="submit" className="btn-save-info" value="Save" />
            </form>
        </Modal>
    )
}

UserNameUpdateForm.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    setIsOpen: PropTypes.func.isRequired,
    name: PropTypes.string
}