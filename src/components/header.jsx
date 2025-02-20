import PropTypes from 'prop-types'
import logoWallet from '../assets/wallet_logo.webp'
import imgLangEn from '../assets/en.webp'
import imgLangFr from '../assets/fr.webp'
import { useRef, useState } from 'react'
import { HashLink } from 'react-router-hash-link'
import { useNavigate, NavLink } from 'react-router-dom'


export default function Header(props) {
    const navigate = useNavigate()
    const [selectLangage, setSelectLanage] = useState('en')
    const [theme, setTheme] = useState(true)
    function changeLangage() {
        if (selectLangage === 'en') {
            setSelectLanage('fr')
        } else {
            setSelectLanage('en')
        }
    }
    const userSettings = useRef();
    function AddClassActive() {
        const userS = userSettings.current;
        userS.classList.toggle('open');
        document.addEventListener('click', (e) => {
            let isClickedInside = userS.contains(e.target);
            const icone = document.querySelector(".fa-user").contains(e.target)
            const btnLogout = document.querySelector(".add-account").contains(e.target)
            if ((!isClickedInside && !icone) || btnLogout) {
                userS.classList.remove('open');
            }
        })
    }
    return(
        <header>
            <div className='container'>
                <div className='title-and-logo'>
                    <img className='logo' src={logoWallet} alt="Income-Expenses logo" />
                    <h1><span>Incomes</span>Expenses</h1>
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
                    <span onClick={() => AddClassActive()} id='user' className='navigation' href='#'><i className="fa-solid fa-user"></i></span>
                </nav>
            </div>
            <div ref={userSettings} className='log'>
                {
                    props.isAuthenticated 
                    ?
                    <div className='settings-user'>
                        <div className='email-and-icone-close'>
                            <p className='email'>mahmoudouaboul@gmail.com</p>
                            <div onClick={() => AddClassActive()} className='icone-close'>
                                <i className="fa-solid fa-xmark"></i>
                            </div>
                        </div>
                        <div className='picture-profil'>
                            <p>M</p>
                            <div className='icone-modification'>
                                <i className="fa-solid fa-pencil"></i>
                            </div>
                        </div>
                        <p>Welcome UserName</p>
                        <div className='manage-your-account'>
                            <p>Manage your account</p>
                        </div>
                        <div className='add-account-and-logout'>
                            <div onClick={() => navigate("/signUp")} className="add-account">
                                <i className="fa-solid fa-plus"></i>
                                <p>Add an account</p>
                            </div>
                            <div className='logout'>
                                <i className="fa-solid fa-right-from-bracket"></i>
                                <p>Logout</p>
                            </div>
                        </div>
                    </div>
                    :
                    <NavLink to="/login" className="button">Log In</NavLink>
                }
            </div>
        </header>
    )
}

Header.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
}