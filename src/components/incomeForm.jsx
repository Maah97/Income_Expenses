import PropTypes from 'prop-types'
import { useContext } from "react"
import Modal from 'react-modal'
import { useFormik } from 'formik'
import { AccountContext } from "../context/accountContext"

export default function IncomeForm(props) {
    const { createIncomeExpense, reload, setReload } = useContext(AccountContext)
    const initialValues = {
        amount: props.iE ? props.iE.amount : '',
        category: props.iE ? props.iE.category : '',
        paymentMode: props.iE ? props.iE.paymentMode : '',
        remark: props.iE ? props.iE.remark : '',
        date: props.iE ? props.iE.date : '',
        hour: props.iE ? props.iE.hour : '',
    }
    const onSubmit =  (values, { resetForm }) => {
        const type = "income"
        createIncomeExpense(props.id, type, values)
        resetForm()
        props.setIsOpen(false)
        setReload(!reload)
    }
    const validate = values => {
        let errors = {}
        if (!values.amount) {
            errors.amount = 'You must enter your income amount'
        }
        if (isNaN(values.amount)) {
            errors.amount = 'You must enter a number'
        }
        if (!values.category) {
            errors.category = 'You must enter the category of the income'
        }
        if (!values.paymentMode) {
            errors.paymentMode = 'You must enter the payment mode'
        }
        if (!values.remark) {
            errors.remark = 'You must enter the description or remark of your income'
        }
        if (!values.date) {
            errors.date = 'You must define the date'
        }
        if (!values.hour) {
            errors.hour = 'You must define the hour'
        }
        return errors
    }
    const formik = useFormik ({
        initialValues,
        onSubmit,
        validate
    })
    
    return (
        <Modal 
            isOpen={props.isOpen}
            className="content-modal-income"
            overlayClassName="overlay-modal-income"
            onRequestClose={() => props.setIsOpen(false)}
        >
            <div className="title-income">
                <h3>Add an income</h3>
                <div className="i">
                    <i onClick={() => props.setIsOpen(false)} className="fa-solid fa-xmark"></i>
                </div>
            </div>
            <form onSubmit={formik.handleSubmit}>
                <label className="label-income" htmlFor="amount">Income</label>
                <input name='amount' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.amount} placeholder="Enter your income amount" className="input-income" type="text" />
                {formik.touched.amount && formik.errors.amount ? <p id='msg-error-income'>{formik.errors.amount}</p> : null}
                <label htmlFor="category">Category</label>
                <select className="select-income" name="category" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.category} id="category-income">
                    <option value="Business">Business</option>
                    <option value="Allocation">Allocation</option>
                    <option value="Other Income">Other Income</option>
                    <option value="Prime">Prime</option>
                    <option value="Repayment">Loan repayment</option>
                    <option value="pension">Pension</option>
                    <option value="Investment">Investment Income</option>
                    <option value="Salary">Salary</option>
                </select>
                {formik.touched.category && formik.errors.category ? <p id='msg-error-category-income'>{formik.errors.category}</p> : null}
                <label htmlFor="paymentMode">Payment Mode</label>
                <select className="select-income" name="paymentMode" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.paymentMode} id="paymentMode">
                    <option value="Others">Others</option>
                    <option value="Bank">Bank</option>
                    <option value="Map">Map</option>
                    <option value="Species">Species</option>
                </select>
                {formik.touched.paymentMode && formik.errors.paymentMode ? <p id='msg-error-paymentMode'>{formik.errors.paymentMode}</p> : null}
                <label htmlFor="remark">Remark</label>
                <input name='remark' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.remark} placeholder="Enter the description of your income" className="input-income" type="text" />
                {formik.touched.remark && formik.errors.remark ? <p id='msg-error-remark'>{formik.errors.remark}</p> : null}
                <label htmlFor="date">Date</label>
                <input name='date' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.date} className="input-income" type="date" />
                {formik.touched.date && formik.errors.date ? <p id='msg-error-date'>{formik.errors.date}</p> : null}
                <input name='hour' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.hour} className="input-income" type="time" />
                {formik.touched.hour && formik.errors.hour ? <p id='msg-error-hour'>{formik.errors.hour}</p> : null}
                <div className="btn-add-and-cancel-save-income">
                    <button className="btn-save-income" type="submit">{props.iE ? "Modify income" : "Save income"}</button>
                    <button onClick={() => props.setIsOpen(false)} className="btn-save-income">Cancel</button>
                </div>
            </form>
        </Modal>
    )
}

IncomeForm.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    setIsOpen: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    iE: PropTypes.shape({
        date: PropTypes.string.isRequired,
        hour: PropTypes.string.isRequired,
        paymentMode: PropTypes.string,
        remark: PropTypes.string,
        type: PropTypes.string,
        category: PropTypes.string,
        amount: PropTypes.number.isRequired
    })
}