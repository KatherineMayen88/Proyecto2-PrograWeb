import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/axios';
import { validateName, validatePhone, validateEmail } from '../utils/validations';
import Toast from '../components/Toast';
import useToast from '../utils/useToast';

function Register() {
    const navigate = useNavigate();
    const { toast, showToast, hideToast } = useToast();

    const [formData, setFormData] = useState({
        name: '', email: '', phone: '', address: '', password: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Solo números, máximo 15 dígitos — bloqueado en el input
    const handlePhoneChange = (e) => {
        const value = e.target.value;
        if (/^\d*$/.test(value) && value.length <= 15) {
            setFormData({ ...formData, phone: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateName(formData.name)) {
            showToast('El nombre completo solo debe contener letras.', 'error');
            return;
        }
        if (formData.phone.length < 8) {
            showToast('El teléfono debe tener mínimo 8 dígitos.', 'error');
            return;
        }
        if (!validatePhone(formData.phone)) {
            showToast('El teléfono solo debe contener números (8–15 dígitos).', 'error');
            return;
        }
        if (!validateEmail(formData.email)) {
            showToast('El correo debe contener @ y terminar en .com.', 'error');
            return;
        }

        try {
            await api.post('/auth/register', formData);
            showToast('¡Cuenta creada correctamente!', 'success');
            setTimeout(() => navigate('/login'), 1800);
        } catch (error) {
            showToast('Error al crear la cuenta. Intenta de nuevo.', 'error');
        }
    };

    return (
        <div className="auth-page">
            {toast && <Toast key={toast.id} message={toast.message} type={toast.type} onClose={hideToast} />}

            <div className="auth-overlay">
                <form className="auth-form" onSubmit={handleSubmit}>
                    <h1 className="auth-title">Crear cuenta</h1>
                    <p className="auth-subtitle">Regístrate en SkyShip Express</p>

                    <input type="text" name="name" required placeholder="Nombre completo" className="auth-input" onChange={handleChange} />
                    <input type="email" name="email" required placeholder="Correo electrónico" className="auth-input" onChange={handleChange} />
                    <input
                        type="text" name="phone" required
                        placeholder="Teléfono (8–15 dígitos)"
                        className="auth-input"
                        value={formData.phone}
                        onChange={handlePhoneChange}
                    />
                    <input type="text" name="address" required placeholder="Dirección" className="auth-input" onChange={handleChange} />
                    <input type="password" name="password" required placeholder="Contraseña" className="auth-input" onChange={handleChange} />

                    <button type="submit" className="auth-button">Registrarme</button>

                    <p className="auth-footer">
                        ¿Ya tienes cuenta? <Link to="/login">Iniciar sesión</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default Register;