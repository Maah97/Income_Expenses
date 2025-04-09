import { useContext } from "react"
import { ThemeContext } from "../context/themeContext"
import { useTranslation } from "react-i18next"

export default function Footer() {
    const { t } = useTranslation()
    const { theme } = useContext(ThemeContext)
    const date = new Date();
    return(
        <footer className={theme === 'light' ? "" : "dark"}>
            <div className="container-footer">
                <div className="address">
                        <p>{t("footer.p")}</p>
                        <ul>
                            <li>IncomeExpense LLP,</li>
                            <li>{t("footer.ulLi1")}</li>
                            <li>{t("footer.ulLi2")}</li>
                            <li>Contact : +237 656 368 060</li>
                        </ul>
                </div>
                <div className="about">
                        <p>{t("footer.about.p1")}</p>
                        <p>{t("footer.about.p2")}</p>
                </div>
                <div className="follow-us">
                    <p>{t("footer.followUs")}</p>
                    <div className="links">
                        <a href="mailto:mahmoudouaboul@gmail.com">
                            <i className="fa-solid fa-envelope"></i>
                        </a>
                        <a href="https://linkedin.com/in/mahmoudou-abdoul-nganiyyou-2b805a180" rel='noreferrer' target='_blank'>
                            <i id='linkedin' className="fa-brands fa-linkedin"></i>
                        </a>
                        <a href="https://github.com/Maah97" rel='noreferrer' target='_blank'>
                            <i id='github' className="fa-brands fa-github"></i>
                        </a>
                        <a href="https://x.com/mahmoudouabdoul" rel='noreferrer' target='_blank'>
                            <i id='twitter' className="fa-brands fa-twitter"></i>
                        </a>
                    </div>
                </div>
            </div>
            <p className="droit-reserve">
                <i className="fa-regular fa-copyright"></i>{" " + date.getFullYear() + " IncomesExpenses, " + t("footer.allRights")}
            </p>
        </footer>
    )
}