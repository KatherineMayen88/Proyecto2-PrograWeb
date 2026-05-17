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

    const [errors, setErrors] = useState({});

    const validate = () => {
        const newErrors = {};

        if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(formData.recipientName.trim())) {
            newErrors.recipientName = 'El nombre solo debe contener letras.';
        }

        if (!/^\d{8,15}$/.test(formData.recipientPhone.trim())) {
            newErrors.recipientPhone = 'El teléfono debe contener solo números, mínimo 8 y máximo 15 dígitos.';
        }

        if (formData.destinationAddress.trim().length < 5) {
            newErrors.destinationAddress = 'La dirección debe tener al menos 5 caracteres.';
        }

        if (!formData.packageDescription.trim()) {
            newErrors.packageDescription = 'La descripción es obligatoria.';
        }

        if (!formData.weight || Number(formData.weight) <= 0) {
            newErrors.weight = 'Ingrese un peso válido.';
        }

        return newErrors;
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
        // Limpiar error del campo al editar
        if (errors[name]) setErrors({ ...errors, [name]: '' });
    };

    // Solo letras en nombre
    const handleNameChange = (e) => {
        const value = e.target.value;
        if (/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/.test(value)) {
            setFormData({ ...formData, recipientName: value });
            if (errors.recipientName) setErrors({ ...errors, recipientName: '' });
        }
    };

    // Solo números en teléfono
    const handlePhoneChange = (e) => {
        const value = e.target.value;
        if (/^\d*$/.test(value) && value.length <= 15) {
            setFormData({ ...formData, recipientPhone: value });
            if (errors.recipientPhone) setErrors({ ...errors, recipientPhone: '' });
        }
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
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        try {
            await api.post('/shipments', { ...formData, cost: calculateCost() });
            alert('Envío creado correctamente');
            navigate('/shipments');
        } catch (error) {
            alert('Error creando envío');
        }
    };

    return (
        <div className="dashboard-page">

            <ClientSidebar />

            <main className="dashboard-content">
                <div className="shipment-form-container">
                    <h1 className="shipment-title">Crear envío en SkyShip Express</h1>

                    <form onSubmit={handleSubmit}>
                        <div className="shipment-grid">

                            <div className="shipment-field">
                                <label className="shipment-label">Nombre completo *</label>
                                <input
                                    type="text"
                                    name="recipientName"
                                    required
                                    className={`shipment-input ${errors.recipientName ? 'input-error' : ''}`}
                                    placeholder="Solo letras"
                                    value={formData.recipientName}
                                    onChange={handleNameChange}
                                />
                                {errors.recipientName && <span className="field-error">{errors.recipientName}</span>}
                            </div>

                            <div className="shipment-field">
                                <label className="shipment-label">Teléfono *</label>
                                <input
                                    type="text"
                                    name="recipientPhone"
                                    required
                                    className={`shipment-input ${errors.recipientPhone ? 'input-error' : ''}`}
                                    placeholder="Solo números (8–15 dígitos)"
                                    value={formData.recipientPhone}
                                    onChange={handlePhoneChange}
                                />
                                {errors.recipientPhone && <span className="field-error">{errors.recipientPhone}</span>}
                            </div>

                            <div className="shipment-field full">
                                <label className="shipment-label">Dirección *</label>
                                <input
                                    type="text"
                                    name="destinationAddress"
                                    required
                                    className={`shipment-input ${errors.destinationAddress ? 'input-error' : ''}`}
                                    placeholder="Ingrese su dirección de destino"
                                    value={formData.destinationAddress}
                                    onChange={handleChange}
                                />
                                {errors.destinationAddress && <span className="field-error">{errors.destinationAddress}</span>}
                            </div>

                            <div className="shipment-field">
                                <label className="shipment-label">Región *</label>
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
                                <label className="shipment-label">Descripción de paquete *</label>
                                <textarea
                                    name="packageDescription"
                                    className={`shipment-textarea ${errors.packageDescription ? 'input-error' : ''}`}
                                    required
                                    placeholder="Ingrese su descripción"
                                    value={formData.packageDescription}
                                    onChange={handleChange}
                                ></textarea>
                                {errors.packageDescription && <span className="field-error">{errors.packageDescription}</span>}
                            </div>

                            <div className="shipment-field">
                                <label className="shipment-label">Peso (kg) *</label>
                                <input
                                    type="number"
                                    name="weight"
                                    className={`shipment-input ${errors.weight ? 'input-error' : ''}`}
                                    required
                                    placeholder="Ej. 2.5"
                                    value={formData.weight}
                                    onChange={handleChange}
                                />
                                {errors.weight && <span className="field-error">{errors.weight}</span>}
                            </div>

                            <div className="shipment-field">
                                <label className="shipment-label">Tipo de servicio *</label>
                                <select name="serviceType" className="shipment-input" required onChange={handleChange}>
                                    <option value="Estandar">Estándar</option>
                                    <option value="Expres">Exprés</option>
                                </select>
                            </div>

                        </div>

                        <div className="shipment-bottom-row">

                            <div className="shipment-checks">
                                <label>
                                    <input type="checkbox" name="homePickup" onChange={handleChange} />
                                    Recolección a domicilio
                                </label>
                                <label>
                                    <input type="checkbox" name="insurance" onChange={handleChange} />
                                    Seguro contra pérdida
                                </label>
                            </div>

                            <div className="shipment-right-col">
                                <div className="shipment-total">
                                    Total estimado:
                                    <span>Q{calculateCost()}</span>
                                </div>
                                <button type="submit" className="shipment-button">Crear envío</button>
                            </div>

                        </div>

                    </form>
                </div>
            </main>

        </div>
    );
}

export default CreateShipment;