import { useContext } from "react"
import { AuthContext } from "../context/authContext"
import PropTypes from 'prop-types'
import { useTranslation } from "react-i18next"

export default function ProtectedComponents({ children }) {
  const { t } = useTranslation()
  const { user, loading } = useContext(AuthContext)

  if (loading) return <p>{t("protectedCompenents.p")}</p>;
  return user ? children : null;
};

ProtectedComponents.propTypes = {
    children: PropTypes.PropTypes.node.isRequired
}