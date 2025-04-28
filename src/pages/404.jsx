import { NavLink } from "react-router-dom"
import { useTranslation } from "react-i18next"

export default function ErrorPage() {
    const { t } = useTranslation();
    return (
        <div className="error-page">
            <h1>404</h1>
            <h2>{t("errorPage.h2")}</h2>
            <p>{t("errorPage.p")}</p>
            <NavLink className="link-home" to="/">{t("errorPage.home")}</NavLink>
        </div>
    )
}