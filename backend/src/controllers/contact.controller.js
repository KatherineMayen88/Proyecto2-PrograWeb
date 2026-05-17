const Contact = require('../models/Contact');

exports.createContact = async (req, res) => {
    try {
        const { fullName, phone, email, message } = req.body;

        if (!fullName || !phone || !email || !message) {
            return res.status(400).json({
                message: 'Todos los campos son obligatorios'
            });
        }

        const contact = new Contact({
            fullName,
            phone,
            email,
            message
        });

        await contact.save();

        res.status(201).json({
            message: 'Mensaje enviado correctamente',
            contact
        });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};