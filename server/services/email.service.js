import nodemailer from 'nodemailer';
import 'dotenv/config';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

async function send({ email, subject, html }) {
  const info = await transporter.sendMail({
    from: 'AFG-Machinery: <afg.machin@gmail.com>',
    to: email,
    subject,
    html,
  });
}

const sendActivationEmail = ({ email, token }) => {
  const href = `${process.env.CLIENT_HOST}/activate/${token}`;
  const html = `
  <h1>Activate account for afg-machinery.com</h1>
  <a href=${href}>${href}</a>
  `;

  return send({ email, subject: 'Activate account AFG-Machinery', html });
};

export const emailService = {
  sendActivationEmail,
  send,
};
