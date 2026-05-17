import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import ClientSidebar from '../components/ClientSidebar';

const TARIFAS = [
    { concepto: 'Envío nacional (base)',        precio: 'Q35.00' },
    { concepto: 'Envío internacional (base)',   precio: 'Q90.00' },
    { concepto: 'Por kilogramo',                precio: 'Q12.00 / kg' },
    { concepto: 'Servicio Exprés',              precio: '+Q35.00' },
    { concepto: 'Recolección a domicilio',      precio: '+Q15.00' },
    { concepto: 'Seguro contra pérdida',        precio: '+Q25.00' },
    { concepto: 'Recargo Departamental',        precio: '+Q20.00' },
    { concepto: 'Recargo Internacional',        precio: '+Q60.00' },
];

const PASOS = [
    { num: 1, title: 'Crea tu envío', desc: 'Ingresa los datos del destinatario, selecciona la región y el tipo de servicio que necesitas.' },
    { num: 2, title: 'Confirmamos tu pedido', desc: 'Nuestro equipo revisa y procesa tu solicitud. Te notificaremos cuando esté en camino.' },
    { num: 3, title: 'Rastrea tu paquete', desc: 'Consulta el estado de tu envío en cualquier momento desde "Mis envíos" con tu código de guía.' },
];

function StatusBadge({ status }) {
    const map = {
        pendiente:   { label: 'Pendiente',  bg: '#fff4e5', color: '#d97706' },
        'en camino': { label: 'En camino',  bg: '#e0f2fe', color: '#0369a1' },
        entregado:   { label: 'Entregado',  bg: '#dcfce7', color: '#16a34a' },
        cancelado:   { label: 'Cancelado',  bg: '#fee2e2', color: '#dc2626' },
    };
    const s = map[status?.toLowerCase()] || { label: status, bg: '#f3f4f6', color: '#6b7280' };
    return (
        <span style={{ background: s.bg, color: s.color, padding: '4px 12px', borderRadius: '999px', fontSize: '12px', fontWeight: 800, whiteSpace: 'nowrap' }}>
            {s.label}
        </span>
    );
}

function ClientDashboard() {
    const [recentShipments, setRecentShipments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get('/shipments/mine')
            .then(res => setRecentShipments(res.data.slice(0, 3)))
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    }, []);

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

                <div className="client-dashboard-section">
                    <h2 className="client-section-title">Como funciona</h2>
                    <div className="steps-grid">
                        {PASOS.map((paso) => (
                            <div className="step-card" key={paso.num}>
                                <div className="step-number">{paso.num}</div>
                                <h4>{paso.title}</h4>
                                <p>{paso.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="client-dashboard-section">
                    <h2 className="client-section-title">Mis ultimos envios</h2>
                    {loading ? (
                        <p style={{ color: '#aaa' }}>Cargando...</p>
                    ) : recentShipments.length === 0 ? (
                        <div className="no-shipments">
                            Aun no tienes envios registrados. <Link to="/shipments/new" style={{ color: '#11a7e5' }}>Crea tu primero!</Link>
                        </div>
                    ) : (
                        <div className="recent-shipments-list">
                            {recentShipments.map((s) => (
                                <div className="recent-shipment-row" key={s._id}>
                                    <div className="recent-shipment-info">
                                        <span className="recent-tracking">{s.trackingCode}</span>
                                        <span className="recent-recipient">{s.recipientName}</span>
                                        <span className="recent-date">{new Date(s.createdAt).toLocaleDateString('es-GT', { day: '2-digit', month: 'long', year: 'numeric' })}</span>
                                    </div>
                                    <div className="recent-shipment-right">
                                        <StatusBadge status={s.status} />
                                        <span className="recent-cost">Q{s.cost}</span>
                                    </div>
                                </div>
                            ))}
                            <Link to="/shipments" style={{ display: 'inline-block', marginTop: '8px', color: '#11a7e5', fontWeight: 700, fontSize: '14px', textDecoration: 'none' }}>
                                Ver todos mis envios
                            </Link>
                        </div>
                    )}
                </div>

                <div className="client-dashboard-section">
                    <h2 className="client-section-title">Nuestras tarifas</h2>
                    <div className="rates-table-wrapper">
                        <table className="rates-table">
                            <thead>
                                <tr>
                                    <th>Concepto</th>
                                    <th>Precio</th>
                                </tr>
                            </thead>
                            <tbody>
                                {TARIFAS.map((t, i) => (
                                    <tr key={i}>
                                        <td>{t.concepto}</td>
                                        <td className="rate-price">{t.precio}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

            </main>
        </div>
    );
}

export default ClientDashboard;