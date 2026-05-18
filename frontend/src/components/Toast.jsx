import { useEffect, useState } from 'react';

function Toast({ message, type = 'success', onClose }) {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        // Entrada con pequeño delay para activar la animación CSS
        const show = setTimeout(() => setVisible(true), 10);
        const hide = setTimeout(() => {
            setVisible(false);
            setTimeout(onClose, 300);
        }, 3000);
        return () => { clearTimeout(show); clearTimeout(hide); };
    }, []);

    const icons = { success: '✔', error: '✖', warning: '⚠' };
    const colors = {
        success: { bg: '#f0fdf4', border: '#16a34a', icon: '#16a34a', text: '#15803d' },
        error:   { bg: '#fef2f2', border: '#dc2626', icon: '#dc2626', text: '#b91c1c' },
        warning: { bg: '#fffbeb', border: '#d97706', icon: '#d97706', text: '#b45309' },
    };
    const c = colors[type];

    return (
        <div style={{
            position: 'fixed', bottom: '28px', right: '28px',
            zIndex: 9999,
            background: c.bg,
            border: `1.5px solid ${c.border}`,
            borderRadius: '14px',
            padding: '16px 20px',
            minWidth: '280px', maxWidth: '360px',
            boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
            display: 'flex', alignItems: 'flex-start', gap: '12px',
            transform: visible ? 'translateY(0)' : 'translateY(20px)',
            opacity: visible ? 1 : 0,
            transition: 'transform 0.3s ease, opacity 0.3s ease',
        }}>
            <span style={{
                width: '28px', height: '28px', borderRadius: '50%',
                background: c.border, color: 'white',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '14px', fontWeight: 900, flexShrink: 0,
            }}>
                {icons[type]}
            </span>
            <span style={{ color: c.text, fontWeight: 700, fontSize: '14px', lineHeight: 1.5, flex: 1 }}>
                {message}
            </span>
            <button onClick={() => { setVisible(false); setTimeout(onClose, 300); }} style={{
                background: 'none', border: 'none', cursor: 'pointer',
                color: c.text, fontSize: '18px', lineHeight: 1, padding: 0, flexShrink: 0,
            }}>×</button>
        </div>
    );
}

export default Toast;