import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import AccountForm from './accountForm'
import { useState, useContext } from 'react'
import { AccountContext } from "../context/accountContext"

export default function Account(props) {
    const { deleteAccount, setMessage } = useContext(AccountContext)
    const [isOpen, setIsOpen] = useState(false)
    async function deleteOneAccount() {
        if (confirm("Are you sure you want to continue deleting ?")) {
            await deleteAccount(props.account._id)
            setMessage("")
        } else {
            return false
        }
    }
    return (
        <div className="account">
            <div className='space'></div>
            <div className="account-header">
                <h2>{props.account.nameAccount}</h2>
                <p>Create at : {props.account.createDate}</p>
                <p>Modify at : {props.account.modifyDate}</p>
            </div>
            <div className="btn-modify-delete-open">
                <NavLink onClick={() => window.scrollTo(0, 0)} to={'/accounts/' + props.account._id} className="button open"><i className="fa-regular fa-folder-open"></i> Open</NavLink>
                <button onClick={() => setIsOpen(true)} className="button modify"><i className="fa-solid fa-pen-to-square"></i> Modify</button>
                <button onClick={() => deleteOneAccount()} className="button delete"><i className="fa-solid fa-trash"></i> Delete</button>
            </div>
            <AccountForm key={props.account._id} id={props.account._id} isOpen={isOpen} setIsOpen={setIsOpen} account={props.account} />
        </div>
    )
}

Account.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    setIsOpen: PropTypes.func.isRequired,
    account: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        nameAccount: PropTypes.string.isRequired,
        description: PropTypes.string,
        createDate: PropTypes.string,
        modifyDate : PropTypes.string
    }).isRequired
};       