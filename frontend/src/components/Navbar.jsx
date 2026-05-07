import { Link } from 'react-router-dom';
import icono from '../assets/icono.png';

function Navbar() {
    return (
        <nav className="navbar">
            <div className="logo-container">
                <img src={icono} alt="SkyShip Express" className="logo-img" />
                <span className="logo-text">SkyShip<span>Express</span></span>
            </div>

            <div className="nav-links">
                <a href="#">Inicio</a>
                <a href="#services">Servicios</a>
                <a href="#about">Sobre nosotros</a>
                <a href="#faq">FAQ</a>
                <a href="#contact">Contacto</a>
                <Link to="/login" className="btn-primary">Iniciar Sesión</Link>
            </div>
        </nav>
    );
}

export default Navbar;