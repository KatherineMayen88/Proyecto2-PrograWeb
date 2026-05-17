const express = require('express');
const router = express.Router();

const { protect, adminOnly } = require('../middlewares/auth.middleware');

router.get('/test', (req, res) => {
  res.json({ message: 'Ruta de prueba funcionando' });
});

router.get('/profile', protect, (req, res) => {
  res.json({
    message: 'Ruta protegida funcionando',
    user: req.user
  });
});

router.get('/admin-test', protect, adminOnly, (req, res) => {
  res.json({
    message: 'Ruta exclusiva de administrador funcionando'
  });
});

module.exports = router;