// Script de prueba para enviar un correo usando las variables de entorno
// Ejecutar: node scripts/send_test_email.js

require('dotenv').config();
const nodemailer = require('nodemailer');

(async () => {
  try {
    const {
      EMAIL_HOST,
      EMAIL_PORT,
      EMAIL_SECURE,
      EMAIL_USER,
      EMAIL_PASSWORD,
      EMAIL_FROM,
      NEXT_PUBLIC_BASE_URL,
    } = process.env;

    if (!EMAIL_USER || !EMAIL_PASSWORD) {
      console.error('ERROR: Las variables EMAIL_USER o EMAIL_PASSWORD no están configuradas en .env');
      process.exit(1);
    }

    const transporter = nodemailer.createTransport({
      host: EMAIL_HOST || 'smtp.gmail.com',
      port: EMAIL_PORT ? parseInt(EMAIL_PORT, 10) : 587,
      secure: EMAIL_SECURE === 'true',
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASSWORD,
      },
    });

    await transporter.verify();

    const to = EMAIL_USER; // enviar a la cuenta configurada
    const info = await transporter.sendMail({
      from: EMAIL_FROM || EMAIL_USER,
      to,
      subject: 'Prueba de correo - Cuenta en Línea',
      text: `Este es un correo de prueba desde ${NEXT_PUBLIC_BASE_URL || 'tu aplicación'}`,
      html: `<p>Este es un correo de prueba desde <strong>${NEXT_PUBLIC_BASE_URL || 'tu aplicación'}</strong></p>`,
    });

    process.exit(0);
  } catch (err) {
    console.error('Error al enviar el correo:', err);
    process.exit(2);
  }
})();
