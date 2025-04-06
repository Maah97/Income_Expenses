import logoWallet from '../assets/wallet_logo.webp'
import imgLangEn from '../assets/en.webp'
import imgLangFr from '../assets/fr.webp'
import { useState, useContext, useEffect } from 'react'
import { HashLink } from 'react-router-hash-link'
import { useNavigate, NavLink } from 'react-router-dom'
import { AuthContext } from "../context/authContext"
import ProfilPictureUpdateForm from "../components/pictureProfilUpdateModal"
import PopupConfirmation from "./popupConfirmation"
import { ThemeContext } from "../context/themeContext"

export default function Header() {
    const { theme, toggleTheme } = useContext(ThemeContext)
    const { user, logout, getColorFromLetter, isPopupAuth, msgPopupAuth, setIsPopupAuth, setMsgPopupAuth } = useContext(AuthContext);
    const navigate = useNavigate()
    const [selectLangage, setSelectLanage] = useState('en')
    const [modalProfilPicture, setModalProfilPicture] = useState(false)
    function changeLangage() {
        if (selectLangage === 'en') {
            setSelectLanage('fr')
        } else {
            setSelectLanage('en')
        }
    }
    function AddClassActive() {
        const userS = document.querySelector(".log")
        userS.classList.toggle('open')
    }
    function AddAccount() {
        navigate("/signUp")
        const userS = document.querySelector(".log")
        userS.classList.remove('open')
    }
    function Logout() {
        logout()
        const userS = document.querySelector(".log")
        userS.classList.remove('open')
        window.location.reload()
        setIsPopupAuth(true)
        setMsgPopupAuth("You are successfully logged out")
        setTimeout(() => {
            setIsPopupAuth(false)
        }, "3000")
    }
    useEffect(() => {
        const userS = document.querySelector(".log")
        document.addEventListener('click', (e) => {
            let isClickedInside = userS.contains(e.target)
            const icone = document.querySelector("#user").contains(e.target)
            if ((!isClickedInside && !icone)) {
                userS.classList.remove('open')
            }
            document.querySelector(".manage-your-account").addEventListener("click", () => {
                userS.classList.remove('open')
            })
        })
        if (user) {
            document.querySelector(".icone-close").addEventListener("click", () => {
                userS.classList.remove('open')
            })
        } else {
            document.querySelector(".button").addEventListener("click", () => {
                userS.classList.remove('open')
            })
        }
    }, [user])
    function AddClassActiveNav () {
        const nav = document.querySelector('nav')
        nav.classList.toggle('active');
        document.addEventListener('click', (e) => {
            let isClickedInsideMenuHamburger = document.querySelector('.menu-hamburger').contains(e.target);
            let isClickedInsideMenu = nav.contains(e.target)
            if (!isClickedInsideMenuHamburger && !isClickedInsideMenu) {
                nav.classList.remove('active');
            }
        });
    }
    return(
        <header className={theme === 'light' ? '' : 'dark'}>
            <div className='container'>
                <div className='title-and-logo'>
                    <img className='logo' src={logoWallet} alt="Income-Expenses logo" />
                    <h1><span>Incomes</span>Expenses</h1>
                </div>
                <nav>
                    <NavLink to="/" className='navigation'>Home</NavLink>
                    <div className='navigation'>
                        <img className='img-lang' src={selectLangage === 'en' ? imgLangEn : imgLangFr} alt="English langage icone" />
                        <select onChange={changeLangage} className='select-langage' name="langage" id="selectLangage">
                            <option value="en">EN</option>
                            <option value="fr">FR</option>
                        </select>
                    </div>
                    <span onClick={() => {toggleTheme()}} className='navigation'>Theme <i className={`fa-solid fa-${theme === 'light' ? 'sun' : 'moon'}`}></i></span>
                    <HashLink to="/#contact" className='navigation' href='#'>Contact</HashLink>
                    <span onClick={() => AddClassActive()} id='user' className={user ? 'navigation active-account' : 'navigation'}>
                        { user 
                            ?
                            (   
                                user.pictureProfilUrl 
                                ? 
                                <img className='img-profil-picture' src={user.pictureProfilUrl} alt="profil-picture" /> 
                                : 
                                <div style={{backgroundColor: `${getColorFromLetter(user.userName[0])}`}} className='picture-profil'>
                                    <p>{user.userName[0].toUpperCase()}</p>
                                </div>  
                            )
                            : 
                            <i className="fa-solid fa-user"></i>
                        }
                    </span>
                </nav>
                <div onClick={() => AddClassActiveNav()} className='menu-hamburger'>
                    <i className="fa-solid fa-bars"></i>
                </div>
            </div>
            <div className='log'>
                {
                    user
                    ?
                    <div className='settings-user'>
                        <div className='email-and-icone-close'>
                            <p className='email'>{user.email}</p>
                            <div className='icone-close'>
                                <i className="fa-solid fa-xmark"></i>
                            </div>
                        </div>
                        <div onClick={() => setModalProfilPicture(true)} className='picture-profil'>
                            {
                                user.pictureProfilUrl
                                ?
                                <img className='img-profil-picture' src={user.pictureProfilUrl} alt="profil-picture" />
                                :
                                <>
                                    <p style={{backgroundColor: `${getColorFromLetter(user.userName[0])}`}}>{user.userName[0].toUpperCase()}</p>
                                    <div className='icone-modification'>
                                        <i className="fa-solid fa-pencil"></i>
                                    </div>
                                </>
                            }
                        </div>
                        <p>Welcome {user.userName} !</p>
                        <NavLink  to="/personal-info" className='manage-your-account'>
                            <p>Manage your account</p>
                        </NavLink>
                        <div className='add-account-and-logout'>
                            <div onClick={() => AddAccount()} className="add-account">
                                <i className="fa-solid fa-plus"></i>
                                <p>Add an account</p>
                            </div>
                            <div onClick={() => Logout()} className='logout'>
                                <i className="fa-solid fa-right-from-bracket"></i>
                                <p>Logout</p>
                            </div>
                        </div>
                        <div className='account-verification'>{user.verified ? <p className='txt'>Your account is verified</p> : "Account not verified"}</div>
                        <ProfilPictureUpdateForm name={user.userName} isOpen={modalProfilPicture} setIsOpen={setModalProfilPicture} />
                    </div>
                    :
                    <NavLink to="/login" className="button">Log In</NavLink>
                }
            </div>
            <PopupConfirmation message={msgPopupAuth} isPopup={isPopupAuth}  />
        </header>
    )
}