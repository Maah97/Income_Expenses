import { useState } from 'react'
import PropTypes from 'prop-types'
import IncomeForm from "../components/incomeForm"
import ExpenseForm from "../components/expenseForm"

export default function CardIncomeExpense({iE}) {
    const [modalIncome, setModalIncome] = useState(false)
    const [modalExpense, setModalExpense] = useState(false)
    function openModal() {
        if (iE.type === "income") {
            setModalIncome(true)
        } else {
            setModalExpense(true)
        }
    }
    return (
        <>
            <article onClick={openModal} className={iE.type === "income" ? "card-income-expense card-income" : "card-income-expense card-expense"}>
                <div className="date-time-paymentMode">
                    <p><span>Date</span></p>
                    <p>{iE.date}</p>
                    <p>{iE.hour}</p>
                    <p><span>payment mode : </span>{iE.paymentMode}</p>
                </div>
                <div className="category">
                    <p><span>Category</span></p>
                    <p>{iE.category}</p>
                    <p><span>Remark : </span>{iE.remark}</p>
                </div>
                <div className="income">
                    <p><span>Income</span></p>
                    <p>{iE.type === "income" ? iE.amount : "-"}</p>
                </div>
                <div className="expense">
                    <p><span>Expense</span></p>
                    <p>{iE.type === "expense" ? iE.amount : "-"}</p>
                </div>
            </article>
            <IncomeForm isOpen={modalIncome} setIsOpen={setModalIncome} iE={iE} />
            <ExpenseForm isOpen={modalExpense} setIsOpen={setModalExpense} iE={iE}/>
        </>
        
        
    )
}

CardIncomeExpense.propTypes = {
    iE: PropTypes.shape({
        date: PropTypes.string.isRequired,
        hour: PropTypes.string.isRequired,
        paymentMode: PropTypes.string,
        remark: PropTypes.string,
        type: PropTypes.string,
        category: PropTypes.string,
        amount: PropTypes.number.isRequired
    }).isRequired
};  