import { useContext } from 'react';
import imgPersonalInformation from '../assets/imgPersonnalInformation.webp'
import { AuthContext } from "../context/authContext"

export default function UserInformation() {
    const { user } = useContext(AuthContext);
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
                        <div className="info picture-profil">
                            <p>profile picture</p>
                            <div className='file-img-picture'>
                                <input id='file-img' type="file" accept="image/*" />
                            </div>
                        </div>
                        <div className="info username-profil">
                            <label htmlFor="username">Name</label>
                            <input type="text" defaultValue={user.userName} disabled />
                            <i className="fa-solid fa-angle-right"></i>
                        </div>
                        <div className="info birthday-profil">
                            <label htmlFor="birthday">Birthday</label>
                            <input style={user.birthday ? {color: "black"} : {color: "rgb(163, 163, 163)"}} type="text" defaultValue={user.birthday ? user.birthday : "Put your birhday"} />
                            <i className="fa-solid fa-angle-right"></i>
                        </div>
                        <div className="info occupation-profil">
                            <label htmlFor="occupation">Occupation</label>
                            <input style={user.occupation ? {color: "black"} : {color: "rgb(163, 163, 163)"}} type="text" defaultValue={user.occupation ? user.occupation : "Put your occupation"} />
                            <i className="fa-solid fa-angle-right"></i>
                        </div>
                        <div className='info gender-profil'>
                            <label htmlFor="gender">Gender</label>
                            <input type="text" defaultValue={user.gender} />
                            <i className="fa-solid fa-angle-right"></i>
                        </div>
                    </div>
                    <div className="container-infos general-information">
                        <h4>Contact details</h4>
                        <div className="info email-address-profil">
                            <label htmlFor="email">Email address</label>
                            <input type="email" defaultValue={user.email} />
                            <i className="fa-solid fa-angle-right"></i>
                        </div>
                        <div className="info phone-profil">
                            <label htmlFor="phone">Phone</label>
                            <input style={user.phoneNumber ? {color: "black"} : {color: "rgb(163, 163, 163)"}} type="text" defaultValue={user.phoneNumber ? user.phoneNumber : "Put your phone number"} />
                            <i className="fa-solid fa-angle-right"></i>
                        </div>
                    </div>
                    <div className="container-infos security-information">
                        <h4>Password</h4>
                        <p>A strong password contribute to helps protect your account</p>
                        <div className="info password-profil">
                            <input id='password-profil' type="text" defaultValue="........." />
                            <i className="fa-solid fa-angle-right"></i>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}