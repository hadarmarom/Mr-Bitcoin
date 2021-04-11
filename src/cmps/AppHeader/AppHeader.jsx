
import { Link } from 'react-router-dom'
import './AppHeader.scss'

export function AppHeader() {

    return (
        <nav className="app-header">
            <Link className="link" to="/contact">Logo</Link>
            <div className="nav-content">
                <Link className="link" to="/contact">Contacts</Link>
                <Link className="link" to="/statistic">Statistics</Link>
                <Link className="link" to="/profile">Profile</Link>
            </div>
        </nav>
    )
}
