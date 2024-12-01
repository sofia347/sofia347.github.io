const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();

// Middleware para procesar JSON
app.use(bodyParser.json());

// Ruta para enviar el correo
app.post('/send-invoice', async (req, res) => {
    const { email, pdfBase64 } = req.body;

    // Configuración de Nodemailer
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'kass.accesories@gmail.com', // Reemplaza con tu correo
            pass: 'hgruabgpzykpldmz', // Reemplaza con tu contraseña de aplicación
        },
    });

    // Opciones del correo
    const mailOptions = {
        from: 'kass.accesories@gmail.com',
        to: email,
        subject: 'Tu Factura de Compra',
        text: 'Gracias por tu compra. Adjuntamos tu factura.',
        attachments: [
            {
                filename: 'factura.pdf',
                content: Buffer.from(pdfBase64, 'base64'),
                contentType: 'application/pdf',
            },
        ],
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).send('Correo enviado exitosamente.');
    } catch (error) {
        console.error('Error al enviar el correo:', error);
        res.status(500).send('Error al enviar el correo.');
    }
});

// Iniciar el servidor
app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});

const cors = require('cors');
app.use(cors());
