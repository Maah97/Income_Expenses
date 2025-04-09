import PropTypes from 'prop-types'
import { useContext } from "react"
import Modal from 'react-modal'
import { useFormik } from 'formik'
import { AccountContext } from "../context/accountContext"
import { useTranslation } from "react-i18next"

export default function IncomeForm(props) {
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
        const type = "income"
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
            errors.amount = t("incomeForm.errors.amount")
        }
        if (isNaN(values.amount)) {
            errors.amount = t("incomeForm.errors.amountValid")
        }
        if (!values.category) {
            errors.category = t("incomeForm.errors.category")
        }
        if (!values.paymentMode) {
            errors.paymentMode = t("incomeForm.errors.paymentMode")
        }
        if (!values.remark) {
            errors.remark = t("incomeForm.errors.remark")
        }
        if (!values.date) {
            errors.date = t("incomeForm.errors.date")
        }
        if (!values.hour) {
            errors.hour = t("incomeForm.errors.hour")
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
                <h3>{props.iE ? t("incomeForm.modifyH3") : t("incomeForm.addH3")}</h3>
                <div className="i">
                    <i onClick={() => props.setIsOpen(false)} className="fa-solid fa-xmark"></i>
                </div>
            </div>
            <form onSubmit={formik.handleSubmit}>
                <label className="label-income" htmlFor="amount">{t("incomeForm.labelIncome")}</label>
                <input name='amount' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.amount} placeholder={t("incomeForm.placeHolderIncome")} className="input-income" type="text" />
                {formik.touched.amount && formik.errors.amount ? <p id='msg-error-income'>{formik.errors.amount}</p> : null}
                <label htmlFor="category">{t("incomeForm.labelCategory")}</label>
                <select className="select-income" name="category" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.category} id="category-income">
                    <option value={t("incomeForm.optionsCategory.business")}>{t("incomeForm.optionsCategory.business")}</option>
                    <option value={t("incomeForm.optionsCategory.allocation")}>{t("incomeForm.optionsCategory.allocation")}</option>
                    <option value={t("incomeForm.optionsCategory.otherIncome")}>{t("incomeForm.optionsCategory.otherIncome")}</option>
                    <option value={t("incomeForm.optionsCategory.prime")}>{t("incomeForm.optionsCategory.prime")}</option>
                    <option value={t("incomeForm.optionsCategory.repayment")}>{t("incomeForm.optionsCategory.repayment")}</option>
                    <option value={t("incomeForm.optionsCategory.pension")}>{t("incomeForm.optionsCategory.pension")}</option>
                    <option value={t("incomeForm.optionsCategory.investment")}>{t("incomeForm.optionsCategory.salary")}</option>
                    <option value={t("incomeForm.optionsCategory.salary")}>{t("incomeForm.optionsCategory.salary")}</option>
                </select>
                {formik.touched.category && formik.errors.category ? <p id='msg-error-category-income'>{formik.errors.category}</p> : null}
                <label htmlFor="paymentMode">{t("incomeForm.labelPaymentMode")}</label>
                <select className="select-income" name="paymentMode" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.paymentMode} id="paymentMode">
                    <option value={t("incomeForm.optionsPaymentMode.others")}>{t("incomeForm.optionsPaymentMode.others")}</option>
                    <option value={t("incomeForm.optionsPaymentMode.bank")}>{t("incomeForm.optionsPaymentMode.bank")}</option>
                    <option value={t("incomeForm.optionsPaymentMode.map")}>{t("incomeForm.optionsPaymentMode.map")}</option>
                    <option value={t("incomeForm.optionsPaymentMode.species")}>{t("incomeForm.optionsPaymentMode.species")}</option>
                </select>
                {formik.touched.paymentMode && formik.errors.paymentMode ? <p id='msg-error-paymentMode'>{formik.errors.paymentMode}</p> : null}
                <label htmlFor="remark">{t("incomeForm.labelRemark")}</label>
                <input name='remark' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.remark} placeholder={t("incomeForm.placeHolderRemark")} className="input-income" type="text" />
                {formik.touched.remark && formik.errors.remark ? <p id='msg-error-remark'>{formik.errors.remark}</p> : null}
                <label htmlFor="date">{t("incomeForm.labelDate")}</label>
                <input name='date' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.date} className="input-income" type="date" />
                {formik.touched.date && formik.errors.date ? <p id='msg-error-date'>{formik.errors.date}</p> : null}
                <input name='hour' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.hour} className="input-income" type="time" />
                {formik.touched.hour && formik.errors.hour ? <p id='msg-error-hour'>{formik.errors.hour}</p> : null}
                <div className="btn-add-and-cancel-save-income">
                    <button className="btn-save-income" type="submit">{props.iE ? t("incomeForm.modify") : t("incomeForm.save")}</button>
                    <button onClick={() => props.setIsOpen(false)} className="btn-save-income">{t("incomeForm.cancel")}</button>
                </div>
            </form>
        </Modal>
    )
}

IncomeForm.propTypes = {
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