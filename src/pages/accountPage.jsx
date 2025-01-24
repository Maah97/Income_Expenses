import { useParams } from "react-router-dom"
import { useState } from "react"
import { NavLink } from "react-router-dom"
import accounts from '../account.json'
import { useEffect } from "react"
import IncomeForm from "../components/incomeForm"
import ExpenseForm from "../components/expenseForm"

export default function AccountPage() {
    const { id } = useParams()
    const [modalIncome, setModalIncome] = useState(false)
    const [modalExpense, setModalExpense] = useState(false)
    const account = accounts.find(item => item.id == id)
    useEffect(() => {
        const titles = document.querySelectorAll('.title')
        const title = document.getElementById(`${account.id}`)
        for (let i = 0; i < titles.length; i++) {
            titles[i].style.color = 'black'
        }
        title.style.color = 'red'
    })
    return (
        <section className="account-page">
            <div className="list-of-accounts">
                <h3>List of accounts</h3>
                {
                    accounts.map((account) => {
                       return <NavLink onClick={() => window.scrollTo(0, 0)} to={'/accounts/' + account.id} id={account.id} className="title" key={account.id}>{account.name}</NavLink>
                    })
                }
            </div>
            <div className="container-account-income-expense">
                <h3>{account.name}</h3>
                <p>{account.description}</p>
                <div className="btn-income-expenses">
                    <button onClick={() => setModalIncome(true)} className="income">Income</button>
                    <button onClick={() => setModalExpense(true)} className="expenses">Expense</button>
                </div>
                <div className="container-revenus-depenses">
                </div>
            </div>
            <IncomeForm isOpen={modalIncome} setIsOpen={setModalIncome} />
            <ExpenseForm isOpen={modalExpense} setIsOpen={setModalExpense} />
        </section>
    )
}