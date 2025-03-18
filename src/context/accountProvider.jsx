import {  useState } from "react"
import axios from "axios"
import PropTypes from 'prop-types'
import { AccountContext } from "./accountContext"
import { useEffect } from "react"

export const AccountProvider = ({ children }) => {
    const [accounts, setAccounts] = useState([])
    const [message, setMessage] = useState("")
    const [reload, setReload] = useState(false)
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
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL_ACCOUNT}/${id}`, 
                { name: name, description: description, date: date },
                { withCredentials: true })
            setMessage(response.data.message)
            fetchAccounts()
            setReload(!reload)
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
            setMessage(response.data.message)
            return true
        } catch (error) {
            alert(`Error in deleting account : ${error.response.data.message}`)
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
            await axios.post(`${import.meta.env.VITE_BASE_URL_ACCOUNT}/${id}/incomeExpense`,
                incomeExpense,
                { withCredentials: true }
            )
            fetchAccounts()
            setReload(!reload)
        } catch (error) {
            console.log(error);
            
        }
    }
    const modifyIncomeExpense = async () => {
        
    }
    const deleteIncomeExpense = async (idAccount, idIncomeExpense) => {
        try {
            const response = axios.delete(`${import.meta.env.VITE_BASE_URL_ACCOUNT}/${idAccount}/incomeExpense/${idIncomeExpense}`,
                { withCredentials: true })
            fetchAccounts()
            setMessage(response.data.message)
            return true
        } catch (error) {
            alert(`Error in deleting income / expense : ${error.response.data.message}`)
            return false
        }
    }
    return (
        <AccountContext.Provider value={{ createAccount, modifyAccount, deleteAccount, message, setMessage, accounts, createIncomeExpense, deleteIncomeExpense, setReload, reload }}>
        {children}
        </AccountContext.Provider>
    )
}

AccountProvider.propTypes = {
    children: PropTypes.node.isRequired,
}