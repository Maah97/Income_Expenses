import { useFormik } from 'formik'
import { useContext } from "react"
import { AuthContext } from "../context/authContext"

export default function Contact() {
    const { sendCommentUser } = useContext(AuthContext);
    const emailregExp = new RegExp("[a-z0-9._-]+@[a-z]+\\.[a-z]+$")
    const initialValues = {
        name: '',
        email: '',
        comment: '',
    }
    const onSubmit =  async (values, { resetForm }) => {
        sendCommentUser(values)
        resetForm()
    }
    const validate = values => {
        let errors = {}

        if (!values.name) {
            errors.name = 'You must enter your name'
        }
        if (!values.email) {
            errors.email = 'You must enter your email'
        } else if (values.email && !emailregExp.test(values.email)) {
             errors.email = 'Enter a valid email'
        }
        if(!values.comment) {
            errors.comment = 'You must enter your message or recommandation'
        }
        return errors
    }
    const formik = useFormik({
        initialValues,
        onSubmit,
        validate
    })
    return (
        <section id="contact" className="contact">
            <h3>Contact</h3>
            <p>Feel free to Contact us by mail or by submitting the form below and we will get back to you as soon as possible</p>
            <form onSubmit={formik.handleSubmit} className="form-contact">
                <label htmlFor="name">Name</label>
                <input name='name' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.name} type="text" placeholder="Enter your name" />
                {formik.touched.name && formik.errors.name ? <p id='msg-error-expense'>{formik.errors.name}</p> : null}
                <label htmlFor="email">Email</label>
                <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email}  type="email" name='email' placeholder="Enter your Email" />
                {formik.touched.email && formik.errors.email ? <p id='msg-error-expense'>{formik.errors.email}</p> : null}
                <label htmlFor="comment">Your message or recommandation</label>
                <textarea onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.comment}  name="comment" id="comment" placeholder="Enter your recommandatoion for a better user experience" />
                {formik.touched.comment && formik.errors.comment ? <p id='msg-error-expense'>{formik.errors.comment}</p> : null}
                <button type="submit">Submit</button>
            </form>
        </section>
    )
}