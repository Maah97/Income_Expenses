import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../context/authContext"
import PropTypes from 'prop-types'

export default function ProtectedRoute({ children }) {
  const { user, loading } = useContext(AuthContext)
  const [container, setContainer] = useState(children)
  const navigate = useNavigate()
  useEffect(() => {
    if (!user) {
      setContainer(navigate("/login"))
    } else {
      setContainer(children)
    }
  }, [user, navigate, children])

  if (loading) return <p>Chargement...</p>;
  return container;
};

ProtectedRoute.propTypes = {
    children: PropTypes.PropTypes.node.isRequired
}