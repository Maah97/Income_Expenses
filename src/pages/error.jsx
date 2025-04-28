import { NavLink } from "react-router-dom"

export default function ErrorPage() {
    return (
        <div className="error-page">
            <h1>404</h1>
            <h2>Page Not Found</h2>
            <p>The page you are looking for does not exist.</p>
            <NavLink className="link-home" to="/">Go back to Home</NavLink>
        </div>
    )
}