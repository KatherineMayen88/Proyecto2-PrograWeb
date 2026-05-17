import { Link } from 'react-router-dom';

function ClientDashboard() {

    return (
        <div className="dashboard-page">

            <aside className="sidebar">

                <div>
                    <h2 className="sidebar-logo">
                        SkyShip
                    </h2>

                    <nav className="sidebar-nav">

                        <Link to="/dashboard">
                            Dashboard
                        </Link>

                        <Link to="/shipments/new">
                            Crear envío
                        </Link>

                        <Link to="/shipments">
                            Mis envíos
                        </Link>

                    </nav>
                </div>

                <button
                    className="logout-button"
                    onClick={() => {
                        localStorage.removeItem('token');
                        window.location.href = '/login';
                    }}
                >
                    Cerrar sesión
                </button>

            </aside>

            <main className="dashboard-content">

                <div className="dashboard-header">

                    <div>
                        <h1>
                            Bienvenido a SkyShip Express
                        </h1>

                        <p>
                            Administra tus paquetes y consulta el estado de tus envíos.
                        </p>
                    </div>

                </div>

                <div className="dashboard-cards">

                    <div className="dashboard-card">
                        <h3>Nuevo envío</h3>
                        <p>Crea una nueva solicitud de envío.</p>

                        <Link to="/shipments/new">
                            Crear envío
                        </Link>
                    </div>

                    <div className="dashboard-card">
                        <h3>Mis envíos</h3>
                        <p>Consulta todos tus paquetes registrados.</p>

                        <Link to="/shipments">
                            Ver envíos
                        </Link>
                    </div>

                </div>

            </main>

        </div>
    );
}

export default ClientDashboard;