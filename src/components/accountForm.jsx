import PropTypes from 'prop-types'
import { useFormik } from 'formik'
import { useContext } from 'react'
import { AccountContext } from "../context/accountContext"
import Modal from 'react-modal'
Modal.setAppElement('#root')
import { ThemeContext } from "../context/themeContext"
import { useTranslation } from "react-i18next"

export default function AccountForm(props) {
    const { t } = useTranslation()
    const { theme } = useContext(ThemeContext)
    const { createAccount, modifyAccount, message, setMessage, reload, setReload } = useContext(AccountContext)
    const initialValues = {
        nameAccount: props.account ? props.account.nameAccount : '',
        descriptionAccount: props.account ? props.account.description : '',
    }
    const onSubmit = async (values, { resetForm }) => {
        let account = false
        const date = new Date()
        const dateAccount = `${date.getDate()}/0${date.getMonth()+1}/${date.getFullYear()} à ${date.getHours()}:${date.getMinutes()}`
        if(props.account) {
            account = await modifyAccount(values.nameAccount, values.descriptionAccount, props.account._id, dateAccount)
        } else {
            account = await createAccount(values.nameAccount, values.descriptionAccount, dateAccount)
        }
        if (account) {
            props.setIsOpen(false)
            resetForm()
            setReload(!reload)
            setMessage("")
        } else {
            props.setIsOpen(true)
        }
    }
    const validate = values => {
        let errors = {}

        if (!values.nameAccount) {
            errors.nameAccount = t("accountForm.errors.nameAccount")
        }
        if (!values.descriptionAccount) {
            errors.descriptionAccount = t("accountForm.errors.descriptionAccount")
        }

        return errors
    }
    const formik = useFormik({
        initialValues,
        onSubmit,
        validate
    })
    return (
        <Modal 
            isOpen={props.isOpen}
            className={theme === 'light' ? "content-modal" : "content-modal dark"}
            overlayClassName="overlay-modal"
            onRequestClose={() => props.setIsOpen(false)}
        >
            <h1>{props.account ? t("accountForm.titleMofifyAccount") : t("accountForm.title")}</h1>
            <form onSubmit={formik.handleSubmit}>
                <label htmlFor="nameAccount">{t("accountForm.name")}</label>
                <input className='input-txt' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.nameAccount} name='nameAccount' id='nameAccount' placeholder={t("accountForm.placeHolderName")} type="text" />
                {formik.touched.nameAccount && formik.errors.nameAccount ? <p id='msg-error-name'>{formik.errors.nameAccount}</p> : null}
                <label htmlFor="descriptionAccount">{t("accountForm.description")}</label>
                <textarea className='input-txt' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.descriptionAccount} name='descriptionAccount' id='descriptionAccount' placeholder={t("accountForm.placeHolderDescription")} type="text" />
                {formik.touched.descriptionAccount && formik.errors.descriptionAccount ? <p id='msg-error-description'>{formik.errors.descriptionAccount}</p> : null}
                <div className='btn-ok-cancel'>
                    <button type='submit' className='ok'>{props.account ? t("accountForm.modify") : 'Ok'}</button>
                    <button onClick={() => props.setIsOpen(false)} className='cancel'>{t("accountForm.cancel")}</button>
                </div>
            </form>
            {
                message === "" ? null : <p className='error-msg'>{message}</p>
            }
        </Modal>
    )
}

AccountForm.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    setIsOpen: PropTypes.func.isRequired,
    account: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        nameAccount: PropTypes.string.isRequired,
        description: PropTypes.string,
        createDate: PropTypes.string
    })
};  