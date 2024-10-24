require('dotenv').config()
const express = require('express')
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express()

const corsOptions = {
  origin: 'https://www.botongsign.com',  
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true, // Permitir cookies
  };
  
app.use(cors(corsOptions));
app.use(bodyParser.json());


// Configuración del transportador de Nodemailer
const transporter = nodemailer.createTransport({
    host: 'smtp.dondominio.com', 
    port: 465,
    secure: true,
    auth: {
      user: process.env.NODemailer_USER, 
      pass: process.env.NODemailer_PASS,
    },
  });
  
  app.post('/api/send-email', (req, res, next) => { 

    const { name, email, phone, message } = req.body;
  
    const mailOptions = {
      from: 'contacto@botongsign.com',
      to: 'contacto@botongsign.com', 
      subject: `Nueva consulta de ${name}`,
      text: `
        Nombre: ${name}
        Correo: ${email}
        Teléfono: ${phone}
        Mensaje: ${message}
      `,
      replyTo: email
    };
  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          console.error('Error al enviar el correo. Vuelve a intentarlo más tarde.', error); 
        return res.status(500).send(error.toString());
    
      }
      res.status(200).send({ message: 'Tu correo se ha enviado. Gracias por contactar.' });
    });
  

  });

module.exports = app;
