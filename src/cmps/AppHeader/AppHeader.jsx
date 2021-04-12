
import { Link } from 'react-router-dom'
import './AppHeader.scss'
import logo from '../../assets/icons/bitcoin.png';

export function AppHeader() {

    return (
        <nav className="app-header">
            <Link className="link" to="/contact">
                <img src={logo} alt="Bitcoin App" />
            </Link>
            <div className="nav-content">
                <Link className="link" to="/contact">Contacts</Link>
                <Link className="link" to="/statistic">Statistics</Link>
                <Link className="link" to="/profile">Profile</Link>
            </div>
        </nav>
    )
}
