import { useEffect, useState } from 'react';
import api from '../api/axios';
import AdminSidebar from '../components/AdminSidebar';

function AdminContacts() {
    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        fetchContacts();
    }, []);

    const fetchContacts = async () => {
        try {
            const response = await api.get('/admin/contacts');
            setContacts(response.data);
        } catch (error) {
            console.error(error);
        }
    };


    const deleteContact = async (id) => {
        const confirmDelete = window.confirm('¿Eliminar mensaje de contacto?');

        if (!confirmDelete) {
            return;
        }

        try {
            await api.delete(`/admin/contacts/${id}`);
            fetchContacts();
            alert('Mensaje de contacto eliminado correctamente');
        } catch (error) {
            alert('Error eliminando mensaje de contacto');
        }
    };

    return (
        <div className="dashboard-page">
            <AdminSidebar />

            <main className="dashboard-content">
                <h1 className="table-title">Mensajes de contacto</h1>

                <div className="table-container">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Teléfono</th>
                                <th>Correo</th>
                                <th>Mensaje</th>
                                <th>Fecha</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>

                        <tbody>
                            {contacts.map((contact) => (
                                <tr key={contact._id}>
                                    <td>{contact.fullName}</td>
                                    <td>{contact.phone}</td>
                                    <td>{contact.email}</td>
                                    <td>{contact.message}</td>
                                    <td>{new Date(contact.createdAt).toLocaleDateString()}</td>
                                    <td> <button className="delete-button"  onClick={() => deleteContact(contact._id)}>  Eliminar </button> </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
}




export default AdminContacts;