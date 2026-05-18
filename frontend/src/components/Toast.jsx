import { useEffect, useState } from 'react';

function Toast({ message, type = 'success', onClose }) {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false);
            setTimeout(onClose, 300);
        }, 3500);
        return () => clearTimeout(timer);
    }, []);

    const colors = {
        success: { bg: '#f0fdf4', border: '#16a34a', icon: '✔', iconBg: '#16a34a', text: '#15803d' },
        error:   { bg: '#fef2f2', border: '#dc2626', icon: '✖', iconBg: '#dc2626', text: '#b91c1c' },
        warning: { bg: '#fffbeb', border: '#d97706', icon: '⚠', iconBg: '#d97706', text: '#b45309' },
    };
    const c = colors[type] || colors.success;

    return (
        <div style={{
            position: 'fixed',
            bottom: '32px',
            right: '32px',
            zIndex: 99999,
            background: c.bg,
            border: `2px solid ${c.border}`,
            borderRadius: '14px',
            padding: '16px 20px',
            minWidth: '300px',
            maxWidth: '380px',
            boxShadow: '0 12px 40px rgba(0,0,0,0.18)',
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(16px)',
            transition: 'opacity 0.3s ease, transform 0.3s ease',
            pointerEvents: 'all',
        }}>
            <div style={{
                width: '32px', height: '32px', borderRadius: '50%',
                background: c.iconBg, color: 'white',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '15px', fontWeight: 900, flexShrink: 0,
            }}>
                {c.icon}
            </div>

            <span style={{
                color: c.text, fontWeight: 700,
                fontSize: '14px', lineHeight: 1.5, flex: 1,
            }}>
                {message}
            </span>

            <button
                onClick={() => { setVisible(false); setTimeout(onClose, 300); }}
                style={{
                    background: 'none', border: 'none', cursor: 'pointer',
                    color: c.text, fontSize: '20px', lineHeight: 1,
                    padding: '0 0 0 8px', flexShrink: 0, fontWeight: 700,
                }}
            >
                ×
            </button>
        </div>
    );
}

export default Toast;