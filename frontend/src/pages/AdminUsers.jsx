import { useEffect, useState } from 'react';
import api from '../api/axios';

import AdminSidebar from '../components/AdminSidebar';

import { validateName, validatePhone, validateEmail } from '../utils/validations';


function AdminUsers() {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await api.get('/admin/users');
            setUsers(response.data);
        } catch (error) {
            console.error(error);
        }
    };


    const [editingUser, setEditingUser] = useState(null);

    const [editForm, setEditForm] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        role: 'client',
        password: ''
    });

    const startEdit = (user) => {
        setEditingUser(user._id);

        setEditForm({
            name: user.name || '',
            email: user.email || '',
            phone: user.phone || '',
            address: user.address || '',
            role: user.role || 'client',
            password: ''
        });
    };

    const handleEditChange = (e) => {
        setEditForm({
            ...editForm,
            [e.target.name]: e.target.value
        });
    };

    const saveUser = async (id) => {
        if (
            !editForm.name.trim() ||
            !editForm.email.trim() ||
            !editForm.phone.trim() ||
            !editForm.address.trim() ||
            !editForm.role.trim()
        ) {
            alert('Todos los campos son obligatorios.');
            return;
        }

        if (!validateName(editForm.name)) {
            alert('El nombre solo debe contener letras.');
            return;
        }

        if (!validateEmail(editForm.email)) {
            alert('El correo debe contener @ y terminar en .com.');
            return;
        }

        if (!validatePhone(editForm.phone)) {
            alert('El teléfono debe contener solo números, mínimo 8 y máximo 15 dígitos.');
            return;
        }

        if (editForm.password.trim() && editForm.password.trim().length < 5) {
            alert('La contraseña debe tener al menos 5 caracteres.');
            return;
        }

        try {
            await api.put(`/admin/users/${id}`, editForm);

            setEditingUser(null);
            fetchUsers();

            alert('Usuario actualizado correctamente');
        } catch (error) {
            alert('Error actualizando usuario');
        }
    };

    const deleteUser = async (id) => {
        const confirmDelete = window.confirm('¿Eliminar usuario?');

        if (!confirmDelete) {
            return;
        }

        try {
            await api.delete(`/admin/users/${id}`);
            fetchUsers();
            alert('Usuario eliminado correctamente');
        } catch (error) {
            alert('Error eliminando usuario');
        }
    };

    return (
        <div className="dashboard-page">

            <AdminSidebar />

            <main className="dashboard-content">

                <h1 className="table-title">
                    Usuarios registrados
                </h1>

                <div className="table-container">

                    <table className="admin-table">

                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Correo</th>
                                <th>Teléfono</th>
                                <th>Dirección</th>
                                <th>Contraseña</th>
                                <th>Rol</th>
                                <th>Acciones</th>

                            </tr>
                        </thead>

                        <tbody>

                            {users.map((user) => (

                                <tr key={user._id}>

                                    {/*<td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.phone}</td>
                                    <td>{user.role}</td>*/}

                                    <td>
                                        {editingUser === user._id ? (
                                            <input
                                                name="name"
                                                value={editForm.name}
                                                onChange={handleEditChange}
                                                className="table-input"
                                                required
                                            />
                                        ) : (
                                            user.name
                                        )}
                                    </td>

                                    <td>
                                        {editingUser === user._id ? (
                                            <input
                                                name="email"
                                                value={editForm.email}
                                                onChange={handleEditChange}
                                                className="table-input"
                                                required
                                            />
                                        ) : (
                                            user.email
                                        )}
                                    </td>

                                    <td>
                                        {editingUser === user._id ? (
                                            <input
                                                name="phone"
                                                value={editForm.phone}
                                                onChange={(e) => {
                                                    if (/^[0-9]*$/.test(e.target.value) && e.target.value.length <= 15) {
                                                        handleEditChange(e);
                                                    }
                                                }}
                                                className="table-input"
                                                required
                                            />
                                        ) : (
                                            user.phone
                                        )}
                                    </td>


                                    <td>
                                        {editingUser === user._id ? (
                                            <input
                                                name="address"
                                                value={editForm.address}
                                                onChange={handleEditChange}
                                                className="table-input"
                                                required
                                            />
                                        ) : (
                                            user.address
                                        )}
                                    </td>

                                    <td>
                                        {editingUser === user._id ? (
                                            <input
                                                name="password"
                                                type="password"
                                                value={editForm.password}
                                                onChange={handleEditChange}
                                                className="table-input"
                                                placeholder="Nueva contraseña"
                                            />
                                        ) : (
                                            '********'
                                        )}
                                    </td>

                                    <td>
                                        {editingUser === user._id ? (
                                            <select
                                                name="role"
                                                value={editForm.role}
                                                onChange={handleEditChange}
                                                className="table-input"
                                                required
                                            >
                                                <option value="client">client</option>
                                                <option value="admin">admin</option>
                                            </select>
                                        ) : (
                                            user.role
                                        )}
                                    </td>

                                    <td>
                                        {editingUser === user._id ? (
                                            <>
                                                <button className="save-button" onClick={() => saveUser(user._id)}>
                                                    Guardar
                                                </button>

                                                <button className="cancel-button" onClick={() => setEditingUser(null)}>
                                                    Cancelar
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <button className="edit-button" onClick={() => startEdit(user)}>
                                                    Editar
                                                </button>

                                                <button className="delete-button" onClick={() => deleteUser(user._id)}>
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


export default AdminUsers;