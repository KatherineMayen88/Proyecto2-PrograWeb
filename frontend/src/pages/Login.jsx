import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/axios';

import { validateEmail } from '../utils/validations';

function Login() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateEmail(formData.email)) {
            alert('El correo debe contener @ y terminar en .com.');
            return;
        }

        if (!formData.password.trim()) {
            alert('Ingrese su contraseña.');
            return;
        }

        try {

            const response = await api.post('/auth/login', formData);

            // GUARDA USER EN LOGIN ---
            //localStorage.setItem('token', response.data.token);
            localStorage.setItem('token', response.data.token);

            const payload = JSON.parse(
                atob(response.data.token.split('.')[1])
            );

            localStorage.setItem('role', payload.role);


            //navigate('/dashboard');
            if (payload.role === 'admin') {
                navigate('/admin');
            } else {
                navigate('/dashboard');
            }

        } catch (error) {

            alert('Credenciales inválidas');

        }
    };

    return (
        <div className="auth-page">

            <div className="auth-overlay">

                <form className="auth-form" onSubmit={handleSubmit}>

                    <h1 className="auth-title">
                        Iniciar sesión
                    </h1>

                    <p className="auth-subtitle">
                        Accede a tu cuenta de SkyShip Express
                    </p>

                    <input
                        type="email"
                        name="email"
                        required
                        placeholder="Correo electrónico"
                        className="auth-input"
                        onChange={handleChange}
                    />

                    <input
                        type="password"
                        name="password"
                        required
                        placeholder="Contraseña"
                        className="auth-input"
                        onChange={handleChange}
                    />

                    <button type="submit" className="auth-button">
                        Ingresar
                    </button>

                    <button
                        type="button"
                        className="auth-secondary-button"
                        onClick={() => navigate('/')}
                    >
                        Volver al portal principal
                    </button>

                    
                    <p className="auth-footer">
                        ¿No tienes cuenta?
                        <Link to="/register">
                            Crear cuenta
                        </Link>
                    </p>

                </form>

            </div>

        </div>
    );
}

export default Login;