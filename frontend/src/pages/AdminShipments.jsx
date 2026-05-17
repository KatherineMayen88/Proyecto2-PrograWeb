import { useEffect, useState } from 'react';
import api from '../api/axios';

import AdminSidebar from '../components/AdminSidebar';
import { validateName, validatePhone } from '../utils/validations';


function AdminShipments() {

    const [shipments, setShipments] = useState([]);

    useEffect(() => {

        fetchShipments();

    }, []);

    const fetchShipments = async () => {

        try {

            const response = await api.get('/admin/shipments');

            setShipments(response.data);

        } catch (error) {

            console.error(error);

        }
    };

    const updateStatus = async (id, status) => {

        try {

            await api.put(`/admin/shipments/${id}`, {
                status
            });

            fetchShipments();

        } catch (error) {

            console.error(error);

        }
    };

    const deleteShipment = async (id) => {

        const confirmDelete = window.confirm(
            '¿Eliminar envío?'
        );

        if (!confirmDelete) {
            return;
        }

        try {

            await api.delete(`/admin/shipments/${id}`);

            fetchShipments();

        } catch (error) {

            console.error(error);

        }
    };


    const [editingShipment, setEditingShipment] = useState(null);

    const [editForm, setEditForm] = useState({
        recipientName: '',
        recipientPhone: '',
        destinationAddress: '',
        region: 'Metropolitana',
        destinationType: 'Nacional',
        packageDescription: '',
        weight: '',
        serviceType: 'Estandar',
        homePickup: false,
        insurance: false,
        status: 'Pendiente',
        cost: 0
    });

    const startEdit = (shipment) => {
        setEditingShipment(shipment._id);

        setEditForm({
            recipientName: shipment.recipientName || '',
            recipientPhone: shipment.recipientPhone || '',
            destinationAddress: shipment.destinationAddress || '',
            region: shipment.region || 'Metropolitana',
            destinationType: shipment.destinationType || 'Nacional',
            packageDescription: shipment.packageDescription || '',
            weight: shipment.weight || '',
            serviceType: shipment.serviceType || 'Estandar',
            homePickup: Boolean(shipment.homePickup),
            insurance: Boolean(shipment.insurance),
            status: shipment.status || 'Pendiente',
            cost: shipment.cost || 0
        });
    };

    const handleEditChange = (e) => {
        const { name, value, type, checked } = e.target;

        const updatedForm = {
            ...editForm,
            [name]: type === 'checkbox' ? checked : value
        };

        updatedForm.cost = calculateShipmentCost(updatedForm);

        setEditForm(updatedForm);
    };


    const saveShipment = async (id) => {

        if (
            !editForm.recipientName.trim() ||
            !editForm.recipientPhone.trim() ||
            !editForm.destinationAddress.trim() ||
            !editForm.region.trim() ||
            !editForm.destinationType.trim() ||
            !editForm.packageDescription.trim() ||
            !String(editForm.weight).trim() ||
            !editForm.serviceType.trim() ||
            !editForm.status.trim()
        ) {
            alert('Todos los campos son obligatorios.');
            return;
        }

        if (!validateName(editForm.recipientName)) {
            alert('El nombre del destinatario solo debe contener letras.');
            return;
        }

        if (!validatePhone(editForm.recipientPhone)) {
            alert('El teléfono debe contener solo números, mínimo 8 y máximo 15 dígitos.');
            return;
        }


        try {
            await api.put(`/admin/shipments/${id}`, {
                ...editForm,
                cost: calculateShipmentCost(editForm)
            });

            setEditingShipment(null);
            fetchShipments();

            alert('Envío actualizado correctamente');
        } catch (error) {
            alert('Error actualizando envío');
        }
    };


    const calculateShipmentCost = (data) => {
        let total = 0;

        total += data.destinationType === 'Nacional' ? 35 : 90;
        total += Number(data.weight || 0) * 12;

        if (data.serviceType === 'Expres') {
            total += 35;
        }

        if (data.homePickup) {
            total += 15;
        }

        if (data.insurance) {
            total += 25;
        }

        if (data.region === 'Departamental') {
            total += 20;
        }

        if (data.region === 'Internacional') {
            total += 60;
        }

        return total;
    };


    return (
        <div className="dashboard-page">

            <AdminSidebar />

            <main className="dashboard-content">

                <h1 className="table-title">
                    Gestión de envíos
                </h1>

                <div className="table-container">

                    <table className="admin-table">

                        <thead>

                            <tr>
                                <th>Tracking</th>
                                <th>Nombre</th>
                                <th>Teléfono</th>
                                <th>Dirección</th>
                                <th>Región</th>
                                <th>Destino</th>
                                <th>Descripción</th>
                                <th>Peso</th>
                                <th>Servicio</th>
                                <th>Extras</th>
                                <th>Estado</th>
                                <th>Costo</th>
                                <th>Acciones</th>
                            </tr>

                        </thead>

                        <tbody>

                            {shipments.map((shipment) => (
                                <tr key={shipment._id}>
                                    <td>{shipment.trackingCode}</td>

                                    <td>
                                        {editingShipment === shipment._id ? (
                                            <input
                                                name="recipientName"
                                                value={editForm.recipientName}
                                                onChange={handleEditChange}
                                                className="table-input"
                                                required
                                            />
                                        ) : (
                                            shipment.recipientName
                                        )}
                                    </td>

                                    <td>
                                        {editingShipment === shipment._id ? (
                                            <input
                                                name="recipientPhone"
                                                value={editForm.recipientPhone}
                                                onChange={(e) => {
                                                    if (/^[0-9]*$/.test(e.target.value) && e.target.value.length <= 15) {
                                                        handleEditChange(e);
                                                    }
                                                }}
                                                className="table-input"
                                                required
                                            />
                                        ) : (
                                            shipment.recipientPhone
                                        )}
                                    </td>

                                    <td>
                                        {editingShipment === shipment._id ? (
                                            <input
                                                name="destinationAddress"
                                                value={editForm.destinationAddress}
                                                onChange={handleEditChange}
                                                className="table-input"
                                                required
                                            />
                                        ) : (
                                            shipment.destinationAddress
                                        )}
                                    </td>

                                    <td>
                                        {editingShipment === shipment._id ? (
                                            <select
                                                name="region"
                                                value={editForm.region}
                                                onChange={handleEditChange}
                                                className="table-input"
                                                required
                                            >
                                                <option value="Metropolitana">Metropolitana</option>
                                                <option value="Departamental">Departamental</option>
                                                <option value="Internacional">Internacional</option>
                                            </select>
                                        ) : (
                                            shipment.region
                                        )}
                                    </td>

                                    <td>
                                        {editingShipment === shipment._id ? (
                                            <select
                                                name="destinationType"
                                                value={editForm.destinationType}
                                                onChange={handleEditChange}
                                                className="table-input"
                                                required
                                            >
                                                <option value="Nacional">Nacional</option>
                                                <option value="Internacional">Internacional</option>
                                            </select>
                                        ) : (
                                            shipment.destinationType
                                        )}
                                    </td>

                                    <td>
                                        {editingShipment === shipment._id ? (
                                            <input
                                                name="packageDescription"
                                                value={editForm.packageDescription}
                                                onChange={handleEditChange}
                                                className="table-input"
                                                required
                                            />
                                        ) : (
                                            shipment.packageDescription
                                        )}
                                    </td>

                                    <td>
                                        {editingShipment === shipment._id ? (
                                            <input
                                                name="weight"
                                                type="number"
                                                value={editForm.weight}
                                                onChange={handleEditChange}
                                                className="table-input"
                                                required
                                            />
                                        ) : (
                                            `${shipment.weight} kg`
                                        )}
                                    </td>

                                    <td>
                                        {editingShipment === shipment._id ? (
                                            <select
                                                name="serviceType"
                                                value={editForm.serviceType}
                                                onChange={handleEditChange}
                                                className="table-input"
                                                required
                                            >
                                                <option value="Estandar">Estándar</option>
                                                <option value="Expres">Exprés</option>
                                            </select>
                                        ) : (
                                            shipment.serviceType
                                        )}
                                    </td>

                                    <td>
                                        {editingShipment === shipment._id ? (
                                            <div className="table-checks">
                                                <label>
                                                    <input
                                                        type="checkbox"
                                                        name="homePickup"
                                                        checked={editForm.homePickup}
                                                        onChange={handleEditChange}
                                                    />
                                                    Recolección
                                                </label>

                                                <label>
                                                    <input
                                                        type="checkbox"
                                                        name="insurance"
                                                        checked={editForm.insurance}
                                                        onChange={handleEditChange}
                                                    />
                                                    Seguro
                                                </label>
                                            </div>
                                        ) : (
                                            <>
                                                {shipment.homePickup ? 'Recolección ' : ''}
                                                {shipment.insurance ? 'Seguro' : ''}
                                                {!shipment.homePickup && !shipment.insurance ? 'Sin extras' : ''}
                                            </>
                                        )}
                                    </td>

                                    <td>
                                        {editingShipment === shipment._id ? (
                                            <select
                                                name="status"
                                                value={editForm.status}
                                                onChange={handleEditChange}
                                                className="table-input"
                                                required
                                            >
                                                <option value="Pendiente">Pendiente</option>
                                                <option value="En tránsito">En tránsito</option>
                                                <option value="Entregado">Entregado</option>
                                            </select>
                                        ) : (
                                            shipment.status
                                        )}
                                    </td>

                                    <td>Q{editingShipment === shipment._id ? editForm.cost : shipment.cost}</td>

                                    <td>
                                        {editingShipment === shipment._id ? (
                                            <>
                                                <button className="save-button" onClick={() => saveShipment(shipment._id)}>
                                                    Guardar
                                                </button>

                                                <button className="cancel-button" onClick={() => setEditingShipment(null)}>
                                                    Cancelar
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <button className="edit-button" onClick={() => startEdit(shipment)}>
                                                    Editar
                                                </button>

                                                <button className="delete-button" onClick={() => deleteShipment(shipment._id)}>
                                                    Eliminar
                                                </button>
                                            </>
                                        )}
                                    </td>
                                </tr>
                            ))}

                        </tbody>

                    </table>

                </div>

            </main>

        </div>
    );
}


export default AdminShipments;