import { useContext, useEffect, useRef } from "react"
import { NavLink } from "react-router-dom"
import Caroussel from "./caroussel"
import { ThemeContext } from "../context/themeContext"
import { LangueContext } from "../context/langueContext"
import { useTranslation } from "react-i18next"

export default function Presentation() {
    const { t } = useTranslation();
    const { langue } = useContext(LangueContext)
    const { theme } = useContext(ThemeContext)
    const slogan1 = useRef(null)
    const slogan2 = useRef(null)
    useEffect(() => {
        const slogans1 = [ "Suivre les revenus et contrôler les dépenses grâce à IncomesExpenses", "Maîtrisez votre parcours financier avec IncomesExpenses", "Suivez, planifiez et prospérez avec IncomesExpenses", "Simplifiez votre feuille de route financière avec IncomesExpenses", "Simplifiez votre budget mensuel avec IncomesExpenses"]
        const slogans2 = ["Track Earnings, Control Spending, with IncomesExpenses", "Master Your Money Journey with IncomesExpenses", "Track, Plan, and Prosper with IncomesExpenses", "Made Your Financial Roadmap Easy with IncomesExpenses", "Made Your Monthly Budget Simple with IncomesExpenses"]
        const txtSlogan1 = slogan1.current
        const txtSlogan2 = slogan2.current
        let i1 = 1
        let i2 = 1
        setInterval(() => {
            txtSlogan1.textContent = slogans1[i1]
            i1++
            if (i1 === slogans1.length) {
                i1 = 0
            }
        }, 2000)
        setInterval(() => {
            txtSlogan2.textContent = slogans2[i2]
            i2++
            if (i2 === slogans2.length) {
                i2 = 0
            }
        }, 2000)
        
    }, [])
    return (
        <section className={theme === 'light' ? "presentation" : "presentation dark"}>
            <div id="home" className="home">
                <p>{t("presentation.p1.record")} <span>{t("presentation.p1.income")}</span> {t("presentation.p1.money")} </p>
                <p>{t("presentation.p2.and")} <span>{t("presentation.p2.expense")} </span> {t("presentation.p2.money")}  </p>
                <p ref={slogan1} style={langue === 'fr' ? {display: "block"} : {display: "none"}} className="slogan"></p>
                <p ref={slogan2} style={langue === 'en' ? {display: "block"} : {display: "none"}} className="slogan"></p>
                <NavLink to="/signUp" className="btn-get-started">{t("presentation.btnGetStarted")} </NavLink>
            </div>
            <Caroussel />
            <div className="why-income-expense">
                <h3>{t("presentation.why")}  <span>Incomes</span><span>Expenses</span> ?</h3>
                <div className="container-answers">
                    <div className="answer">
                        <i className="fa-solid fa-square-poll-vertical"></i>
                        <p>{t("presentation.answers.answer1.p1")} </p>
                        <p>{t("presentation.answers.answer1.p2")}</p>
                    </div>
                    <div className="answer">
                        <i className="fa-solid fa-screwdriver-wrench"></i>
                        <p>{t("presentation.answers.answer2.p1")}</p>
                        <p>{t("presentation.answers.answer2.p2")}</p>
                    </div>
                    <div className="answer">
                        <i className="fa-solid fa-chart-column"></i>
                        <p>{t("presentation.answers.answer3.p1")}</p>
                        <p>{t("presentation.answers.answer3.p2")}</p>
                    </div>
                    <div className="answer">
                        <i className="fa-solid fa-bars"></i>
                        <p>{t("presentation.answers.answer4.p1")}</p>
                        <p>{t("presentation.answers.answer4.p2")}</p>
                    </div>
                    <div className="answer">
                        <i className="fa-solid fa-language"></i>
                        <p>{t("presentation.answers.answer5.p1")}</p>
                        <p>{t("presentation.answers.answer5.p2")}</p>
                    </div>
                    <div className="answer">
                        <i className="fa-solid fa-headset"></i>
                        <p>{t("presentation.answers.answer6.p1")}</p>
                        <p>{t("presentation.answers.answer6.p2")}</p>
                    </div>
                    <div className="answer">
                        <i className="fa-solid fa-user-lock"></i>
                        <p>{t("presentation.answers.answer7.p1")}</p>
                        <p>{t("presentation.answers.answer7.p2")}</p>
                    </div>
                </div>
            </div>
        </section>
    )
}