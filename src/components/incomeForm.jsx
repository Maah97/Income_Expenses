import PropTypes from 'prop-types'
import Modal from 'react-modal'
import { useFormik } from 'formik'

export default function IncomeForm(props) {
    const initialValues = {
        income: props.iE ? props.iE.amount : '',
        categoryIncome: props.iE ? props.iE.category : '',
        paymentMode: props.iE ? props.iE.paymentMode : '',
        remark: props.iE ? props.iE.remark : '',
        date: props.iE ? props.iE.date : '',
        hour: props.iE ? props.iE.hour : '',
    }
    const onSubmit =  values => {
        // call API to create a income
        props.setIsOpen(false)
        console.log(values)
    }
    const validate = values => {
        let errors = {}
        if (!values.income) {
            errors.income = 'You must enter your income account'
        }
        if (isNaN(values.income)) {
            errors.income = 'You must enter a number'
        }
        if (!values.categoryIncome) {
            errors.categoryIncome = 'You must enter the category of the income'
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
                <label className="label-income" htmlFor="income">Income</label>
                <input name='income' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.income} placeholder="Enter your income amount" className="input-income" type="text" />
                {formik.touched.income && formik.errors.income ? <p id='msg-error-income'>{formik.errors.income}</p> : null}
                <label htmlFor="categoryIncome">Category</label>
                <select className="select-income" name="categoryIncome" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.categoryIncome} id="category-income">
                    <option value="Business">Business</option>
                    <option value="Allocation">Allocation</option>
                    <option value="Other Income">Other Income</option>
                    <option value="Prime">Prime</option>
                    <option value="Repayment">Loan repayment</option>
                    <option value="pension">Pension</option>
                    <option value="Investment">Investment Income</option>
                    <option value="Salary">Salary</option>
                </select>
                {formik.touched.categoryIncome && formik.errors.categoryIncome ? <p id='msg-error-category-income'>{formik.errors.categoryIncome}</p> : null}
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