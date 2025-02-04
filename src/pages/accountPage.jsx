import { useParams } from "react-router-dom"
import { useState } from "react"
import { NavLink } from "react-router-dom"
import accounts from '../account.json'
import { useEffect } from "react"
import IncomeForm from "../components/incomeForm"
import ExpenseForm from "../components/expenseForm"
import CardIncomeExpense from "../components/cardIncomeExpense"

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
            titles[i].style.backgroundColor = 'transparent'
            titles[i].style.borderRadius = 'none'
            titles[i].style.boxShadow = 'none'
            if (titles[i].getAttribute('id') !== title.getAttribute('id')) {
                titles[i].addEventListener('mouseover', () => {
                    titles[i].style.backgroundColor = 'rgb(206, 145, 145)'
                    titles[i].style.borderRadius = 'none'
                    titles[i].style.boxShadow = 'none'
                    titles[i].style.color = 'black'
                })
                titles[i].addEventListener('mouseleave', () => {
                    titles[i].style.backgroundColor = 'transparent'
                    titles[i].style.borderRadius = 'none'
                    titles[i].style.boxShadow = 'none'
                    titles[i].style.color = 'black'
                })
            }
        }
        title.style.color = 'rgb(183, 0, 0)'
        title.style.backgroundColor = '#edc3c3'
        title.style.borderRadius = '5px'
        title.style.boxShadow = '3px 3px 5px #ff00006c'
        title.addEventListener('mouseover', () => {
            title.style.color = 'rgb(183, 0, 0)'
            title.style.backgroundColor = '#edc3c3'
            title.style.boxShadow = '3px 3px 5px #ff00006c'
        })
        title.addEventListener('mouseleave', () => {
            title.style.color = 'rgb(183, 0, 0)'
            title.style.backgroundColor = '#edc3c3'
            title.style.boxShadow = '3px 3px 5px #ff00006c'
        })
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
                <div className="container-income-expense">
                    {
                        account.incomeExpense.map((incExp, index) => {
                            return <CardIncomeExpense key={`${incExp.amount}-${index}`} iE={incExp} />
                        }) 
                    }
                </div>
            </div>
            <IncomeForm isOpen={modalIncome} setIsOpen={setModalIncome} />
            <ExpenseForm isOpen={modalExpense} setIsOpen={setModalExpense} />
        </section>
    )
}