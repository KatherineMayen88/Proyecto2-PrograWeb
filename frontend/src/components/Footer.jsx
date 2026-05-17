import { Link } from 'react-router-dom';

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-grid">

                {/* Marca */}
                <div className="footer-brand">
                    <h2 className="footer-logo">SkyShip<span>Express</span></h2>
                    <p>
                        Soluciones logísticas rápidas, seguras y confiables para
                        personas y empresas en Guatemala y Centroamérica.
                    </p>
                </div>

                {/* Navegación */}
                <div className="footer-col">
                    <h4>Navegación</h4>
                    <ul>
                        <li><a href="/#services">Servicios</a></li>
                        <li><a href="/#about">Sobre nosotros</a></li>
                        <li><a href="/#faq">FAQ</a></li>
                        <li><a href="/#contact">Contacto</a></li>
                    </ul>
                </div>

                {/* Contacto */}
                <div className="footer-col">
                    <h4>Contacto</h4>
                    <ul>
                        <li><span>📞 +502 1234-5678</span></li>
                        <li><span>💬 +502 1234-5678</span></li>
                        <li><span>📧 info@skyship.com</span></li>
                        <li><span>🕐 Lun–Vie 8:00–18:00</span></li>
                    </ul>
                </div>

            </div>

            <hr className="footer-divider" />

            <div className="footer-bottom">
                <p>© {new Date().getFullYear()} SkyShip Express · Todos los derechos reservados</p>
                <div className="footer-bottom-links">
                    <a href="#">Privacidad</a>
                    <a href="#">Términos</a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
