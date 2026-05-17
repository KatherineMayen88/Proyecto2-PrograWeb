import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/axios';

import { validateName, validatePhone, validateEmail } from '../utils/validations';


function Register() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
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

        if (!validateName(formData.name)) {
            alert('El nombre completo solo debe contener letras.');
            return;
        }

        if (!validatePhone(formData.phone)) {
            alert('El teléfono solo debe contener números y máximo 15 dígitos.');
            return;
        }

        if (!validateEmail(formData.email)) {
            alert('El correo debe contener @ y terminar en .com.');
            return;
        }

        try {
            await api.post('/auth/register', formData);

            alert('Cuenta creada correctamente');

            navigate('/login');

        } catch (error) {

            alert('Error creando cuenta');

        }
    };

    return (
        <div className="auth-page">

            <div className="auth-overlay">

                <form className="auth-form" onSubmit={handleSubmit}>

                    <h1 className="auth-title">
                        Crear cuenta
                    </h1>

                    <p className="auth-subtitle">
                        Regístrate en SkyShip Express
                    </p>

                    <input
                        type="text"
                        name="name"
                        required
                        placeholder="Nombre completo"
                        className="auth-input"
                        onChange={handleChange}
                    />

                    <input
                        type="email"
                        name="email"
                        required
                        placeholder="Correo electrónico"
                        className="auth-input"
                        onChange={handleChange}
                    />

                    <input
                        type="text"
                        name="phone"
                        required
                        placeholder="Teléfono"
                        className="auth-input"
                        //onChange={handleChange}
                        onChange={(e) => {
                            const value = e.target.value;

                            if (/^[0-9]*$/.test(value) && value.length <= 15) {
                                handleChange(e);
                            }
                        }}
                    />

                    <input
                        type="text"
                        name="address"
                        required
                        placeholder="Dirección"
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
                        Registrarme
                    </button>

                    <p className="auth-footer">
                        ¿Ya tienes cuenta?
                        <Link to="/login">
                            Iniciar sesión
                        </Link>
                    </p>

                </form>

            </div>

        </div>
    );
}

export default Register;