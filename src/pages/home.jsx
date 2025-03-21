import Presentation from "../components/presentation"
import Container from "../components/container"
import Contact from "../components/contact"
import ProtectedCompenents from "../components/protectedCompenents"
import PopupConfirmation from "../components/popupConfirmation"
import { AccountContext } from "../context/accountContext"
import { useContext } from 'react'

export default function Home() {
    const { isPopupAccount, msgPopup } = useContext(AccountContext)
    return (
        <>
            <Presentation />
            <ProtectedCompenents>
                <Container />
            </ProtectedCompenents>
            <Contact />
            <PopupConfirmation message={msgPopup} isPopupIncomeExpense={isPopupAccount}  />
        </>
    )
}