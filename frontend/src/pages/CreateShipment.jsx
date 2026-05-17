import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import ClientSidebar from '../components/ClientSidebar';

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
        setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
    };

    const calculateCost = () => {
        let total = 0;
        total += formData.destinationType === 'Nacional' ? 35 : 90;
        total += Number(formData.weight || 0) * 12;
        if (formData.serviceType === 'Expres') total += 35;
        if (formData.homePickup) total += 15;
        if (formData.insurance) total += 25;
        if (formData.region === 'Departamental') total += 20;
        if (formData.region === 'Internacional') total += 60;
        return total;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.recipientName.trim() || !formData.recipientPhone.trim() ||
            !formData.destinationAddress.trim() || !formData.packageDescription.trim() || !formData.weight) {
            alert('Complete todos los campos.');
            return;
        }
        try {
            await api.post('/shipments', { ...formData, cost: calculateCost() });
            alert('Envio creado correctamente');
            navigate('/shipments');
        } catch (error) {
            alert('Error creando envio');
        }
    };

    return (
        <div className="dashboard-page">
            <ClientSidebar />
            <main className="dashboard-content">
                <div className="shipment-form-container">
                    <h1 className="shipment-title">Crear envio en SkyShip Express</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="shipment-grid">
                            <div className="shipment-field">
                                <label className="shipment-label">Nombre completo *</label>
                                <input type="text" name="recipientName" required className="shipment-input" placeholder="Ingrese su nombre completo" onChange={handleChange} />
                            </div>
                            <div className="shipment-field">
                                <label className="shipment-label">Telefono *</label>
                                <input type="text" name="recipientPhone" required className="shipment-input" placeholder="Ingrese su numero de telefono" onChange={handleChange} />
                            </div>
                            <div className="shipment-field full">
                                <label className="shipment-label">Direccion *</label>
                                <input type="text" name="destinationAddress" required className="shipment-input" placeholder="Ingrese su direccion de destino" onChange={handleChange} />
                            </div>
                            <div className="shipment-field">
                                <label className="shipment-label">Region *</label>
                                <select name="region" className="shipment-input" required onChange={handleChange}>
                                    <option value="Metropolitana">Metropolitana</option>
                                    <option value="Departamental">Departamental</option>
                                    <option value="Internacional">Internacional</option>
                                </select>
                            </div>
                            <div className="shipment-field">
                                <label className="shipment-label">Tipo de destino *</label>
                                <select name="destinationType" className="shipment-input" required onChange={handleChange}>
                                    <option value="Nacional">Nacional</option>
                                    <option value="Internacional">Internacional</option>
                                </select>
                            </div>
                            <div className="shipment-field full">
                                <label className="shipment-label">Descripcion de paquete *</label>
                                <textarea name="packageDescription" className="shipment-textarea" required placeholder="Ingrese su descripcion" onChange={handleChange}></textarea>
                            </div>
                            <div className="shipment-field">
                                <label className="shipment-label">Peso (kg) *</label>
                                <input type="number" name="weight" className="shipment-input" required placeholder="Ingrese el peso del paquete" onChange={handleChange} />
                            </div>
                            <div className="shipment-field">
                                <label className="shipment-label">Tipo de servicio *</label>
                                <select name="serviceType" className="shipment-input" required onChange={handleChange}>
                                    <option value="Estandar">Estandar</option>
                                    <option value="Expres">Expres</option>
                                </select>
                            </div>
                        </div>
                        <div className="shipment-bottom-row">
                            <div className="shipment-checks">
                                <label><input type="checkbox" name="homePickup" onChange={handleChange} /> Recoleccion a domicilio</label>
                                <label><input type="checkbox" name="insurance" onChange={handleChange} /> Seguro contra perdida</label>
                            </div>
                            <div className="shipment-right-col">
                                <div className="shipment-total">Total estimado:<span>Q{calculateCost()}</span></div>
                                <button type="submit" className="shipment-button">Crear envio</button>
                            </div>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
}

export default CreateShipment;