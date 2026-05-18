import { useEffect, useState } from 'react';
import api from '../api/axios';
import AdminSidebar from '../components/AdminSidebar';
import Toast from '../components/Toast';
import ConfirmModal from '../components/ConfirmModal';
import useToast from '../utils/useToast';
import { validateName, validatePhone, validateEmail } from '../utils/validations';

function AdminUsers() {
    const [users, setUsers] = useState([]);
    const { toast, showToast, hideToast } = useToast();
    const [confirm, setConfirm] = useState(null); // { message, onConfirm }

    useEffect(() => { fetchUsers(); }, []);

    const fetchUsers = async () => {
        try { const r = await api.get('/admin/users'); setUsers(r.data); }
        catch (e) { console.error(e); }
    };

    const [editingUser, setEditingUser] = useState(null);
    const [editForm, setEditForm] = useState({ name: '', email: '', phone: '', address: '', role: 'client', password: '' });

    const startEdit = (user) => {
        setEditingUser(user._id);
        setEditForm({ name: user.name || '', email: user.email || '', phone: user.phone || '', address: user.address || '', role: user.role || 'client', password: '' });
    };

    const handleEditChange = (e) => setEditForm({ ...editForm, [e.target.name]: e.target.value });

    const saveUser = async (id) => {
        if (!editForm.name.trim() || !editForm.email.trim() || !editForm.phone.trim() || !editForm.address.trim() || !editForm.role.trim()) {
            showToast('Todos los campos son obligatorios.', 'error'); return;
        }
        if (!validateName(editForm.name)) { showToast('El nombre solo debe contener letras.', 'error'); return; }
        if (!validateEmail(editForm.email)) { showToast('El correo debe contener @ y terminar en .com.', 'error'); return; }
        if (!validatePhone(editForm.phone)) { showToast('El teléfono debe contener solo números (8–15 dígitos).', 'error'); return; }
        if (editForm.password.trim() && editForm.password.trim().length < 5) { showToast('La contraseña debe tener al menos 5 caracteres.', 'error'); return; }
        try {
            await api.put(`/admin/users/${id}`, editForm);
            setEditingUser(null);
            fetchUsers();
            showToast('Usuario actualizado correctamente.', 'success');
        } catch { showToast('Error actualizando usuario.', 'error'); }
    };

    const deleteUser = (id) => {
        setConfirm({
            message: 'Esta acción eliminará al usuario permanentemente.',
            onConfirm: async () => {
                setConfirm(null);
                try { await api.delete(`/admin/users/${id}`); fetchUsers(); showToast('Usuario eliminado correctamente.', 'success'); }
                catch { showToast('Error eliminando usuario.', 'error'); }
            }
        });
    };

    return (
        <div className="dashboard-page">
            {toast && <Toast key={toast.id} message={toast.message} type={toast.type} onClose={hideToast} />}
            {confirm && <ConfirmModal message={confirm.message} onConfirm={confirm.onConfirm} onCancel={() => setConfirm(null)} />}
            <AdminSidebar />
            <main className="dashboard-content">
                <h1 className="table-title">Usuarios registrados</h1>
                <div className="table-container">
                    <table className="admin-table">
                        <thead>
                            <tr><th>Nombre</th><th>Correo</th><th>Teléfono</th><th>Dirección</th><th>Contraseña</th><th>Rol</th><th>Acciones</th></tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user._id}>
                                    <td>{editingUser === user._id ? <input name="name" value={editForm.name} onChange={handleEditChange} className="table-input" /> : user.name}</td>
                                    <td>{editingUser === user._id ? <input name="email" value={editForm.email} onChange={handleEditChange} className="table-input" /> : user.email}</td>
                                    <td>{editingUser === user._id ? <input name="phone" value={editForm.phone} onChange={(e) => { if (/^[0-9]*$/.test(e.target.value) && e.target.value.length <= 15) handleEditChange(e); }} className="table-input" /> : user.phone}</td>
                                    <td>{editingUser === user._id ? <input name="address" value={editForm.address} onChange={handleEditChange} className="table-input" /> : user.address}</td>
                                    <td>{editingUser === user._id ? <input name="password" type="password" value={editForm.password} onChange={handleEditChange} className="table-input" placeholder="Nueva contraseña" /> : '********'}</td>
                                    <td>{editingUser === user._id ? <select name="role" value={editForm.role} onChange={handleEditChange} className="table-input"><option value="client">client</option><option value="admin">admin</option></select> : user.role}</td>
                                    <td>
                                        {editingUser === user._id ? (
                                            <><button className="save-button" onClick={() => saveUser(user._id)}>Guardar</button><button className="cancel-button" onClick={() => setEditingUser(null)}>Cancelar</button></>
                                        ) : (
                                            <><button className="edit-button" onClick={() => startEdit(user)}>Editar</button><button className="delete-button" onClick={() => deleteUser(user._id)}>Eliminar</button></>
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

export default AdminUsers;