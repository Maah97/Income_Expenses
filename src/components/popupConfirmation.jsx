import PropTypes from 'prop-types'
import { ThemeContext } from "../context/themeContext"
import { useContext } from 'react'

export default function PopupConfirmation(props) {
    const { theme } = useContext(ThemeContext)
    return (
        <>
            <div style={props.isPopupIncomeExpense === true ? {display: "block"} : {display: "none"}} className={theme === 'light' ? "popup-confirmation income-expense" : "popup-confirmation income-expense dark"}>
                <p>{props.message}</p>
            </div>
            <div style={props.isPopup === true ? {display: "block"} : {display: "none"}} className={theme === 'light' ? "popup-confirmation" : "popup-confirmation dark"}>
                <p>{props.message}</p>
            </div>
        </>
    )
}

PopupConfirmation.propTypes = {
    message: PropTypes.string.isRequired,
    isPopupIncomeExpense: PropTypes.bool,
    isPopup: PropTypes.bool

}