import { Link } from 'react-router-dom';
import ClientSidebar from '../components/ClientSidebar';

function ClientDashboard() {
    return (
        <div className="dashboard-page">

            <ClientSidebar />

            <main className="dashboard-content">

                <div className="dashboard-header">
                    <h1>Bienvenido a SkyShip Express</h1>
                    <p>Administra tus paquetes y consulta el estado de tus envíos.</p>
                </div>

                <div className="dashboard-cards">

                    <div className="dashboard-card">
                        <h3>Nuevo envío</h3>
                        <p>Crea una nueva solicitud de envío.</p>
                        <Link to="/shipments/new">Crear envío</Link>
                    </div>

                    <div className="dashboard-card">
                        <h3>Mis envíos</h3>
                        <p>Consulta todos tus paquetes registrados.</p>
                        <Link to="/shipments">Ver envíos</Link>
                    </div>

                </div>

            </main>

        </div>
    );
}

export default ClientDashboard;