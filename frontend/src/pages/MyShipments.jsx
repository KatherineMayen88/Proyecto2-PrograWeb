import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import ClientSidebar from '../components/ClientSidebar';

function MyShipments() {

    const [shipments, setShipments] = useState([]);

    useEffect(() => {
        fetchShipments();
    }, []);

    const fetchShipments = async () => {
        try {
            const response = await api.get('/shipments/mine');
            setShipments(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="dashboard-page">

            <ClientSidebar />

            <main className="dashboard-content">

                <div className="shipments-header">
                    <h1>Mis envíos</h1>
                    <p>Consulta el estado y detalles de tus paquetes.</p>
                </div>

                <div className="shipments-grid">
                    {shipments.map((shipment) => (
                        <div key={shipment._id} className="shipment-card">

                            <div className="shipment-card-top">
                                <span className="tracking-code">{shipment.trackingCode}</span>
                                <span className={`shipment-status ${shipment.status.toLowerCase()}`}>
                                    {shipment.status}
                                </span>
                            </div>

                            <h3 className="shipment-recipient">{shipment.recipientName}</h3>

                            <p className="shipment-info">Región: {shipment.region}</p>
                            <p className="shipment-info">Tipo: {shipment.destinationType}</p>
                            <p className="shipment-info">Servicio: {shipment.serviceType}</p>
                            <p className="shipment-info">Peso: {shipment.weight} kg</p>

                            <div className="shipment-footer">
                                <span>Q{shipment.cost}</span>
                                <span>{new Date(shipment.createdAt).toLocaleDateString()}</span>
                            </div>

                        </div>
                    ))}
                </div>

            </main>

        </div>
    );
}

export default MyShipments;