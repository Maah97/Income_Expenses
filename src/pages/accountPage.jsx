import { useParams } from "react-router-dom"
import { NavLink } from "react-router-dom"
import accounts from '../account.json'
import { useEffect } from "react"

export default function AccountPage() {
    const { id } = useParams()
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
                    <button className="income">Incomes</button>
                    <button className="expenses">Expenses</button>
                </div>
                <div className="container-revenus-depenses">

                </div>
            </div>
            
        </section>
    )
}