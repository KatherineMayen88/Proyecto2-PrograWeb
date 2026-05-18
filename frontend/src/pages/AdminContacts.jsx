import { useEffect, useState } from 'react';
import api from '../api/axios';
import AdminSidebar from '../components/AdminSidebar';
import Toast from '../components/Toast';
import ConfirmModal from '../components/ConfirmModal';
import useToast from '../utils/useToast';

function AdminContacts() {
    const [contacts, setContacts] = useState([]);
    const { toast, showToast, hideToast } = useToast();
    const [confirm, setConfirm] = useState(null);

    useEffect(() => { fetchContacts(); }, []);

    const fetchContacts = async () => {
        try { const r = await api.get('/admin/contacts'); setContacts(r.data); }
        catch (e) { console.error(e); }
    };

    const deleteContact = (id) => {
        setConfirm({
            message: 'Esta acción eliminará el mensaje de contacto permanentemente.',
            onConfirm: async () => {
                setConfirm(null);
                try { await api.delete(`/admin/contacts/${id}`); fetchContacts(); showToast('Mensaje eliminado correctamente.', 'success'); }
                catch { showToast('Error eliminando mensaje.', 'error'); }
            }
        });
    };

    return (
        <div className="dashboard-page">
            {toast && <Toast key={toast.id} message={toast.message} type={toast.type} onClose={hideToast} />}
            {confirm && <ConfirmModal message={confirm.message} onConfirm={confirm.onConfirm} onCancel={() => setConfirm(null)} />}
            <AdminSidebar />
            <main className="dashboard-content">
                <h1 className="table-title">Mensajes de contacto</h1>
                <div className="table-container">
                    <table className="admin-table">
                        <thead>
                            <tr><th>Nombre</th><th>Teléfono</th><th>Correo</th><th>Mensaje</th><th>Fecha</th><th>Acciones</th></tr>
                        </thead>
                        <tbody>
                            {contacts.map((contact) => (
                                <tr key={contact._id}>
                                    <td>{contact.fullName}</td>
                                    <td>{contact.phone}</td>
                                    <td>{contact.email}</td>
                                    <td>{contact.message}</td>
                                    <td>{new Date(contact.createdAt).toLocaleDateString()}</td>
                                    <td><button className="delete-button" onClick={() => deleteContact(contact._id)}>Eliminar</button></td>
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