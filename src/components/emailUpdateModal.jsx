import PropTypes from 'prop-types'
import Modal from 'react-modal'
import { useFormik } from 'formik'
import axios from 'axios'

export default function EmailUpdateForm(props) {
    const initialValues = {
        email: props.email
    }
    const emailregExp = new RegExp("[a-z0-9._-]+@[a-z]+\\.[a-z]+$")
    const validate = values => {
        let errors = {}
        if (!values.email) {
            errors.email = 'Email required'
        } else if (values.email && !emailregExp.test(values.email)) {
             errors.email = 'Enter a valid email like : web.dev02@project.com'
        }
        return errors
    }
    const onSubmit =  async (values, { resetForm }) => {
        try {
            await axios.put('http://localhost:3000/api/auth/updateUser', 
                {info: "email", data: values.email}, 
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
            <h3>Change your address mail</h3>
            <p>Your email address helps us to identify you and send you our offers and services, but also to present you with the new features of the web application.</p>
            <form onSubmit={formik.handleSubmit} className='update-form'>
                <input name='email' type="email" placeholder='Enter your new email' required onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} />
                {formik.touched.email && formik.errors.email ? <p id='msg-error'>{formik.errors.email}</p> : null}
                <input type="submit" className="btn-save-info" value="Save" />
            </form>
        </Modal>
    )
}

EmailUpdateForm.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    setIsOpen: PropTypes.func.isRequired,
    email: PropTypes.string
}