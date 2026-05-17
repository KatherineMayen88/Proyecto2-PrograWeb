import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

import { Link } from 'react-router-dom';

function CreateShipment() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        recipientName: '',
        recipientPhone: '',
        destinationAddress: '',
        region: 'Metropolitana',
        destinationType: 'Nacional',
        packageDescription: '',
        weight: '',
        serviceType: 'Estandar',
        homePickup: false,
        insurance: false
    });

    const handleChange = (e) => {

        const { name, value, type, checked } = e.target;

        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const calculateCost = () => {

        let total = 0;

        total += formData.destinationType === 'Nacional'
            ? 35
            : 90;

        total += Number(formData.weight || 0) * 12;

        if (formData.serviceType === 'Expres') {
            total += 35;
        }

        if (formData.homePickup) {
            total += 15;
        }

        if (formData.insurance) {
            total += 25;
        }

        if (formData.region === 'Departamental') {
            total += 20;
        }

        if (formData.region === 'Internacional') {
            total += 60;
        }

        return total;
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (
            !formData.recipientName.trim() ||
            !formData.recipientPhone.trim() ||
            !formData.destinationAddress.trim() ||
            !formData.packageDescription.trim() ||
            !formData.weight
        ) {
            alert('Complete todos los campos.');
            return;
        }

        try {

            await api.post('/shipments', {
                ...formData,
                cost: calculateCost()
            });

            alert('Envío creado correctamente');

            navigate('/shipments');

        } catch (error) {

            alert('Error creando envío');

        }
    };

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
                        localStorage.removeItem('role');
                        window.location.href = '/login';
                    }}
                >
                    Cerrar sesión
                </button>
            </aside>

            <main className="dashboard-content">

                <div className="shipment-form-container">

                    <h1 className="shipment-title">
                        Crear envío
                    </h1>

                    <form onSubmit={handleSubmit}>

                        <label className="shipment-label">
                            Nombre del destinatario
                        </label>

                        <input
                            type="text"
                            name="recipientName"
                            required
                            className="shipment-input"
                            onChange={handleChange}
                        />

                        <label className="shipment-label">
                            Teléfono del destinatario
                        </label>

                        <input
                            type="text"
                            name="recipientPhone"
                            required
                            className="shipment-input"
                            onChange={handleChange}
                        />

                        <label className="shipment-label">
                            Dirección de destino
                        </label>

                        <input
                            type="text"
                            name="destinationAddress"
                            required
                            className="shipment-input"
                            onChange={handleChange}
                        />

                        <label className="shipment-label">
                            Región
                        </label>

                        <select
                            name="region"
                            className="shipment-input"
                            required
                            onChange={handleChange}
                        >
                            <option value="Metropolitana">Metropolitana</option>
                            <option value="Departamental">Departamental</option>
                            <option value="Internacional">Internacional</option>
                        </select>

                        <label className="shipment-label">
                            Tipo de destino
                        </label>

                        <select
                            name="destinationType"
                            className="shipment-input"
                            required
                            onChange={handleChange}
                        >
                            <option value="Nacional">Nacional</option>
                            <option value="Internacional">Internacional</option>
                        </select>

                        <label className="shipment-label">
                            Descripción del paquete
                        </label>

                        <textarea
                            name="packageDescription"
                            className="shipment-textarea"
                            required
                            onChange={handleChange}
                        ></textarea>

                        <label className="shipment-label">
                            Peso (kg)
                        </label>

                        <input
                            type="number"
                            name="weight"
                            className="shipment-input"
                            required
                            onChange={handleChange}
                        />

                        <label className="shipment-label">
                            Tipo de servicio
                        </label>

                        <select
                            name="serviceType"
                            className="shipment-input"
                            required
                            onChange={handleChange}
                        >
                            <option value="Estandar">Estándar</option>
                            <option value="Expres">Exprés</option>
                        </select>

                        <div className="shipment-checks">

                            <label>
                                <input
                                    type="checkbox"
                                    name="homePickup"
                                    onChange={handleChange}
                                />

                                Recolección a domicilio
                            </label>

                            <label>
                                <input
                                    type="checkbox"
                                    name="insurance"
                                    onChange={handleChange}
                                />

                                Seguro contra pérdida
                            </label>

                        </div>

                        <div className="shipment-total">
                            Total estimado:
                            <span>
                                Q{calculateCost()}
                            </span>
                        </div>

                        <button
                            type="submit"
                            className="shipment-button"
                        >
                            Crear envío
                        </button>

                    </form>

                </div>

            </main>

        </div>
    );
}

export default CreateShipment;