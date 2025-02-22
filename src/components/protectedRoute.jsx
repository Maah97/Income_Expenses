import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../context/authContext"
import PropTypes from 'prop-types'

export default function ProtectedRoute({ children }) {
  const { user, loading } = useContext(AuthContext)
  const navigate = useNavigate()

  if (loading) return <p>Chargement...</p>;
  return user ? children : navigate("/login");
};

ProtectedRoute.propTypes = {
    children: PropTypes.PropTypes.node.isRequired
}