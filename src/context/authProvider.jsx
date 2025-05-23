import {  useState, useEffect } from "react"
import axios from "axios"
import PropTypes from 'prop-types'
import { AuthContext } from "./authContext";

export const AuthProvider = ({ children }) => {
    const [message, setMessage] = useState("")
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [isPopupAuth, setIsPopupAuth] = useState(false)
    const [msgPopupAuth, setMsgPopupAuth] = useState("")
    const getColorFromLetter = (letter) => {
        // Convertir la lettre en minuscule et obtenir son code ASCII
        const charCode = letter.toLowerCase().charCodeAt(0);
        // Générer une couleur en fonction du code ASCII (ex: 'a' = 97, 'z' = 122)
        const hue = ((charCode - 97) / 25) * 360; // Répartir sur 360° pour la teinte
        return `hsl(${hue}, 70%, 30%)`; // Teinte variable, saturation et luminosité fixes
    }
    const fetchUserData = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL_USER}`, {
                withCredentials: true,
            })
            setUser(response.data)
        } catch {
            setUser(null)
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        fetchUserData()
    }, [])
    const login = async (email, password, langue) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL_USER}/login`, 
                { email: email, password: password, langue: langue },
                { withCredentials: true })
            setMessage(response.data.message)
            return true
        } catch (error) {
            document.querySelectorAll("label").forEach((label) => {
                label.style.color = "red"
            })
            document.querySelectorAll("input").forEach((input) => {
                input.style.border = "2px solid red"
                input.addEventListener("focus", () => {
                    document.querySelectorAll("label").forEach((label) => {
                        label.style.color = "black"
                    })
                    document.querySelectorAll("input").forEach((input) => {
                        input.style.border = "1px solid rgb(72, 126, 212)"
                    })
                    setMessage("")
                })
            })
            if (error.response.data !== undefined) {
                setMessage(error.response.data.message)
            }
           
            return false
        }
    }
    const logout = async () => {
        try {
            await axios.post(`${import.meta.env.VITE_BASE_URL_USER}/logout`, {}, 
                { withCredentials: true }
            )
            setUser(null)
        } catch (error) {
            if (error.response.data !== undefined) {
                setMessage(error.response.data.message)
            }
        }
    }

    return (
        <AuthContext.Provider value={{ user, setUser, login, message, logout, loading, getColorFromLetter, isPopupAuth, msgPopupAuth, setIsPopupAuth, setMsgPopupAuth }}>
        {children}
        </AuthContext.Provider>
    )
}
AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
}