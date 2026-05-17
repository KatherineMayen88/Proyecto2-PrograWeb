import { useState } from 'react';
import { Link } from 'react-router-dom';

function AdminSidebar() {
    const [open, setOpen] = useState(false);

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        window.location.href = '/';
    };

    const close = () => setOpen(false);

    return (
        <>
            {/* Topbar visible solo en mobile */}
            <div className="dashboard-topbar">
                <h2 className="dashboard-topbar-logo">Sky<span>Ship</span> Admin</h2>
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
                    <h2 className="sidebar-logo">SkyShip Admin</h2>
                    <p className="sidebar-subtitle">Monitoreo de operaciones</p>
                    <nav className="sidebar-nav">
                        <Link to="/admin" onClick={close}>★ &nbsp; Dashboard</Link>
                        <Link to="/admin/users" onClick={close}>★ &nbsp; Usuarios</Link>
                        <Link to="/admin/shipments" onClick={close}>★ &nbsp; Envíos</Link>
                        <Link to="/admin/contacts" onClick={close}>★ &nbsp; Contactos</Link>
                    </nav>

                    <button className="logout-button" onClick={logout}>
                        Cerrar sesión
                    </button>

                </div>
            </aside>
        </>
    );
}

export default AdminSidebar;