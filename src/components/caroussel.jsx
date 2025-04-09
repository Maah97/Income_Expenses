import Slider from "react-slick";
import { useContext } from "react"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import img from "../assets/Tracking-Income-Expenses.webp"
import img1 from "../assets/Budget-Planning.webp"
import img2 from "../assets/Financial-Insights-Reports.webp"
import img3 from "../assets/Saving-Investment-Planning.webp"
import img4 from "../assets/Debt-Bill-Management.webp"
import img5 from "../assets/Multi-Month-Long-Term-Financial-Analysis.webp"
import img6 from "../assets/Personal-Business-Use.webp"
import { ThemeContext } from "../context/themeContext"
import { useTranslation } from "react-i18next"

export default function Caroussel() {
    const { t } = useTranslation()
    const { theme } = useContext(ThemeContext)
    const settings = {
        dots: true, // Affiche les points de navigation
        infinite: true, // Défilement infini
        speed: 500, // Vitesse de transition (ms)
        slidesToShow: 1, // Nombre de slides visibles
        slidesToScroll: 1, // Nombre de slides à faire défiler
        autoplay: true, // Défilement automatique
        autoplaySpeed: 4000, // Vitesse de l'auto-scroll (ms)
    };
    return (
        <div className={theme === 'light' ? "carrousel-container" : "carrousel-container dark"}>
            <h3><span>Incomes</span><span>Expenses</span> {t("caroussel.h3")}</h3>
            <Slider {...settings}>
                <div>
                    <img src={img} alt="Slide 1" />
                    <div className="txt">
                        <h4>{t("caroussel.imgH4")}</h4>
                        <p>{t("caroussel.imgP")}</p>
                    </div>
                </div>
                <div>
                    <img src={img1} alt="Slide 2" />
                    <div className="txt">
                        <h4>{t("caroussel.img1H4")}</h4>
                        <p>{t("caroussel.img1P")}</p>
                    </div>
                </div>
                <div>
                    <img src={img2} alt="Slide 3" />
                    <div className="txt">
                        <h4>{t("caroussel.img2H4")}</h4>
                        <p>{t("caroussel.img2P")}</p>
                    </div>
                </div>
                <div>
                    <img src={img3} alt="Slide 1" />
                    <div className="txt">
                        <h4>{t("caroussel.img3H4")}</h4>
                        <p>{t("caroussel.img3P")}</p>
                    </div>
                </div>
                <div>
                    <img src={img4} alt="Slide 2" />
                    <div className="txt">
                        <h4>{t("caroussel.img4H4")}</h4>
                        <p>{t("caroussel.img4P")}</p>
                    </div>
                </div>
                <div>
                    <img src={img5} alt="Slide 3" />
                    <div className="txt">
                        <h4>{t("caroussel.img5H4")}</h4>
                        <p>{t("caroussel.img5P")}</p>
                    </div>
                </div>
                <div>
                    <img src={img6} alt="Slide 3" />
                    <div className="txt">
                        <h4>{t("caroussel.img6H4")}</h4>
                        <p>{t("caroussel.img6P")}</p>
                    </div>
                </div>
            </Slider>
        </div>
    )
}