import nodemailer from 'nodemailer';

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

// Configurar transporte de correo (ajusta según tu proveedor)
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT || '587'),
  secure: process.env.EMAIL_SECURE === 'true', // true para 465, false para otros
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export async function sendEmail(options: EmailOptions): Promise<boolean> {
  try {
    // Si no está configurado el correo, solo loguea en desarrollo
    if (!process.env.EMAIL_USER) {
      return true;
    }

    await transporter.sendMail({
      from: process.env.EMAIL_FROM || 'noreply@cuentalinea.com',
      to: options.to,
      subject: options.subject,
      html: options.html,
      text: options.text,
    });

    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
}

export function getVerificationEmailTemplate(userName: string, verificationLink: string): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #4CAF50; color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; background-color: #f9f9f9; }
          .button { display: inline-block; padding: 10px 20px; background-color: #4CAF50; color: white; text-decoration: none; border-radius: 4px; }
          .footer { text-align: center; padding: 20px; font-size: 12px; color: #666; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Bienvenido a Cuenta en Línea</h1>
          </div>
          <div class="content">
            <p>Hola ${userName},</p>
            <p>Gracias por registrarte. Para completar tu registro y verificar tu correo, haz clic en el siguiente botón:</p>
            <p style="text-align: center;">
              <a href="${verificationLink}" class="button">Verificar Email</a>
            </p>
            <p>O copia y pega este enlace en tu navegador:</p>
            <p><small>${verificationLink}</small></p>
            <p>Este enlace expira en 24 horas.</p>
          </div>
          <div class="footer">
            <p>Si no solicitaste esta cuenta, puedes ignorar este correo.</p>
          </div>
        </div>
      </body>
    </html>
  `;
}

export function getResetPasswordEmailTemplate(userName: string, resetLink: string): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #2196F3; color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; background-color: #f9f9f9; }
          .button { display: inline-block; padding: 10px 20px; background-color: #2196F3; color: white; text-decoration: none; border-radius: 4px; }
          .footer { text-align: center; padding: 20px; font-size: 12px; color: #666; }
          .warning { color: #d32f2f; font-weight: bold; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Restablecer Contraseña</h1>
          </div>
          <div class="content">
            <p>Hola ${userName},</p>
            <p>Recibimos una solicitud para restablecer tu contraseña. Si no fue solicitud tuya, ignora este correo y tu contraseña seguirá siendo la misma.</p>
            <p class="warning">⚠️ Este enlace es válido solo por 1 hora.</p>
            <p style="text-align: center;">
              <a href="${resetLink}" class="button">Restablecer Contraseña</a>
            </p>
            <p>O copia y pega este enlace en tu navegador:</p>
            <p><small>${resetLink}</small></p>
          </div>
          <div class="footer">
            <p>Por razones de seguridad, nunca solicites tu contraseña por correo.</p>
          </div>
        </div>
      </body>
    </html>
  `;
}

export function getWelcomeEmailTemplate(userName: string): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #4CAF50; color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; background-color: #f9f9f9; }
          .footer { text-align: center; padding: 20px; font-size: 12px; color: #666; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>¡Cuenta Creada Exitosamente!</h1>
          </div>
          <div class="content">
            <p>Hola ${userName},</p>
            <p>Tu cuenta en Cuenta en Línea ha sido creada exitosamente.</p>
            <p>Ya puedes acceder a todos nuestros servicios con tu usuario y contraseña.</p>
            <p>Si tienes preguntas, no dudes en contactarnos.</p>
          </div>
          <div class="footer">
            <p>© 2026 Cuenta en Línea. Todos los derechos reservados.</p>
          </div>
        </div>
      </body>
    </html>
  `;
}
