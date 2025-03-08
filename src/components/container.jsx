import Modal from 'react-modal'
import imgContainerAccount from '../assets/imgIncomeExpenses.webp'
import { useState } from 'react'
import { useFormik } from 'formik'
import Account from './account'
import accounts from '../account.json' // replace by a call API for get all accounts
Modal.setAppElement('#root')

export default function Container() {
    const [isOpen, setIsOpen] = useState(false)
    const date = new Date()
    const initialValues = {
        nameAccount: '',
        descriptionAccount: '',
        date: `${date.getDate()}/0${date.getMonth()+1}/${date.getFullYear()} à ${date.getHours()}:${date.getMinutes()}`
    }
    const onSubmit =  values => {
        // call API to create a account
        setIsOpen(false)
        console.log(values)
    }
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
        <section className="container">
            <div className="container-btn">
                <button onClick={() => setIsOpen(true)} className="btn-add-account">+ Create account</button>
            </div>
            <div className="box-container-account">
                <div className="container-account">
                    {
                        accounts.length > 0 ? accounts.map(account => {
                            return <Account key={account.id} account={account} />
                        }) : <div className='img-no-account'><img src={imgContainerAccount} alt="" />
                        <p className='no-account'>No account available</p></div>
                    }
                </div>
            </div>
            <Modal 
                isOpen={isOpen}
                className="content-modal"
                overlayClassName="overlay-modal"
                onRequestClose={() => setIsOpen(false)}
            >
                <h1>Create your account</h1>
                <form onSubmit={formik.handleSubmit}>
                    <label htmlFor="nameAccount">Name</label>
                    <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.nameAccount} name='nameAccount' id='nameAccount' placeholder='Enter the name account (Example : Expenses for the month of March)' type="text" />
                    {formik.touched.nameAccount && formik.errors.nameAccount ? <p id='msg-error-name'>{formik.errors.nameAccount}</p> : null}
                    <label htmlFor="descriptionAccount">Description</label>
                    <textarea onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.descriptionAccount} name='descriptionAccount' id='descriptionAccount' placeholder='Enter the description account' type="text" />
                    {formik.touched.descriptionAccount && formik.errors.descriptionAccount ? <p id='msg-error-description'>{formik.errors.descriptionAccount}</p> : null}
                    <div className='btn-ok-cancel'>
                        <button type='submit' className='ok'>Ok</button>
                        <button onClick={() => setIsOpen(false)} className='cancel'>Cancel</button>
                    </div>
                </form>
            </Modal>
        </section>
    )
}