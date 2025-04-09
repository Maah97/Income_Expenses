import { useContext, useState } from 'react'
import imgPersonalInformation from '../assets/imgPersonnalInformation.webp'
import { AuthContext } from "../context/authContext"
import UserNameUpdateForm from "../components/userNameUpdateModal"
import BirthdayUpdateForm from "../components/birthdayUpdateModal"
import OccupationUpdateForm from "../components/occupationUpdateModal"
import GenderUpdateForm from "../components/genderUpdateModal"
import EmailUpdateForm from "../components/emailUpdateModal"
import PhoneUpdateForm from "../components/phoneUpdateModal"
import PasswordUpdateForm from "../components/passwordUpdateModal"
import ProfilPictureUpdateForm from "../components/pictureProfilUpdateModal"
import { ThemeContext } from "../context/themeContext"
import { LangueContext } from "../context/langueContext"
import { useTranslation } from "react-i18next"

export default function UserInformation() {
    const { langue } = useContext(LangueContext)
    const { t } = useTranslation()
    const { theme } = useContext(ThemeContext)
    const { user, getColorFromLetter } = useContext(AuthContext)
    const [modalUserName, setModalUserName] = useState(false)
    const [modalBirthday, setModalBirthday] = useState(false)
    const [modalOccupation, setModalOccupation] = useState(false)
    const [modalGender, setModalGender] = useState(false)
    const [modalEmail, setModalEmail] = useState(false)
    const [modalPhone, setModalPhone] = useState(false)
    const [modalPassword, setModalPassword] = useState(false)
    const [modalProfilPicture, setModalProfilPicture] = useState(false)
    return (
        <div className={theme === 'light' ? "container-user-information" : "container-user-information dark"}>
            <div className='user-information'>
                <h3>{t("userInformation.h3")}</h3>
                <div className="description">
                    <div className="txt-description">
                        <p className='title-txt-description'>{t("userInformation.p1")} <span className='title-txt-description-income'>Incomes</span>-<span className='title-txt-description-expense'>Expenses</span> {langue === 'en' ? "services" : ""}</p>
                        <p className='paragraphe-description'>{t("userInformation.p3")}</p>
                    </div>
                    <div className='img-description'>
                        <img src={imgPersonalInformation} alt="description personal information" />
                    </div>
                </div>
                <form className='form-update-user'>
                    <div className="container-infos general-information">
                        <h4>{t("userInformation.h4")}</h4>
                        <div onClick={() => setModalProfilPicture(true)} className="info picture-profil">
                            <p>{t("userInformation.p4")}</p>
                            {
                                user.pictureProfilUrl 
                                ? 
                                <img className='img-profil-picture' src={user.pictureProfilUrl} alt="profil-picture" /> 
                                :
                                <>
                                    <p style={{color: theme === 'light' ? "rgb(163, 163, 163)" : "rgb(73, 73, 73)"}}>{t("userInformation.p5")}</p>
                                    <div className='file-img-picture'>
                                        <p style={{backgroundColor: `${getColorFromLetter(user.userName[0])}`}}>{user.userName[0].toUpperCase()}</p>
                                        <div className='icone-camera'>
                                            <i className="fa-solid fa-camera"></i>
                                        </div>
                                    </div>
                                </>
                            }
                        </div>
                        <div onClick={() => setModalUserName(true)} className="info username-profil">
                            <p className='label'>{t("userInformation.labelName")}</p>
                            <p className='input'>{user.userName}</p>
                            <i className="fa-solid fa-angle-right"></i>
                        </div>
                        <div onClick={() => setModalBirthday(true)} className="info birthday-profil">
                            <p className='label'>{t("userInformation.labelBirthday")}</p>
                            <p className='input' style={user.birthDay ? {color: theme === 'light' ? "black" : "white"} : {color: "rgb(163, 163, 163)"}}>{user.birthDay ? user.birthDay : t("userInformation.birthday")}</p>
                            <i className="fa-solid fa-angle-right"></i>
                        </div>
                        <div onClick={() => setModalOccupation(true)} className="info occupation-profil">
                            <p className='label'>{t("userInformation.labelOccupation")}</p>
                            <p className='input' style={user.occupation ? {color: theme === 'light' ? "black" : "white"} : {color: theme === 'light' ? "rgb(163, 163, 163)" : "rgb(73, 73, 73)"}}>{user.occupation ? user.occupation : t("userInformation.occupation")}</p>
                            <i className="fa-solid fa-angle-right"></i>
                        </div>
                        <div onClick={() => setModalGender(true)} className='info gender-profil'>
                            <p className='label'>{t("userInformation.labelGender")}</p>
                            <p className='input'>{user.gender}</p>
                            <i className="fa-solid fa-angle-right"></i>
                        </div>
                    </div>
                    <div className="container-infos general-information">
                        <h4>{t("userInformation.contact")}</h4>
                        <div onClick={() => setModalEmail(true)} className="info email-address-profil">
                            <p className='label'>{t("userInformation.labelEmail")}</p>
                            <p className='input'>{user.email}</p>
                            <i className="fa-solid fa-angle-right"></i>
                        </div>
                        <div onClick={() => setModalPhone(true)} className="info phone-profil">
                            <p className='label'>{t("userInformation.labelPhone")}</p>
                            <p style={user.phoneNumber ? {color: theme === 'light' ? "black" : "white"} : {color: theme === 'light' ? "rgb(163, 163, 163)" :  "rgb(73, 73, 73)"}} className='input'>{user.phoneNumber ? user.phoneNumber : t("userInformation.placeHolderPhone")}</p>
                            <i className="fa-solid fa-angle-right"></i>
                        </div>
                    </div>
                    <div className="container-infos security-information">
                        <h4>{t("userInformation.password")}</h4>
                        <p>{t("userInformation.passwordP")}</p>
                        <div onClick={() => setModalPassword(true)} className="info password-profil">
                            <p id='password-profil' className='input'>........</p>
                            <i className="fa-solid fa-angle-right"></i>
                        </div>
                    </div>
                </form>
            </div>
            <UserNameUpdateForm name={user.userName} isOpen={modalUserName} setIsOpen={setModalUserName} />
            <BirthdayUpdateForm birthday={user.birthDay} isOpen={modalBirthday} setIsOpen={setModalBirthday} />
            <OccupationUpdateForm occupation={user.occupation} isOpen={modalOccupation} setIsOpen={setModalOccupation} />
            <GenderUpdateForm gender={user.gender} isOpen={modalGender} setIsOpen={setModalGender} />
            <EmailUpdateForm email={user.email} isOpen={modalEmail} setIsOpen={setModalEmail} />
            <PhoneUpdateForm phone={user.phoneNumber} isOpen={modalPhone} setIsOpen={setModalPhone} />
            <PasswordUpdateForm isOpen={modalPassword} setIsOpen={setModalPassword} />
            <ProfilPictureUpdateForm name={user.userName} isOpen={modalProfilPicture} setIsOpen={setModalProfilPicture} />
        </div>
    )
}