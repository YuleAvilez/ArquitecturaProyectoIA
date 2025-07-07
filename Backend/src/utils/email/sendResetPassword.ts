// src/utils/email/sendResetPasswordEmail.ts
import { transporter } from '../../utils/email/nodemailerconfig';

export const sendResetPasswordEmail = async (to: string, token: string) => {
  const resetLink = `http://localhost:5173/reset-password/${token}`;

  await transporter.sendMail({
    from: `"Proyecto IA" <${process.env.EMAIL_USER}>`,
    to,
    subject: 'Restablece tu contraseña',
    html: `
      <h3>Hola,</h3>
      <p>Haz clic en el siguiente enlace para restablecer tu contraseña:</p>
      <a href="${resetLink}" target="_blank">${resetLink}</a>
      <p>Este enlace expirará en 15 minutos.</p>
    `,
  });
};
