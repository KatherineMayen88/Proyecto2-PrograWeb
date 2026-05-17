const User = require('../models/User');
const Shipment = require('../models/Shipment');

const bcrypt = require('bcryptjs');

const Contact = require('../models/Contact');

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { name, email, phone, address, role, password } = req.body;

    if (!name || !email || !phone || !address || !role) {
      return res.status(400).json({
        message: 'Todos los campos son obligatorios'
      });
    }

    const updateData = {
      name,
      email,
      phone,
      address,
      role
    };

    if (password && password.trim() !== '') {
      updateData.password = await bcrypt.hash(password, 10);
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    ).select('-password');

    res.json(user);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getShipments = async (req, res) => {
  try {
    const shipments = await Shipment.find().populate('user', 'name email');
    res.json(shipments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateShipment = async (req, res) => {
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
      status,
      cost
    } = req.body;

    if (
      !recipientName ||
      !recipientPhone ||
      !destinationAddress ||
      !region ||
      !destinationType ||
      !packageDescription ||
      !weight ||
      !serviceType ||
      !status ||
      cost === undefined
    ) {
      return res.status(400).json({
        message: 'Todos los campos son obligatorios'
      });
    }

    const shipment = await Shipment.findByIdAndUpdate(
      req.params.id,
      {
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
        status,
        cost
      },
      { new: true }
    );

    res.json(shipment);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteShipment = async (req, res) => {
  try {
    await Shipment.findByIdAndDelete(req.params.id);
    res.json({ message: 'Envío eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getDashboard = async (req, res) => {
  try {
    const totalShipments = await Shipment.countDocuments();

    const shipmentsByStatus = await Shipment.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    res.json({
      totalShipments,
      shipmentsByStatus
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({});
    const totalShipments = await Shipment.countDocuments({});
    const pendingShipments = await Shipment.countDocuments({ status: 'Pendiente' });
    const deliveredShipments = await Shipment.countDocuments({ status: 'Entregado' });

    res.json({
      totalUsers,
      totalShipments,
      pendingShipments,
      deliveredShipments
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({});
    const totalShipments = await Shipment.countDocuments({});
    const pendingShipments = await Shipment.countDocuments({ status: 'Pendiente' });
    const deliveredShipments = await Shipment.countDocuments({ status: 'Entregado' });

    const averageWeightResult = await Shipment.aggregate([
      {
        $group: {
          _id: null,
          averageWeight: { $avg: '$weight' }
        }
      }
    ]);

    const shipmentsByRegion = await Shipment.aggregate([
      {
        $group: {
          _id: '$region',
          count: { $sum: 1 }
        }
      },
      {
        $sort: { count: -1 }
      }
    ]);

    const shipmentsByStatus = await Shipment.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    const shipmentsByDay = await Shipment.aggregate([
      {
        $group: {
          _id: {
            $dateToString: {
              format: '%Y-%m-%d',
              date: '$createdAt'
            }
          },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { _id: 1 }
      }
    ]);

    const frequentClients = await Shipment.aggregate([
      {
        $group: {
          _id: '$user',
          count: { $sum: 1 }
        }
      },
      {
        $sort: { count: -1 }
      },
      {
        $limit: 5
      },
      {
        $lookup: {
          from: 'users',
          localField: '_id',
          foreignField: '_id',
          as: 'user'
        }
      },
      {
        $unwind: '$user'
      },
      {
        $project: {
          _id: 0,
          name: '$user.name',
          email: '$user.email',
          count: 1
        }
      }
    ]);

    const busiestDay = shipmentsByDay.reduce((max, current) => {
      return current.count > max.count ? current : max;
    }, { _id: 'Sin datos', count: 0 });

    const mostCommonRegion = shipmentsByRegion[0] || {
      _id: 'Sin datos',
      count: 0
    };

    const shipmentsByMonth = await Shipment.aggregate([
      {
        $group: {
          _id: {
            $dateToString: {
              format: '%Y-%m',
              date: '$createdAt'
            }
          },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { _id: 1 }
      }
    ]);

    res.json({
      totalUsers,
      totalShipments,
      pendingShipments,
      deliveredShipments,
      averageWeight: averageWeightResult[0]?.averageWeight || 0,
      busiestDay,
      mostCommonRegion,
      shipmentsByRegion,
      shipmentsByStatus,
      shipmentsByDay,
      shipmentsByMonth,
      frequentClients
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);

    res.json({
      message: 'Usuario eliminado correctamente'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.deleteContact = async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);

    res.json({
      message: 'Mensaje eliminado correctamente'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};