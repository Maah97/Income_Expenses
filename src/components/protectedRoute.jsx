import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../context/authContext"
import PropTypes from 'prop-types'
import { useTranslation } from "react-i18next"

export default function ProtectedRoute({ children }) {
  const { t } = useTranslation()
  const { user, loading } = useContext(AuthContext)
  const navigate = useNavigate()
  

  if (loading) return <p className="paragraph-protected-route">{t("protectedRoute.p")}</p>;
  return user ? children : navigate("/login");
};

ProtectedRoute.propTypes = {
    children: PropTypes.PropTypes.node.isRequired
}