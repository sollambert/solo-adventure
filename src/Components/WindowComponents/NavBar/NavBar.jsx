import { Link } from "react-router-dom";
import './NavBar.css'

function NavBar() {
    return (
        <div className='nav-bar'>
            <Link className="link" to='/inventory'>Inventory</Link>
            <Link className="link" to='/settings'>Settings</Link>
            <Link className="link" to='/about'>About</Link>
        </div>
    )
}

export default NavBar;