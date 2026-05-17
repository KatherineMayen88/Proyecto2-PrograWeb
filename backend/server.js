require('dotenv').config();

const express = require('express');
const cors = require('cors');

const testRoutes = require('./src/routes/test.routes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', testRoutes);

//const PORT = 5000;
const PORT = process.env.PORT || 5000;

const connectDB = require('./src/config/db');
connectDB();


const authRoutes = require('./src/routes/auth.routes');
app.use('/api/auth', authRoutes);


const shipmentRoutes = require('./src/routes/shipment.routes');
app.use('/api/shipments', shipmentRoutes);


const adminRoutes = require('./src/routes/admin.routes');
app.use('/api/admin', adminRoutes);

const contactRoutes = require('./src/routes/contact.routes');
app.use('/api/contact', contactRoutes);


app.get("/", (req, res) => {
  res.send("SkyShip Express Backend funcionando correctamente");
});


app.listen(PORT, () => {
  //console.log(`Servidor corriendo en http://localhost:${PORT}`);
  console.log(`Servidor corriendo en puerto ${PORT}`);
});