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



export default function Caroussel() {
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
            <h3><span>Incomes</span><span>Expenses</span> can be used for</h3>
            <Slider {...settings}>
                <div>
                    <img src={img} alt="Slide 1" />
                    <div className="txt">
                        <h4>Tracking Income and Expenses</h4>
                        <p>Monitor all your earnings and spending in one place. Categorize transactions for better clarity.</p>
                    </div>
                </div>
                <div>
                    <img src={img1} alt="Slide 2" />
                    <div className="txt">
                        <h4>Budget Planning</h4>
                        <p>Set monthly or yearly budgets to control spending. eceive alerts when you approach your budget limits.</p>
                    </div>
                </div>
                <div>
                    <img src={img2} alt="Slide 3" />
                    <div className="txt">
                        <h4>Financial Insights and Reports</h4>
                        <p>Get detailed reports on income vs. expenses. Identify spending patterns and optimize finances.</p>
                    </div>
                </div>
                <div>
                    <img src={img3} alt="Slide 1" />
                    <div className="txt">
                        <h4>Saving and Investment Planning</h4>
                        <p>Plan savings goals based on your income and expenses. Allocate funds for future investments.</p>
                    </div>
                </div>
                <div>
                    <img src={img4} alt="Slide 2" />
                    <div className="txt">
                        <h4>Debt and Bill Management</h4>
                        <p>Keep track of recurring bills and payments. Avoid late fees by setting payment reminders.</p>
                    </div>
                </div>
                <div>
                    <img src={img5} alt="Slide 3" />
                    <div className="txt">
                        <h4>Multi-Month and Long-Term Financial Analysis</h4>
                        <p>Analyze financial trends over months or years. Make informed decisions for financial stability.</p>
                    </div>
                </div>
                <div>
                    <img src={img6} alt="Slide 3" />
                    <div className="txt">
                        <h4>Personal and Business Use</h4>
                        <p>Manage personal finances efficiently. Track business expenses if youC&apos;re self-employed.</p>
                    </div>
                </div>
            </Slider>
        </div>
    )
}