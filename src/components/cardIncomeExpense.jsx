import { useState, useContext } from 'react'
import PropTypes from 'prop-types'
import IncomeForm from "../components/incomeForm"
import ExpenseForm from "../components/expenseForm"
import { AccountContext } from "../context/accountContext"
import { useTranslation } from "react-i18next"

export default function CardIncomeExpense({idAccount, iE}) {
    const { t } = useTranslation();
    const { deleteIncomeExpense, setMessage } = useContext(AccountContext)
    const [modalIncome, setModalIncome] = useState(false)
    const [modalExpense, setModalExpense] = useState(false)
    function openModal() {
        if (iE.type === "income") {
            setModalIncome(true)
        } else {
            setModalExpense(true)
        }
    }
    async function deleteOneIncomeExpense() {
        if (confirm(t("cardIncomeExpense.confirm"))) {
            await deleteIncomeExpense(idAccount, iE._id)
            setMessage("")
        } else {
            return false
        }
    }
    return (
        <>
            <article className={iE.type === "income" ? "card-income-expense card-income" : "card-income-expense card-expense"}>
                <div className="date-time-paymentMode">
                    <p><span>{t("cardIncomeExpense.date")}</span></p>
                    <p>{iE.date}</p>
                    <p>{iE.hour}</p>
                    <p><span>{t("cardIncomeExpense.paymentMode")} : </span>{iE.paymentMode}</p>
                </div>
                <div className="category">
                    <p><span>{t("cardIncomeExpense.category")}</span></p>
                    <p>{iE.category}</p>
                    <p><span>{t("cardIncomeExpense.remark")} : </span>{iE.remark}</p>
                </div>
                <div className="income">
                    <p><span>{t("cardIncomeExpense.income")}</span></p>
                    <p>{iE.type === "income" ? iE.amount : "-"}</p>
                </div>
                <div className="expense">
                    <p><span>{t("cardIncomeExpense.expense")}</span></p>
                    <p>{iE.type === "expense" ? iE.amount : "-"}</p>
                </div>
                <div className='modify-delete'>
                    <button onClick={openModal} className='modify'><i className="fa-solid fa-pen-to-square"></i> {t("cardIncomeExpense.modify")}</button>
                    <button onClick={() => deleteOneIncomeExpense()} className="delete"><i className="fa-solid fa-trash"></i> {t("cardIncomeExpense.delete")}</button>
                </div>
            </article>
            <IncomeForm id={idAccount} isOpen={modalIncome} setIsOpen={setModalIncome} iE={iE} />
            <ExpenseForm id={idAccount} isOpen={modalExpense} setIsOpen={setModalExpense} iE={iE}/>
        </>
        
        
    )
}

CardIncomeExpense.propTypes = {
    idAccount: PropTypes.string.isRequired,
    iE: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        hour: PropTypes.string.isRequired,
        paymentMode: PropTypes.string,
        remark: PropTypes.string,
        type: PropTypes.string,
        category: PropTypes.string,
        amount: PropTypes.number.isRequired
    }).isRequired
};  