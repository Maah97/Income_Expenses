import { useContext, useEffect, useRef } from "react"
import { NavLink } from "react-router-dom"
import Caroussel from "./caroussel"
import { ThemeContext } from "../context/themeContext"

export default function Presentation() {
    const { theme } = useContext(ThemeContext)
    const slogan = useRef(null)
    useEffect(() => {
        let slogans = ["Track Earnings, Control Spending, with IncomesExpenses", "Master Your Money Journey with IncomesExpenses", "Track, Plan, and Prosper with IncomesExpenses", "Made Your Financial Roadmap Easy with IncomesExpenses", "Made Your Monthly Budget Simple with IncomesExpenses"]
        const txtSlogan = slogan.current
        let i = 1
        setInterval(() => {
            txtSlogan.textContent = slogans[i]
            i++
            if (i === slogans.length) {
                i = 0
            }
        }, 2000)
    }, [])
    return (
        <section className={theme === 'light' ? "presentation" : "presentation dark"}>
            <div id="home" className="home">
                <p>Record <span>income</span> Money </p>
                <p>And <span>expense</span> Money </p>
                <p ref={slogan} className="slogan">Track Earnings, Control Spending, with IncomesExpenses</p>
                <NavLink to="/signUp" className="btn-get-started">Get Started</NavLink>
            </div>
            <Caroussel />
            <div className="why-income-expense">
                <h3>Why <span>Incomes</span><span>Expenses</span> ?</h3>
                <div className="container-answers">
                    <div className="answer">
                        <i className="fa-solid fa-square-poll-vertical"></i>
                        <p>Simplified</p>
                        <p>Simply add your income and expenses, track your budget, and get clear financial insights to manage your money wisely !</p>
                    </div>
                    <div className="answer">
                        <i className="fa-solid fa-screwdriver-wrench"></i>
                        <p>Smart Builder</p>
                        <p>Monitor and optimize a smart building’s financial efficiency by tracking expenses, managing budgets, and analyzing cost trends in real time.</p>
                    </div>
                    <div className="answer">
                        <i className="fa-solid fa-chart-column"></i>
                        <p>Analyze the Results</p>
                        <p>Visualize your financial trends with an interactive income vs. expenses graph, making it easy to analyze results, identify patterns, and optimize your budget.</p>
                    </div>
                    <div className="answer">
                        <i className="fa-solid fa-bars"></i>
                        <p>Customization</p>
                        <p>Personalize your experience with customizable settings, including dark and light mode, for a seamless and comfortable financial tracking experience.</p>
                    </div>
                    <div className="answer">
                        <i className="fa-solid fa-language"></i>
                        <p>Two Language Support</p>
                        <p>Effortlessly manage your finances with multilingual support, offering both French and English the world&apos;s most widely spoken international languages.</p>
                    </div>
                    <div className="answer">
                        <i className="fa-solid fa-headset"></i>
                        <p>Customer Support</p>
                        <p>Get seamless assistance through our dedicated customer support, featuring a contact form for quick and efficient responses to your financial tracking inquiries.</p>
                    </div>
                    <div className="answer">
                        <i className="fa-solid fa-user-lock"></i>
                        <p>Security and Privacy</p>
                        <p>Ensure your financial data stays secure with login/logout functionality, email verification, and password protection for enhanced privacy and peace of mind</p>
                    </div>
                </div>
            </div>
        </section>
    )
}