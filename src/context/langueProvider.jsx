import PropTypes from 'prop-types'
import {  useState } from "react"
import { useTranslation } from "react-i18next"
import { LangueContext } from "./langueContext"

export const LangueProvider = ({ children }) => {
    const { i18n } = useTranslation();
    const [langue, setLangue] = useState(() => {
        const savedLangue = localStorage.getItem("langue");
        return savedLangue ? savedLangue : 'en';
    });
    const toggleLangue = (lng) => {
        setLangue(lng);
        i18n.changeLanguage(lng);
    }
    localStorage.setItem("langue", langue);
    return (
        <LangueContext.Provider value={{ langue, toggleLangue }}>
            {children}
        </LangueContext.Provider>
    )
}

LangueProvider.propTypes = {
    children: PropTypes.node.isRequired,
}