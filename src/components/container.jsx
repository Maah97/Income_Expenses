import Modal from 'react-modal'
import imgContainerAccount from '../assets/imgIncomeExpenses.webp'
import { useState, useContext } from 'react'
import Account from './account'
Modal.setAppElement('#root')
import { AccountContext } from "../context/accountContext"
import AccountForm from './accountForm'

export default function Container() {
    const { accounts } = useContext(AccountContext)
    const [isOpen, setIsOpen] = useState(false)
    return (
        <section className="container">
            <div className="container-btn">
                <button onClick={() => setIsOpen(true)} className="btn-add-account">+ Create account</button>
            </div>
            <div className="box-container-account">
                <div className="container-account">
                    {
                        accounts.length > 0 ? accounts.map(account => {
                            return <Account key={account._id} account={account} setIsOpen={setIsOpen} isOpen={isOpen} />
                        }) : <div className='img-no-account'><img src={imgContainerAccount} alt="" />
                        <p className='no-account'>No account available</p></div>
                    }
                </div>
            </div>
            <AccountForm isOpen={isOpen} setIsOpen={setIsOpen} />
        </section>
    )
}