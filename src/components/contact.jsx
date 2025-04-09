import { useFormik } from 'formik'
import { useContext } from "react"
import { AccountContext } from "../context/accountContext"
import { ThemeContext } from "../context/themeContext"
import { useTranslation } from "react-i18next"

export default function Contact() {
    const { t } = useTranslation()
    const { theme } = useContext(ThemeContext)
    const { sendCommentUser } = useContext(AccountContext);
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
            errors.name = t("contact.errors.name")
        }
        if (!values.email) {
            errors.email = t("contact.errors.email1")
        } else if (values.email && !emailregExp.test(values.email)) {
             errors.email = t("contact.errors.email2")
        }
        if(!values.comment) {
            errors.comment = t("contact.errors.comment")
        }
        return errors
    }
    const formik = useFormik({
        initialValues,
        onSubmit,
        validate
    })
    return (
        <section id="contact" className={theme === 'light' ? "contact" : "contact dark"}>
            <h3>{t("contact.h3")}</h3>
            <p>{t("contact.p")}</p>
            <form onSubmit={formik.handleSubmit} className="form-contact">
                <label htmlFor="name">{t("contact.labelName")}</label>
                <input name='name' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.name} type="text" placeholder={t("contact.placeHolderName")} />
                {formik.touched.name && formik.errors.name ? <p id='msg-error'>{formik.errors.name}</p> : null}
                <label htmlFor="email">{t("contact.labelEmail")}</label>
                <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email}  type="email" name='email' placeholder={t("contact.placeHolderEmail")} />
                {formik.touched.email && formik.errors.email ? <p id='msg-error'>{formik.errors.email}</p> : null}
                <label htmlFor="comment">{t("contact.labelMessage")}</label>
                <textarea onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.comment}  name="comment" id="comment" placeholder={t("contact.placeHolderMessage")} />
                {formik.touched.comment && formik.errors.comment ? <p id='msg-error'>{formik.errors.comment}</p> : null}
                <button type="Submit">{t("contact.submit")}</button>
            </form>
        </section>
    )
}