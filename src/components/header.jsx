import logoWallet from '../assets/wallet_logo.webp'
import imgLangEn from '../assets/en.webp'
import imgLangFr from '../assets/fr.webp'
import { useState } from 'react'
import { HashLink } from 'react-router-hash-link'
import { NavLink } from 'react-router-dom'


export default function Header() {
    const [selectLangage, setSelectLanage] = useState('en')
    const [theme, setTheme] = useState(true)
    function changeLangage() {
        if (selectLangage === 'en') {
            setSelectLanage('fr')
        } else {
            setSelectLanage('en')
        }
    }
    return(
        <header>
            <div className='title-and-logo'>
                <img className='logo' src={logoWallet} alt="Income-Expenses logo" />
                <h1><span>Income</span>Expenses</h1>
            </div>
            <nav>
                <NavLink to="/" className='navigation' href="#">Home</NavLink>
                <div className='navigation'>
                    <img className='img-lang' src={selectLangage === 'en' ? imgLangEn : imgLangFr} alt="English langage icone" />
                    <select onChange={changeLangage} className='select-langage' name="langage" id="selectLangage">
                        <option value="en">EN</option>
                        <option value="fr">FR</option>
                    </select>
                </div>
                <span onClick={() => {setTheme(!theme)}} className='navigation'>Theme <i className={`fa-solid fa-${theme === true ? 'sun' : 'moon'}`}></i></span>
                <HashLink to="/#contact" className='navigation' href='#'>Contact</HashLink>
                <a className='navigation' href='#'><i className="fa-solid fa-user"></i></a>
            </nav>
        </header>
    )
}