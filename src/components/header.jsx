import logoWallet from '../assets/wallet_logo.webp'
import imgLangEn from '../assets/en.webp'
import imgLangFr from '../assets/fr.webp'
import { useState } from 'react'


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
                <a className='navigation' href="#">Home</a>
                <div className='navigation'>
                    <img className='img-lang' src={selectLangage === 'en' ? imgLangEn : imgLangFr} alt="English langage icone" />
                    <select onChange={changeLangage} className='select-langage' name="langage" id="selectLangage">
                        <option value="en">EN</option>
                        <option value="fr">FR</option>
                    </select>
                </div>
                <span onClick={() => {setTheme(!theme)}} className='navigation'>Theme <i className={`fa-solid fa-${theme === true ? 'sun' : 'moon'}`}></i></span>
                <a className='navigation' href='#'>Contact</a>
                <a className='navigation' href='#'><i className="fa-solid fa-user"></i></a>
            </nav>
        </header>
    )
}