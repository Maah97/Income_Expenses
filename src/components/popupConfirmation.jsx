import PropTypes from 'prop-types'

export default function PopupConfirmation(props) {
    return (
        <>
            <div style={props.isPopupIncomeExpense === true ? {display: "block"} : {display: "none"}} className="popup-confirmation income-expense">
                <p>{props.message}</p>
            </div>
            <div style={props.isPopup === true ? {display: "block"} : {display: "none"}} className="popup-confirmation account">
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