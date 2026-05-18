function ConfirmModal({ message, onConfirm, onCancel }) {
    return (
        <div style={{
            position: 'fixed', inset: 0, zIndex: 9998,
            background: 'rgba(0,0,0,0.45)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '20px',
        }}>
            <div style={{
                background: 'white', borderRadius: '18px',
                padding: '36px 32px', maxWidth: '400px', width: '100%',
                boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
                textAlign: 'center',
            }}>
                <div style={{
                    width: '56px', height: '56px', borderRadius: '50%',
                    background: '#fef2f2', margin: '0 auto 20px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '26px',
                }}>⚠️</div>

                <h3 style={{ margin: '0 0 10px', color: '#2b2463', fontSize: '18px', fontWeight: 900 }}>
                    ¿Estás seguro?
                </h3>
                <p style={{ margin: '0 0 28px', color: '#7a7a8a', fontSize: '14px', lineHeight: 1.5 }}>
                    {message}
                </p>

                <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                    <button onClick={onCancel} style={{
                        flex: 1, padding: '12px', borderRadius: '999px',
                        border: '1.5px solid #d0d0e0', background: 'white',
                        color: '#2b2463', fontWeight: 800, cursor: 'pointer',
                        fontSize: '14px', transition: 'background 0.2s',
                    }}>
                        Cancelar
                    </button>
                    <button onClick={onConfirm} style={{
                        flex: 1, padding: '12px', borderRadius: '999px',
                        border: 'none', background: '#dc2626',
                        color: 'white', fontWeight: 800, cursor: 'pointer',
                        fontSize: '14px', transition: 'background 0.2s',
                    }}>
                        Sí, eliminar
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ConfirmModal;