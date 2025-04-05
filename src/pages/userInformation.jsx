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

export default function UserInformation() {
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
        <div className="container-user-information">
            <div className='user-information'>
                <h3>Personal informations</h3>
                <div className="description">
                    <div className="txt-description">
                        <p className='title-txt-description'>Your profile information in <span className='title-txt-description-income'>Incomes</span>-<span className='title-txt-description-expense'>Expenses</span> services</p>
                        <p className='paragraphe-description'>Here is your personal information and options to manage it. (e.g. your contact details so you can be easily reached). You can also see a summary of your profile.</p>
                    </div>
                    <div className='img-description'>
                        <img src={imgPersonalInformation} alt="description personal information" />
                    </div>
                </div>
                <form className='form-update-user'>
                    <div className="container-infos general-information">
                        <h4>General informations</h4>
                        <div onClick={() => setModalProfilPicture(true)} className="info picture-profil">
                            <p>profile picture</p>
                            {
                                user.pictureProfilUrl 
                                ? 
                                <img className='img-profil-picture' src={user.pictureProfilUrl} alt="profil-picture" /> 
                                :
                                <>
                                    <p>Add a profile picture to personalize your account</p>
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
                            <p className='label'>Name</p>
                            <p className='input'>{user.userName}</p>
                            <i className="fa-solid fa-angle-right"></i>
                        </div>
                        <div onClick={() => setModalBirthday(true)} className="info birthday-profil">
                            <p className='label'>Birthday</p>
                            <p className='input' style={user.birthDay ? {color: "black"} : {color: "rgb(163, 163, 163)"}}>{user.birthDay ? user.birthDay : "Put your birhday"}</p>
                            <i className="fa-solid fa-angle-right"></i>
                        </div>
                        <div onClick={() => setModalOccupation(true)} className="info occupation-profil">
                            <p className='label'>Occupation</p>
                            <p className='input' style={user.occupation ? {color: "black"} : {color: "rgb(163, 163, 163)"}}>{user.occupation ? user.occupation : "Put your occupation"}</p>
                            <i className="fa-solid fa-angle-right"></i>
                        </div>
                        <div onClick={() => setModalGender(true)} className='info gender-profil'>
                            <p className='label'>Gender</p>
                            <p className='input'>{user.gender}</p>
                            <i className="fa-solid fa-angle-right"></i>
                        </div>
                    </div>
                    <div className="container-infos general-information">
                        <h4>Contact details</h4>
                        <div onClick={() => setModalEmail(true)} className="info email-address-profil">
                            <p className='label'>Email address</p>
                            <p className='input'>{user.email}</p>
                            <i className="fa-solid fa-angle-right"></i>
                        </div>
                        <div onClick={() => setModalPhone(true)} className="info phone-profil">
                            <p className='label'>Phone</p>
                            <p style={user.phoneNumber ? {color: "black"} : {color: "rgb(163, 163, 163)"}} className='input'>{user.phoneNumber ? user.phoneNumber : "Put your phone number"}</p>
                            <i className="fa-solid fa-angle-right"></i>
                        </div>
                    </div>
                    <div className="container-infos security-information">
                        <h4>Password</h4>
                        <p>A strong password contribute to helps protect your account</p>
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