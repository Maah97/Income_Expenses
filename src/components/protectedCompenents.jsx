import { useContext } from "react"
import { AuthContext } from "../context/authContext"
import PropTypes from 'prop-types'

export default function ProtectedComponents({ children }) {
  const { user, loading } = useContext(AuthContext)

  if (loading) return <p>Chargement...</p>;
  return user ? children : null;
};

ProtectedComponents.propTypes = {
    children: PropTypes.PropTypes.node.isRequired
}