import Modal from 'react-modal'
import imgContainerAccount from '../assets/imgIncomeExpenses.webp'
import { useState, useContext } from 'react'
import Account from './account'
Modal.setAppElement('#root')
import { AccountContext } from "../context/accountContext"
import AccountForm from './accountForm'
import { ThemeContext } from "../context/themeContext"
import { useTranslation } from "react-i18next"

export default function Container() {
    const { t } = useTranslation()
    const { theme } = useContext(ThemeContext)
    const { accounts } = useContext(AccountContext)
    const [isOpen, setIsOpen] = useState(false)
    return (
        <section className={theme === 'light' ? "container" : "container dark"}>
            <div className="container-btn">
                <button onClick={() => setIsOpen(true)} className="btn-add-account">+ {t("container.buttonCreateAccount")}</button>
            </div>
            <div className="box-container-account">
                <div className="container-account">
                    {
                        Array.isArray(accounts) && accounts.length > 0 ? accounts.map(account => {
                            return <Account key={account._id} account={account} setIsOpen={setIsOpen} isOpen={isOpen} />
                        }) : <div className='img-no-account'><img src={imgContainerAccount} alt="" />
                        <p className='no-account'>{t("container.noAccountP")}</p></div>
                    }
                </div>
            </div>
            <AccountForm isOpen={isOpen} setIsOpen={setIsOpen} />
        </section>
    )
}