import { useState, useContext } from 'react'
import PropTypes from 'prop-types'
import IncomeForm from "../components/incomeForm"
import ExpenseForm from "../components/expenseForm"
import { AccountContext } from "../context/accountContext"

export default function CardIncomeExpense({idAccount, iE}) {
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
        if (confirm("Are you sure you want to continue deleting ?")) {
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
                <div className='modify-delete'>
                    <button onClick={openModal} className='modify'><i className="fa-solid fa-pen-to-square"></i> Modify</button>
                    <button onClick={() => deleteOneIncomeExpense()} className="delete"><i className="fa-solid fa-trash"></i> Delete</button>
                </div>
            </article>
            <IncomeForm isOpen={modalIncome} setIsOpen={setModalIncome} iE={iE} />
            <ExpenseForm isOpen={modalExpense} setIsOpen={setModalExpense} iE={iE}/>
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