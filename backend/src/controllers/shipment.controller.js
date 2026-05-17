const Shipment = require('../models/Shipment');

const generateTrackingCode = () => {
  return 'SKY-' + Math.random().toString(36).substring(2, 8).toUpperCase();
};

exports.createShipment = async (req, res) => {
  try {
    const {
      recipientName,
      recipientPhone,
      destinationAddress,
      region,
      destinationType,
      packageDescription,
      weight,
      serviceType,
      homePickup,
      insurance,
      cost
    } = req.body;

    const shipment = new Shipment({
      user: req.user.id,
      trackingCode: generateTrackingCode(),
      recipientName,
      recipientPhone,
      destinationAddress,
      region,
      destinationType,
      packageDescription,
      weight,
      serviceType,
      homePickup,
      insurance,
      cost
    });

    await shipment.save();

    res.status(201).json(shipment);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getMyShipments = async (req, res) => {
  try {
    const shipments = await Shipment.find({ user: req.user.id });

    res.json(shipments);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.trackShipment = async (req, res) => {
  try {
    const shipment = await Shipment.findOne({
      trackingCode: req.params.code
    });

    if (!shipment) {
      return res.status(404).json({ message: 'Envío no encontrado' });
    }

    res.json(shipment);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.trackShipment = async (req, res) => {

  try {

    const shipment = await Shipment.findOne({
      trackingCode: req.params.trackingCode
    });

    if (!shipment) {
      return res.status(404).json({
        error: 'Paquete no encontrado'
      });
    }

    res.json({
      trackingCode: shipment.trackingCode,
      recipientName: shipment.recipientName,
      status: shipment.status,
      region: shipment.region,
      createdAt: shipment.createdAt
    });

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }
};