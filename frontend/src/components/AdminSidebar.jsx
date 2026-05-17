import { Link } from 'react-router-dom';

function AdminSidebar() {
    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        window.location.href = '/';
    };

    return (
        <aside className="sidebar">
            <div>
                <h2 className="sidebar-logo">SkyShip Admin</h2>

                <p className="sidebar-subtitle">
                    Monitoreo de operaciones
                </p>

                <nav className="sidebar-nav">
                    <Link to="/admin">Dashboard</Link>
                    <Link to="/admin/users">Usuarios</Link>
                    <Link to="/admin/shipments">Envíos</Link>
                    <Link to="/admin/contacts">Contactos</Link>
                </nav>
            </div>

            <button className="logout-button" onClick={logout}>
                Cerrar sesión
            </button>
        </aside>
    );
}

export default AdminSidebar;