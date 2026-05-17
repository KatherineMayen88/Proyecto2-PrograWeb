const mongoose = require('mongoose');

const shipmentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  trackingCode: {
    type: String,
    unique: true
  },
  recipientName: String,
  recipientPhone: String,
  destinationAddress: String,
  region: String,
  destinationType: {
    type: String,
    enum: ['Nacional', 'Internacional']
  },
  packageDescription: String,
  weight: Number,
  serviceType: {
    type: String,
    enum: ['Estandar', 'Expres']
  },
  homePickup: {
    type: Boolean,
    default: false
  },
  insurance: {
    type: Boolean,
    default: false
  },
  status: {
    type: String,
    enum: ['Pendiente', 'En tránsito', 'Entregado'],
    default: 'Pendiente'
  },
  cost: Number
}, {
  timestamps: true
});

module.exports = mongoose.model('Shipment', shipmentSchema);