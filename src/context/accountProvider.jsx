import {  useState } from "react"
import axios from "axios"
import PropTypes from 'prop-types'
import { AccountContext } from "./accountContext"
import { useEffect } from "react"
import { useTranslation } from "react-i18next"

export const AccountProvider = ({ children }) => {
    const { t } = useTranslation()
    const [accounts, setAccounts] = useState([])
    const [message, setMessage] = useState("")
    const [reload, setReload] = useState(false)
    const [isPopupIncomeExpense, setIsPopupIncomeExpense] = useState(false)
    const [isPopup, setIsPopup] = useState(false)
    const [msgPopup, setMsgPopup] = useState("")
    const fetchAccounts = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL_ACCOUNT}`,
                { withCredentials: true }
            )
            setAccounts(response.data)
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        fetchAccounts()
    }, [reload])
    const createAccount = async (name, description, date) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL_ACCOUNT}`, 
                { name: name, description: description, date: date },
                { withCredentials: true })
            setMessage(response.data.message)
            fetchAccounts()
            setReload(!reload)
            setIsPopup(true)
            setMsgPopup(t("accountProvider.msg1"))
            setTimeout(() => {
                setIsPopup(false)
            }, "3000")
            return true
        } catch (error) {
            document.querySelectorAll("label").forEach((label) => {
                label.style.color = "red"
            })
            document.querySelectorAll(".input-txt").forEach((input) => {
                input.style.border = "2px solid red"
                input.addEventListener("focus", () => {
                    document.querySelectorAll("label").forEach((label) => {
                        label.style.color = "black"
                    })
                    document.querySelectorAll(".input-txt").forEach((input) => {
                        input.style.border = "none"
                        input.style.boxShadow = "0px 0px 5px rgba(0, 0, 0, 0.438)"
                        input.style.borderBottom = "2px solid green"
                    })
                    setMessage("")
                })
            })
            setMessage(error.response.data.message)
            return false
        }
    }
    const modifyAccount = async (name, description, id, date) => {
        try {
            const response = await axios.put(`${import.meta.env.VITE_BASE_URL_ACCOUNT}/${id}`, 
                { name: name, description: description, date: date },
                { withCredentials: true })
            setMessage(response.data.message)
            fetchAccounts()
            setReload(!reload)
            setIsPopup(true)
            setMsgPopup(t("accountProvider.msg2"))
            setTimeout(() => {
                setIsPopup(false)
            }, "3000")
            return true
        } catch (error) {
            document.querySelectorAll("label").forEach((label) => {
                label.style.color = "red"
            })
            document.querySelectorAll(".input-txt").forEach((input) => {
                input.style.border = "2px solid red"
                input.addEventListener("focus", () => {
                    document.querySelectorAll("label").forEach((label) => {
                        label.style.color = "black"
                    })
                    document.querySelectorAll(".input-txt").forEach((input) => {
                        input.style.border = "none"
                        input.style.boxShadow = "0px 0px 5px rgba(0, 0, 0, 0.438)"
                        input.style.borderBottom = "2px solid green"
                    })
                    setMessage("")
                })
            })
            setMessage(error.response.data.message)
            return false
        }   
    }
    const deleteAccount = async (id) => {
        try {
            const response = await axios.delete(`${import.meta.env.VITE_BASE_URL_ACCOUNT}/${id}`,
                { withCredentials: true })
            fetchAccounts()
            setReload(!reload)
            setMessage(response.data.message)
            setIsPopup(true)
            setMsgPopup(t("accountProvider.msg3"))
            setTimeout(() => {
                setIsPopup(false)
            }, "3000")
            return true
        } catch (error) {
            alert(`${t("accountProvider.msg4")} : ${error.response.data.message}`)
            return false
        }
    }
    const createIncomeExpense = async (id, type, values) => {
        const incomeExpense = {
            type : type,
            amount : values.amount,
            category: values.category,
            paymentMode : values.paymentMode,
            remark : values.remark,
            date : `${values.date}`,
            hour : `${values.hour}`
        }
        try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL_ACCOUNT}/${id}/incomeExpense`,
                incomeExpense,
                { withCredentials: true }
            )
            fetchAccounts()
            setReload(!reload)
            setMessage(response.data.message)
            setIsPopupIncomeExpense(true)
            setMsgPopup(t("accountProvider.msg5"))
            setTimeout(() => {
                setIsPopupIncomeExpense(false)
            }, "3000")
            return true
        } catch (error) {
            setMessage(error.response.data.message)
            return false
        }
    }
    const modifyIncomeExpense = async (idAccount, idIncomeExpense, values, type) => {
        const incomeExpense = {
            type : type,
            amount : values.amount,
            category: values.category,
            paymentMode : values.paymentMode,
            remark : values.remark,
            date : `${values.date}`,
            hour : `${values.hour}`
        }
        try {
            const response = await axios.put(`${import.meta.env.VITE_BASE_URL_ACCOUNT}/${idAccount}/incomeExpense/${idIncomeExpense}`,
                incomeExpense,
                { withCredentials: true })
            fetchAccounts()
            setReload(!reload)
            setMessage(response.data.message)
            setIsPopupIncomeExpense(true)
            setMsgPopup(t("accountProvider.msg6"))
            setTimeout(() => {
                setIsPopupIncomeExpense(false)
            }, "3000")
            return true
        } catch (error) {
            setMessage(error.response.data.message)
            return false
        }
    }
    const deleteIncomeExpense = async (idAccount, idIncomeExpense) => {
        try {
            const response = await axios.delete(`${import.meta.env.VITE_BASE_URL_ACCOUNT}/${idAccount}/incomeExpense/${idIncomeExpense}`,
                { withCredentials: true })
            fetchAccounts()
            setReload(!reload)
            setMessage(response.data.message)
            setIsPopupIncomeExpense(true)
            setMsgPopup(t("accountProvider.msg7"))
            setTimeout(() => {
                setIsPopupIncomeExpense(false)
            }, "3000")
            return true
        } catch (error) {
            alert(`${t("accountProvider.msg8")} : ${error.response.data.message}`)
            return false
        }
    }
    const sendCommentUser = async (values) => {
        try {
            await axios.post(`${import.meta.env.VITE_BASE_URL_USER}/comment`,
                {name: values.name, message: values.comment, email: values.email})
            setIsPopup(true)
            setMsgPopup(t("accountProvider.msg9"))
            setTimeout(() => {
                setIsPopup(false)
            }, "3000")    
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <AccountContext.Provider value={{ createAccount, modifyAccount, deleteAccount, message, setMessage, accounts, createIncomeExpense, modifyIncomeExpense, deleteIncomeExpense, setReload, reload, isPopupIncomeExpense, isPopup, msgPopup, sendCommentUser }}>
        {children}
        </AccountContext.Provider>
    )
}

AccountProvider.propTypes = {
    children: PropTypes.node.isRequired,
}