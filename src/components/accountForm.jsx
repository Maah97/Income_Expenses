import PropTypes from 'prop-types'
import { useFormik } from 'formik'
import { useContext } from 'react'
import { AccountContext } from "../context/accountContext"
import Modal from 'react-modal'
import { useEffect } from 'react'
Modal.setAppElement('#root')
export default function AccountForm(props) {
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
    useEffect(()=>{
        console.log(initialValues);
        
    })
    const validate = values => {
        let errors = {}

        if (!values.nameAccount) {
            errors.nameAccount = 'You must enter a name of your account'
        }
        if (!values.descriptionAccount) {
            errors.descriptionAccount = 'You must enter the description of your account'
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
            className="content-modal"
            overlayClassName="overlay-modal"
            onRequestClose={() => props.setIsOpen(false)}
        >
            <h1>Create your account</h1>
            <form onSubmit={formik.handleSubmit}>
                <label htmlFor="nameAccount">Name</label>
                <input className='input-txt' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.nameAccount} name='nameAccount' id='nameAccount' placeholder='Enter the name account (Example : Expenses for the month of March)' type="text" />
                {formik.touched.nameAccount && formik.errors.nameAccount ? <p id='msg-error-name'>{formik.errors.nameAccount}</p> : null}
                <label htmlFor="descriptionAccount">Description</label>
                <textarea className='input-txt' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.descriptionAccount} name='descriptionAccount' id='descriptionAccount' placeholder='Enter the description account' type="text" />
                {formik.touched.descriptionAccount && formik.errors.descriptionAccount ? <p id='msg-error-description'>{formik.errors.descriptionAccount}</p> : null}
                <div className='btn-ok-cancel'>
                    <button type='submit' className='ok'>{props.account ? 'Modify' : 'Ok'}</button>
                    <button onClick={() => props.setIsOpen(false)} className='cancel'>Cancel</button>
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