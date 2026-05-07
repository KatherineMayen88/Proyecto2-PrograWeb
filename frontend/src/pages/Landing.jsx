import fondoInicio from '../assets/fondoInicio.png';
import Navbar from '../components/Navbar';

import aboutImg from '../assets/about.png';
import { useState } from 'react';


function Landing() {
    return (
        <>
            <Navbar />

            {/* ------------------------- INICIO ------------------------- */}
            <section
                className="hero"
                style={{ backgroundImage: `url(${fondoInicio})` }}
            >
                <div className="hero-overlay">

                    <div className="hero-left">
                        <div className="track-card">
                            <h3>Rastrea tu pedido</h3>
                            <p>Consulta el estado de tu paquete usando tu código de guía.</p>
                            <input placeholder="Ej. SKY-ABC123" />
                            <button>Rastrear paquete</button>
                        </div>
                    </div>

                    <div className="hero-right">
                        <span className="tag">¡Envío fácil, entrega rápida!</span>
                        <h1>SkyShip Express</h1>
                        <p>
                            En SkyShip Express, impulsamos tu emprendimiento con soluciones logísticas, innovadoras y eficientes. Registra solicitudes, consulta tus paquetes y administra tus entregas desde una plataforma rapida, segura y pensada para SkyShip Express.
                        </p>
                    </div>

                </div>
            </section>


            {/* ------------------------- SERVICIOS ------------------------- */}
            <section id="services" className="services-section">
                <div className="services-header">
                    <h2 className="services-title">Servicios Skyship</h2>
                    <p className="services-description">
                        Diseñamos soluciones para cada tipo de envio, brindando una experiencia digital
                        para que puedas solicitar, rastrear y administrar tus paquetes de forma rapida,
                        simple y segura.
                    </p>
                </div>

                <div className="services-grid">
                    <div className="service-card">
                        <div className="service-icon">📦</div>
                        <h3 className="service-title">Envios nacionales</h3>
                        <p className="service-text">
                            Entrega de paquetes dentro de Guatemala, con seguimiento y control del estado.
                        </p>
                    </div>

                    <div className="service-card">
                        <div className="service-icon">✈️</div>
                        <h3 className="service-title">Envios internacionales</h3>
                        <p className="service-text">
                            Conecta tus paquetes con destinos fuera del pais de forma segura y confiable.
                        </p>
                    </div>

                    <div className="service-card">
                        <div className="service-icon">🏠</div>
                        <h3 className="service-title">Recoleccion programada</h3>
                        <p className="service-text">
                            Solicita la recoleccion desde tu direccion y evita desplazarte a una sucursal.
                        </p>
                    </div>

                    <div className="service-card">
                        <div className="service-icon">📍</div>
                        <h3 className="service-title">Rastreo digital</h3>
                        <p className="service-text">
                            Consulta el estado de tus envios usando el codigo de guia generado por la plataforma.
                        </p>
                    </div>
                </div>
            </section>

            {/* ------------------------- SOBRE NOSOTROS ------------------------- */}
            <section id="about" className="about-section">
                <div className="about-container">

                    <div
                        className="about-image"
                        style={{ backgroundImage: `url(${aboutImg})` }}
                    ></div>

                    <div className="about-content">
                        <h2 className="about-title">Sobre nosotros</h2>

                        <p className="about-text">
                            SkyShip Express nació en Guatemala con el objetivo de simplificar el envio
                            de paquetes para personas y empresas. Desde el principio operamos con un
                            compromiso claro: rapidez, seguridad y atención personalizada.
                        </p>

                        <div className="about-card">
                            <h4>Misión</h4>
                            <p>Conectar a las personas con soluciones de envio confiables y accesibles.</p>
                        </div>

                        <div className="about-card">
                            <h4>Visión</h4>
                            <p>Ser la empresa de paquetería preferida en Centroamérica.</p>
                        </div>

                        <div className="about-card">
                            <h4>Valores</h4>
                            <p>Confianza · Rapidez · Compromiso · Innovación</p>
                        </div>

                    </div>
                </div>
            </section>


            {/* ------------------------- FAQ ------------------------- */}
            <FAQ />


            {/* ------------------------- CONTACTO ------------------------- */}
            <section id="contact" className="contact-section">
                <div className="contact-header">
                    <h2 className="contact-title">Contáctanos</h2>
                    <p className="contact-description">Escríbenos y respondemos a la brevedad</p>
                </div>

                <div className="contact-container">
                    <div className="contact-info">
                        <div className="contact-info-card">
                            <span>📞</span>
                            <div>
                                <h4>Teléfono</h4>
                                <p>+502 1234-5678</p>
                            </div>
                        </div>

                        <div className="contact-info-card">
                            <span>💬</span>
                            <div>
                                <h4>WhatsApp</h4>
                                <p>+502 1234-5678</p>
                            </div>
                        </div>

                        <div className="contact-info-card">
                            <span>📧</span>
                            <div>
                                <h4>Correo</h4>
                                <p>info@skyship.com</p>
                            </div>
                        </div>

                        <div className="contact-info-card">
                            <span>🕐</span>
                            <div>
                                <h4>Horario</h4>
                                <p>Lunes a viernes | 8:00 - 18:00</p>
                            </div>
                        </div>
                    </div>

                    <form className="contact-form">
                        <label className="contact-label">Nombre completo *</label>
                        <input className="contact-input" placeholder="Ingrese su nombre completo" />

                        <div className="contact-row">
                            <div>
                                <label className="contact-label">Teléfono *</label>
                                <input className="contact-input" placeholder="Ingrese su teléfono" />
                            </div>

                            <div>
                                <label className="contact-label">Correo electrónico *</label>
                                <input className="contact-input" placeholder="Ingrese su correo electrónico" />
                            </div>
                        </div>

                        <label className="contact-label">Mensaje *</label>
                        <textarea className="contact-textarea" placeholder="¿En qué podemos ayudarte?"></textarea>

                        <button type="submit" className="contact-button">Enviar mensaje</button>
                    </form>
                </div>
            </section>
        </>
    );
}
export default Landing;



function FAQ() {
    const [activeIndex, setActiveIndex] = useState(null);

    const faqs = [
        {
            question: "¿Cuánto tarda un envío nacional?",
            answer: "Los envíos nacionales estándar tardan entre 1 y 3 días hábiles. Con servicio exprés, la entrega es en 24 horas."
        },
        {
            question: "¿Cómo puedo rastrear mi paquete?",
            answer: "Puedes rastrear tu paquete contactándonos por WhatsApp o con tu número de guía de paquete."
        },
        {
            question: "¿Qué artículos no puedo enviar?",
            answer: "No se permiten materiales peligrosos, armas, dinero en efectivo, ni artículos ilegales según la legislación guatemalteca."
        },
        {
            question: "¿Tienen seguro contra pérdida?",
            answer: "Sí, ofrecemos seguro opcional contra pérdida y accidentes. Puedes agregarlo al cotizar tu envío."
        },
        {
            question: "¿Hacen recolección a domicilio?",
            answer: "Sí, contamos con servicio de recolección a domicilio con costo adicional. Disponible en área metropolitana y principales ciudades."
        }
    ];

    const toggleFAQ = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <section id="faq" className="faq-section">
            <div className="faq-header">
                <h2 className="faq-title">Preguntas frecuentes</h2>
                <p className="faq-description">Resolvemos tus dudas más comunes</p>
            </div>

            <div className="faq-list">
                {faqs.map((faq, index) => (
                    <div
                        key={index}
                        className={`faq-item ${activeIndex === index ? 'active' : ''}`}
                        onClick={() => toggleFAQ(index)}
                    >
                        <div className="faq-text">
                            <h3>{faq.question}</h3>

                            {activeIndex === index && (
                                <p className="faq-answer">{faq.answer}</p>
                            )}
                        </div>

                        <span className="faq-icon">
                            {activeIndex === index ? '−' : '+'}
                        </span>
                    </div>
                ))}
            </div>
        </section>
    );
}


