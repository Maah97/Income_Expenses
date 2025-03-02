import PropTypes from 'prop-types'
import Modal from 'react-modal'
import { useFormik } from 'formik'
import axios from 'axios'
import { AuthContext } from "../context/authContext"
import { useContext, useState } from 'react'

export default function ProfilPictureUpdateForm(props) {
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
            errors.picture = 'picture Required'
        }
        if (!fileTypeVerification(values.picture)) {
            errors.picture = 'You must select an image of type jpeg, jpg, png, gif or webp'
        }
        if (!fileSizeVerification(values.picture)) {
            errors.picture = 'Your image must not exceed 2MB'
        }
        return errors
    }
    const onSubmit =  async (values, { resetForm }) => {
        const bodyFormData = new FormData();
        bodyFormData.append('info', "picture profil");
        bodyFormData.append('image', values.picture);
        try {
            await axios.put('http://localhost:3000/api/auth/updateUser', 
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
            className="content-modal-info picture"
            overlayClassName="overlay-modal-info"
            onRequestClose={() => props.setIsOpen(false)}
        >
            <div className="title-info">
                    <p><span className="green">Incomes</span><span className="red">Expenses</span></p>
                    <div onClick={() => props.setIsOpen(false)} className="i">
                        <i className="fa-solid fa-xmark"></i>
                    </div>
            </div>
            <h3>Picture profil</h3>
            <p className='parapgraphe-picture'>Your profile picture helps other users recognize you and lets you know when you are logged in to your account.</p>
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
                        <p>{user.pictureProfilUrl === "" ? (preview ? "Change profil picture" : "add profile picture") : "Change profil picture"}</p>
                    </div>
                    <input id='file-img' name='picture' type="file" accept="image/*" required onBlur={formik.handleBlur("picture")} onChange={handleFileChange} />
                </label>
                {formik.touched.picture && formik.errors.picture ? <p id='msg-error'>{formik.errors.picture}</p> : null}
                <input type="submit" className="btn-save-info" value="Save" />
            </form>
        </Modal>
    )
}

ProfilPictureUpdateForm.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    setIsOpen: PropTypes.func.isRequired,
    name: PropTypes.string
}