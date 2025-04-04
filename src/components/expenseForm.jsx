import PropTypes from 'prop-types'
import { useContext } from "react"
import Modal from 'react-modal'
import { useFormik } from 'formik'
import { AccountContext } from "../context/accountContext"

export default function ExpenseForm(props) {
    const { createIncomeExpense, modifyIncomeExpense, setMessage, reload, setReload } = useContext(AccountContext)
    const initialValues = {
        amount: props.iE ? props.iE.amount : '',
        category: props.iE ? props.iE.category : '',
        paymentMode: props.iE ? props.iE.paymentMode : '',
        remark: props.iE ? props.iE.remark : '',
        date: props.iE ? props.iE.date : '',
        hour: props.iE ? props.iE.hour : '',
    }
    const onSubmit =  async (values, { resetForm }) => {
        let incomeExpense = false
        const type = "expense"
        if (props.iE) {
            incomeExpense = await modifyIncomeExpense(props.id, props.iE._id, values, type)
        } else {
            incomeExpense = await createIncomeExpense(props.id, type, values)
        }
        if (incomeExpense) {
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

        if (!values.amount) {
            errors.amount = 'You must enter your expense amount'
        }
        if (isNaN(values.amount)) {
            errors.amount = 'You must enter a number'
        }
        if (!values.category) {
            errors.category = 'You must enter the category of the expense'
        }
        if (!values.paymentMode) {
            errors.paymentMode = 'You must enter the payment mode'
        }
        if (!values.remark) {
            errors.remark = 'You must enter the description or remark of your expense'
        }
        if (!values.date) {
            errors.date = 'You must define the date'
        }
        if (!values.hour) {
            errors.hour = 'You must define the hour'
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
                className="content-modal-expenses"
                overlayClassName="overlay-modal-expenses"
                onRequestClose={() => props.setIsOpen(false)}
            >
                <div className="title-expense">
                    <h3>Add an expense</h3>
                    <div className="i">
                        <i onClick={() => props.setIsOpen(false)} className="fa-solid fa-xmark"></i>
                    </div>
                </div>
                <form onSubmit={formik.handleSubmit}>
                    <label className="label-expense" htmlFor="amount">Expense</label>
                    <input name='amount' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.amount} placeholder="Enter your expense amount" className="input-expense" type="text" />
                    {formik.touched.amount && formik.errors.amount ? <p id='msg-error-expense'>{formik.errors.amount}</p> : null}
                    <label htmlFor="category">Category</label>
                    <select className="select-expense" name="category" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.category} id="category-expense">
                        <option value="Purchase">Purchase</option>
                        <option value="Food And Drinks">Food and Drinks</option>
                        <option value="Other expense">Other Expense</option>
                        <option value="Toiletries">Toiletries</option>
                        <option value="Insurance">Insurance</option>
                        <option value="Car Insurance">Car Insurance</option>
                        <option value="Home Insurance">Home Insurance</option>
                        <option value="Health Insurance">Health insurance</option>
                        <option value="Baptism And Marriage">Baptism And Marriage</option>
                        <option value="Transport And Taxi">Transport and taxi</option>
                        <option value="Laundry">Laundry</option>
                        <option value="Gifts">Gifts</option>
                        <option value="Fuel">Fuel</option>
                        <option value="Gaz">Gaz</option>
                        <option value="Mobile">Mobile</option>
                        <option value="Internet">Internet</option>
                        <option value="Entertainment">Entertainment</option>
                        <option value="Investment Costs">Investment Costs</option>
                        <option value="House Keepers">House Keepers</option>
                        <option value="card Fees">Card Fees</option>
                        <option value="Gymnasium">Gymnasium</option>
                        <option value="Location">Location</option>
                        <option value="Mobile">Mobile</option>
                        <option value="Repair And Maintenance">Repair And Maintenance</option>
                        <option value="Health">Health</option>
                        <option value="Clothing">Clothing</option>
                        <option value="School And Education">School and Education</option>
                        <option value="Electricity Bill">Electricity Bill</option>
                        <option value="Others Bill (Water,...)">Others Bill (Water,...)</option>
                    </select>
                    {formik.touched.category && formik.errors.category ? <p id='msg-error-categoryExpense'>{formik.errors.category}</p> : null}
                    <label htmlFor="paymentMode">Payment Mode</label>
                    <select className="select-expense" name="paymentMode" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.paymentMode} id="paymentMode">
                        <option value="Others">Others</option>
                        <option value="Bank">Bank</option>
                        <option value="Map">Map</option>
                        <option value="Species">Species</option>
                    </select>
                    {formik.touched.paymentMode && formik.errors.paymentMode ? <p id='msg-error-paymentMode'>{formik.errors.paymentMode}</p> : null}
                    <label htmlFor="remark">Remark</label>
                    <input name='remark' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.remark} placeholder="Enter the description of your expense" className="input-expense" type="text" />
                    {formik.touched.remark && formik.errors.remark ? <p id='msg-error-remark'>{formik.errors.remark}</p> : null}
                    <label htmlFor="date">Date</label>
                    <input name='date' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.date} className="input-expense" type="date" />
                    {formik.touched.date && formik.errors.date ? <p id='msg-error-date'>{formik.errors.date}</p> : null}
                    <input name='hour' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.hour} className="input-expense" type="time" />
                    {formik.touched.hour && formik.errors.hour ? <p id='msg-error-hour'>{formik.errors.hour}</p> : null}
                    <div className="btn-add-and-cancel-save-expense">
                        <button className="btn-save-expense" type="submit">{props.iE ? "Modify expense" : "Save expense"}</button>
                        <button onClick={() => props.setIsOpen(false)} className="btn-save-expense">Cancel</button>
                    </div>
                </form>
            </Modal>
    )
}

ExpenseForm.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    setIsOpen: PropTypes.func.isRequired,
    id: PropTypes.string,
    iE: PropTypes.shape({
            date: PropTypes.string.isRequired,
            hour: PropTypes.string.isRequired,
            paymentMode: PropTypes.string,
            remark: PropTypes.string,
            type: PropTypes.string,
            category: PropTypes.string,
            amount: PropTypes.number.isRequired,
            _id: PropTypes.string.isRequired
    })
}