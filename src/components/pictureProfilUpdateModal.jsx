import PropTypes from 'prop-types'
import Modal from 'react-modal'
import { useFormik } from 'formik'
import axios from 'axios'
import { AuthContext } from "../context/authContext"
import { useContext, useState } from 'react'
import { ThemeContext } from "../context/themeContext"
import { useTranslation } from "react-i18next"

export default function ProfilPictureUpdateForm(props) {
    const { t } = useTranslation()
    const { theme } = useContext(ThemeContext)
    const { user, getColorFromLetter } = useContext(AuthContext)
    const [preview, setPreview] = useState(null);
    // creation fonction pour la verification du type d'image
    function fileTypeVerification(file) {
        let fileTypesImage = ["image/jpg", "image/png", "image/jpeg", "image/gif", "image/webp"];
        for (let i = 0; i < fileTypesImage.length; i++) {
            if (file.type === fileTypesImage[i]) {
              return true;
            }
        }
        return false;
    }
    // creation fonction pour la verification de la taille de l'image
    function fileSizeVerification(file) {
        if (file.size <= 2000000) {
            return true
        }    
        return false
    }
    const initialValues = {
        picture: null
    }
    const validate = values => {
        let errors = {}
        if (values.picture == null) {
            errors.picture = t("pictureProfilUpdateModal.errors.error1")
        }
        if (!fileTypeVerification(values.picture)) {
            errors.picture = t("pictureProfilUpdateModal.errors.error2")
        }
        if (!fileSizeVerification(values.picture)) {
            errors.picture = t("pictureProfilUpdateModal.errors.error3")
        }
        return errors
    }
    const onSubmit =  async (values, { resetForm }) => {
        const bodyFormData = new FormData();
        bodyFormData.append('info', "picture profil");
        bodyFormData.append('image', values.picture);
        try {
            await axios.put(`${import.meta.env.VITE_BASE_URL_USER}/updateUser`, 
                bodyFormData, 
                { withCredentials: true }
            ).then(() => {
                resetForm()
                props.setIsOpen(false)
                window.location.reload()
            }).catch((error) => {
                console.log(error);
            })
        } catch (error) {
                console.log(error);            
        }
    }
    const formik = useFormik({
        initialValues,
        onSubmit,
        validate
    })
    const handleFileChange = (event) => {
        const file = event.currentTarget.files[0];
        if (file) {
            formik.setFieldValue("picture", file); // Ajoute le fichier dans Formik
            if (!fileTypeVerification(file) || !fileSizeVerification(file)) {
                setPreview(null)
            } else {
                setPreview(URL.createObjectURL(file)); // Génère un aperçu
            }
        }
    };
    return (
        <Modal
            isOpen={props.isOpen}
            className={theme === 'light' ? "content-modal-info picture" : "content-modal-info picture dark"}
            overlayClassName={theme === 'light' ? "overlay-modal-info" : "overlay-modal-info dark"}
            onRequestClose={() => props.setIsOpen(false)}
        >
            <div className="title-info">
                    <p><span className="green">Incomes</span><span className="red">Expenses</span></p>
                    <div onClick={() => props.setIsOpen(false)} className="i">
                        <i className="fa-solid fa-xmark"></i>
                    </div>
            </div>
            <h3>{t("pictureProfilUpdateModal.h3")}</h3>
            <p className='parapgraphe-picture'>{t("pictureProfilUpdateModal.p")}</p>
            <form onSubmit={formik.handleSubmit} className='update-form picture'>
                <label name="picture" className='picture-profil'>
                    {
                        user.pictureProfilUrl === "" 
                        ?
                        (preview ? <img className='img-picture-profil' src={preview} alt="picture-profil" /> : <p style={{backgroundColor: `${getColorFromLetter(user.userName[0])}`}} className='first-picture-profil'>{props.name[0].toUpperCase()}</p>)
                        :
                        (preview ? <img className='img-picture-profil' src={preview} alt="picture-profil" /> : <img className='img-picture-profil' src={user.pictureProfilUrl} alt="picture-profil" />)
                    }
                    <div className="btn-add-picture-profil">
                        <i className="fa-solid fa-camera"></i>
                        <p>{user.pictureProfilUrl === "" ? (preview ? t("pictureProfilUpdateModal.btnChange") : "add profile picture") : t("pictureProfilUpdateModal.btnAdd")}</p>
                    </div>
                    <input id='file-img' name='picture' type="file" accept="image/*" required onBlur={formik.handleBlur("picture")} onChange={handleFileChange} />
                </label>
                {formik.touched.picture && formik.errors.picture ? <p id='msg-error'>{formik.errors.picture}</p> : null}
                <input type="submit" className="btn-save-info" value={t("pictureProfilUpdateModal.save")} />
            </form>
        </Modal>
    )
}

ProfilPictureUpdateForm.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    setIsOpen: PropTypes.func.isRequired,
    name: PropTypes.string
}