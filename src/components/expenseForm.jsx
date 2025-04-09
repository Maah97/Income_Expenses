import PropTypes from 'prop-types'
import { useContext } from "react"
import Modal from 'react-modal'
import { useFormik } from 'formik'
import { AccountContext } from "../context/accountContext"
import { useTranslation } from "react-i18next"

export default function ExpenseForm(props) {
    const { t } = useTranslation()
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
            errors.amount = t("expenseForm.errors.amount")
        }
        if (isNaN(values.amount)) {
            errors.amount = t("expenseForm.errors.amountValid")
        }
        if (!values.category) {
            errors.category = t("expenseForm.errors.category")
        }
        if (!values.paymentMode) {
            errors.paymentMode = t("expenseForm.errors.paymentMode")
        }
        if (!values.remark) {
            errors.remark = t("expenseForm.errors.remark")
        }
        if (!values.date) {
            errors.date = t("expenseForm.errors.date")
        }
        if (!values.hour) {
            errors.hour = t("expenseForm.errors.hour")
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
                    <h3>{props.iE ? t("expenseForm.addH3") : t("expenseForm.modifyH3")}</h3>
                    <div className="i">
                        <i onClick={() => props.setIsOpen(false)} className="fa-solid fa-xmark"></i>
                    </div>
                </div>
                <form onSubmit={formik.handleSubmit}>
                    <label className="label-expense" htmlFor="amount">{t("expenseForm.labelExpense")}</label>
                    <input name='amount' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.amount} placeholder={t("expenseForm.placeHolderExpenses")} className="input-expense" type="text" />
                    {formik.touched.amount && formik.errors.amount ? <p id='msg-error-expense'>{formik.errors.amount}</p> : null}
                    <label htmlFor="category">{t("expenseForm.labelCategory")}</label>
                    <select className="select-expense" name="category" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.category} id="category-expense">
                        <option value={t("expenseForm.optionPurchase")}>{t("expenseForm.optionPurchase")}</option>
                        <option value={t("expenseForm.optionFoodAndDrinks")}>{t("expenseForm.optionFoodAndDrinks")}</option>
                        <option value={t("expenseForm.optionOtherExpense")}>{t("expenseForm.optionOtherExpense")}</option>
                        <option value={t("expenseForm.optionToiletries")}>{t("expenseForm.optionToiletries")}</option>
                        <option value={t("expenseForm.optionInsurance")}>{t("expenseForm.optionInsurance")}</option>
                        <option value={t("expenseForm.optionCarInsurance")}>{t("expenseForm.optionCarInsurance")}</option>
                        <option value={t("expenseForm.optionHomeInsurance")}>{t("expenseForm.optionHomeInsurance")}</option>
                        <option value={t("expenseForm.optionHealthInsurance")}>{t("expenseForm.optionHealthInsurance")}</option>
                        <option value={t("expenseForm.optionBaptismAndMariage")}>{t("expenseForm.optionBaptismAndMariage")}</option>
                        <option value={t("expenseForm.optionTransportAndTaxi")}>{t("expenseForm.optionTransportAndTaxi")}</option>
                        <option value={t("expenseForm.optionLaundry")}>{t("expenseForm.optionLaundry")}</option>
                        <option value={t("expenseForm.optionGifts")}>{t("expenseForm.optionGifts")}</option>
                        <option value={t("expenseForm.optionFuel")}>{t("expenseForm.optionFuel")}</option>
                        <option value={t("expenseForm.optionGaz")}>{t("expenseForm.optionGaz")}</option>
                        <option value={t("expenseForm.optionMobile")}>{t("expenseForm.optionMobile")}</option>
                        <option value={t("expenseForm.optionInternet")}>{t("expenseForm.optionInternet")}</option>
                        <option value={t("expenseForm.optionEntertainment")}>{t("expenseForm.optionEntertainment")}</option>
                        <option value={t("expenseForm.optionInvestmentCosts")}>{t("expenseForm.optionInvestmentCosts")}</option>
                        <option value={t("expenseForm.optionHouseKeepers")}>{t("expenseForm.optionHouseKeepers")}</option>
                        <option value={t("expenseForm.optionCardFees")}>{t("expenseForm.optionCardFees")}</option>
                        <option value={t("expenseForm.optionGymansium")}>{t("expenseForm.optionGymansium")}</option>
                        <option value={t("expenseForm.optionLocation")}>{t("expenseForm.optionLocation")}</option>
                        <option value="Mobile">Mobile</option>
                        <option value={t("expenseForm.optionRepairAndMaintenance")}>{t("expenseForm.optionRepairAndMaintenance")}</option>
                        <option value={t("expenseForm.optionHealth")}>{t("expenseForm.optionHealth")}</option>
                        <option value={t("expenseForm.optionClothing")}>{t("expenseForm.optionClothing")}</option>
                        <option value={t("expenseForm.optionSchoolAndEducation")}>{t("expenseForm.optionSchoolAndEducation")}</option>
                        <option value={t("expenseForm.optionElectricityBill")}>{t("expenseForm.optionElectricityBill")}</option>
                        <option value={t("expenseForm.optionOthersBill")}>{t("expenseForm.optionOthersBill")}</option>
                    </select>
                    {formik.touched.category && formik.errors.category ? <p id='msg-error-categoryExpense'>{formik.errors.category}</p> : null}
                    <label htmlFor={t("expenseForm.labelPaymentMode")}>{t("expenseForm.labelPaymentMode")}</label>
                    <select className="select-expense" name="paymentMode" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.paymentMode} id="paymentMode">
                        <option value={t("expenseForm.optionOthers")}>{t("expenseForm.optionOthers")}</option>
                        <option value={t("expenseForm.optionBank")}>{t("expenseForm.optionBank")}</option>
                        <option value="Map">{t("expenseForm.optionMap")}</option>
                        <option value={t("expenseForm.optionSpicies")}>{t("expenseForm.optionSpicies")}</option>
                    </select>
                    {formik.touched.paymentMode && formik.errors.paymentMode ? <p id='msg-error-paymentMode'>{formik.errors.paymentMode}</p> : null}
                    <label htmlFor="remark">{t("expenseForm.labelRemark")}</label>
                    <input name='remark' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.remark} placeholder={t("expenseForm.placeHolderRemark")} className="input-expense" type="text" />
                    {formik.touched.remark && formik.errors.remark ? <p id='msg-error-remark'>{formik.errors.remark}</p> : null}
                    <label htmlFor="date">{t("expenseForm.labelDate")}</label>
                    <input name='date' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.date} className="input-expense" type="date" />
                    {formik.touched.date && formik.errors.date ? <p id='msg-error-date'>{formik.errors.date}</p> : null}
                    <input name='hour' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.hour} className="input-expense" type="time" />
                    {formik.touched.hour && formik.errors.hour ? <p id='msg-error-hour'>{formik.errors.hour}</p> : null}
                    <div className="btn-add-and-cancel-save-expense">
                        <button className="btn-save-expense" type="submit">{props.iE ? t("expenseForm.modify") : t("expenseForm.save")}</button>
                        <button onClick={() => props.setIsOpen(false)} className="btn-save-expense">{t("expenseForm.cancel")}</button>
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