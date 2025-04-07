import PropTypes from 'prop-types'
import {  useState } from "react"
import { ThemeContext } from "./themeContext"

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(() => {
        const savedTheme = localStorage.getItem("theme");
        return savedTheme ? savedTheme : 'light';
    });
    const toggleTheme = async () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    }
    localStorage.setItem("theme", theme);
    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

ThemeProvider.propTypes = {
    children: PropTypes.node.isRequired,
}