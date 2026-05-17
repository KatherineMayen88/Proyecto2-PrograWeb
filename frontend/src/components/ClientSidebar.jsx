import { useState } from 'react';
import { Link } from 'react-router-dom';

function ClientSidebar() {
    const [open, setOpen] = useState(false);

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        window.location.href = '/login';
    };

    const close = () => setOpen(false);

    return (
        <>
            {/* Topbar visible solo en mobile */}
            <div className="dashboard-topbar">
                <h2 className="dashboard-topbar-logo">Sky<span>Ship</span></h2>
                <button
                    className={`sidebar-toggle ${open ? 'open' : ''}`}
                    onClick={() => setOpen(!open)}
                    aria-label="Abrir menú"
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>

            {/* Overlay oscuro */}
            <div
                className={`sidebar-overlay ${open ? 'visible' : ''}`}
                onClick={close}
            />

            {/* Sidebar / drawer */}
            <aside className={`sidebar ${open ? 'open' : ''}`}>
                <div>
                    <h2 className="sidebar-logo">SkyShip<br />Client</h2>
                    <nav className="sidebar-nav">
                        <Link to="/dashboard" onClick={close}>★ &nbsp; Dashboard</Link>
                        <Link to="/shipments/new" onClick={close}>★ &nbsp; Crear envío</Link>
                        <Link to="/shipments" onClick={close}>★ &nbsp; Mis envíos</Link>
                    </nav>

                    <button className="logout-button" onClick={logout}>
                        Cerrar sesión
                    </button>
                </div>
            </aside>
        </>
    );
}

export default ClientSidebar;