import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/axios';
import { validateEmail } from '../utils/validations';
import Toast from '../components/Toast';
import useToast from '../utils/useToast';

function Login() {
    const navigate = useNavigate();
    const { toast, showToast, hideToast } = useToast();

    const [formData, setFormData] = useState({ email: '', password: '' });

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateEmail(formData.email)) {
            showToast('El correo debe contener @ y terminar en .com.', 'error');
            return;
        }
        if (!formData.password.trim()) {
            showToast('Ingrese su contraseña.', 'error');
            return;
        }

        try {
            const response = await api.post('/auth/login', formData);
            localStorage.setItem('token', response.data.token);
            const payload = JSON.parse(atob(response.data.token.split('.')[1]));
            localStorage.setItem('role', payload.role);

            showToast('¡Bienvenido de vuelta!', 'success');
            setTimeout(() => {
                navigate(payload.role === 'admin' ? '/admin' : '/dashboard');
            }, 1200);
        } catch (error) {
            showToast('Credenciales inválidas. Verifica tu correo y contraseña.', 'error');
        }
    };

    return (
        <div className="auth-page">
            {toast && <Toast key={toast.id} message={toast.message} type={toast.type} onClose={hideToast} />}

            <div className="auth-overlay">
                <form className="auth-form" onSubmit={handleSubmit}>
                    <h1 className="auth-title">Iniciar sesión</h1>
                    <p className="auth-subtitle">Accede a tu cuenta de SkyShip Express</p>

                    <input type="email" name="email" required placeholder="Correo electrónico" className="auth-input" onChange={handleChange} />
                    <input type="password" name="password" required placeholder="Contraseña" className="auth-input" onChange={handleChange} />

                    <button type="submit" className="auth-button">Ingresar</button>
                    <button type="button" className="auth-secondary-button" onClick={() => navigate('/')}>Volver al portal principal</button>

                    <p className="auth-footer">¿No tienes cuenta? <Link to="/register">Crear cuenta</Link></p>
                </form>
            </div>
        </div>
    );
}

export default Login;