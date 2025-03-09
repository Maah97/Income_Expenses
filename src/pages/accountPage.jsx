import { useParams } from "react-router-dom"
import { useEffect, useRef, useMemo, useContext } from "react"
import { useState } from "react"
import { NavLink } from "react-router-dom"
import IncomeForm from "../components/incomeForm"
import ExpenseForm from "../components/expenseForm"
import CardIncomeExpense from "../components/cardIncomeExpense"
import GraphIncomesExpenses from "../components/graphIncomesExpenses"
import { AccountContext } from "../context/accountContext"

export default function AccountPage() {
    const { accounts } = useContext(AccountContext)
    const { id } = useParams()
    const account = accounts.find(item => item._id == id)
    const [modalIncome, setModalIncome] = useState(false)
    const [modalExpense, setModalExpense] = useState(false)
    const [incomesAmount, setIncomesAmount] = useState(0)
    const [expensesAmount, setExpensesAmount] = useState(0)
    const [balance, setBalance] = useState(0)
    const dataIncomes = useMemo(() => {
        let data = []
        if (account.incomeExpense.length === 0) {
            return data
        } else {
            for (let i = 0; i < account.incomeExpense.length; i++) {
                if (account.incomeExpense[i].type === "income") {
                    data.push({category: account.incomeExpense[i].category, amount: account.incomeExpense[i].amount})
                } 
                return data
            }
        }
    }, [account])
    const dataExpenses = useMemo(() => {
        let data = []
        for (let i = 0; i < account.incomeExpense.length; i++) {
            if (account.incomeExpense[i].type === "expense") {
                data.push({category: account.incomeExpense[i].category, amount: account.incomeExpense[i].amount})
            } 
        }
        return data
    }, [account.incomeExpense])
    useEffect(() => {
        let incomeCountAmount = 0
        let expenseCountAmount = 0
        if (account.incomeExpense.length === 0) {
            incomeCountAmount = 0
            expenseCountAmount = 0
        } else {
            for (let i = 0; i < account.incomeExpense.length; i++) {
                if (account.incomeExpense[i].type === "income") {
                    incomeCountAmount = incomeCountAmount + account.incomeExpense[i].amount
                    
                } else {
                    expenseCountAmount = expenseCountAmount + account.incomeExpense[i].amount
                }
            }
        }
        setIncomesAmount(incomeCountAmount)
        setExpensesAmount(expenseCountAmount)
        setBalance(incomeCountAmount - expenseCountAmount)
    }, [account])
    useEffect(() => {
        const titles = document.querySelectorAll('.title')
        const title = document.getElementById(`${account._id}`)
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
    const btnAddIncone = useRef();
    function AddClassActive() {
        const btns = btnAddIncone.current;
        btns.classList.toggle('active');
        document.addEventListener('click', (e) => {
            let isClickedInside = btns.contains(e.target);
            const icone = document.querySelector(".fa-circle-plus").contains(e.target)
            if (!isClickedInside && !icone) {
                btns.classList.remove('active');
            }
        })
    }
    return (
        <section className="account-page">
            <div className="list-of-accounts">
                <h3>List of accounts</h3>
                {
                    accounts.map((account) => {
                       return <NavLink onClick={() => window.scrollTo(0, 0)} to={'/accounts/' + account._id} id={account._id} className="title" key={account._id}>{account.nameAccount}</NavLink>
                    })
                }
            </div>
            <div className="container-account-income-expense">
                <h3>{account.nameAccount}</h3>
                <p>{account.description}</p>
                <div className="btn-income-expenses">
                    <button onClick={() => setModalIncome(true)} className="income">Income</button>
                    <button onClick={() => setModalExpense(true)} className="expenses">Expense</button>
                </div>
                <div className="incomes-expenses-balance">
                    <div className="incomes-total">
                        <p>Total Incomes</p>
                        <p>{incomesAmount}</p>
                    </div>
                    <div className="expenses-total">
                        <p>Total Expenses</p>
                        <p>{expensesAmount}</p>
                    </div>
                    <div className="balance-total">
                        <p style={balance > 0 ? {color: "rgb(0, 82, 0)"} : balance < 0 ? {color: "rgb(173, 0, 0)"} : {color: "rgb(0, 0, 0)"}}>Balance</p>
                        <p style={balance > 0 ? {color: "rgb(0, 82, 0)"} : balance < 0 ? {color: "rgb(173, 0, 0)"} : {color: "rgb(0, 0, 0)"}}>{balance}</p>
                    </div>
                </div>
                <div className="container-income-expense">
                    {
                        account.incomeExpense.length === 0 ? null : account.incomeExpense.map((incExp, index) => {
                            return <CardIncomeExpense key={`${incExp.amount}-${index}`} iE={incExp} />
                        }) 
                    }
                </div>
                <div className="add-income-expense-icone">
                    <i onClick={() => AddClassActive()} className="fa-solid fa-circle-plus"></i>
                    <div ref={btnAddIncone} id="add-icone-btn" className="btn-income-expenses">
                        <button onClick={() => setModalIncome(true)} className="income">Income</button>
                        <button onClick={() => setModalExpense(true)} className="expenses">Expense</button>
                    </div>
                </div>
                {
                        account.incomeExpense.length > 0 ? 
                        <GraphIncomesExpenses type="expenses" data={dataExpenses} /> 
                        : null
                }
                {
                        account.incomeExpense.length > 0 ? 
                        <GraphIncomesExpenses type="incomes" data={dataIncomes} /> 
                        : null
                }
            </div>
            <IncomeForm isOpen={modalIncome} setIsOpen={setModalIncome} />
            <ExpenseForm isOpen={modalExpense} setIsOpen={setModalExpense} />
        </section>
    )
}