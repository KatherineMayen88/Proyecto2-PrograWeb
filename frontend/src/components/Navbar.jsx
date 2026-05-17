import { Link } from 'react-router-dom';
import { useState } from 'react';
import icono from '../assets/icono.png';

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);

    const closeMenu = () => setMenuOpen(false);

    return (
        <nav className="navbar">
            <div className="logo-container">
                <img src={icono} alt="SkyShip Express" className="logo-img" />
                <span className="logo-text">SkyShip<span>Express</span></span>
            </div>

            <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
                <a href="#" onClick={closeMenu}>Inicio</a>
                <a href="#services" onClick={closeMenu}>Servicios</a>
                <a href="#about" onClick={closeMenu}>Sobre nosotros</a>
                <a href="#faq" onClick={closeMenu}>FAQ</a>
                <a href="#contact" onClick={closeMenu}>Contacto</a>
                <Link to="/login" className="btn-primary" onClick={closeMenu}>Iniciar Sesión</Link>
            </div>

            <button
                className={`hamburger ${menuOpen ? 'open' : ''}`}
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Abrir menú"
            >
                <span></span>
                <span></span>
                <span></span>
            </button>
        </nav>
    );
}

export default Navbar;