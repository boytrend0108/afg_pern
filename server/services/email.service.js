import nodemailer from 'nodemailer';
import { google } from 'googleapis';
import 'dotenv/config';

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URL
);

oauth2Client.setCredentials({
  refresh_token: process.env.GOOGLE_REFRESH_DRIVE,
});

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: process.env.SMTP_USER,
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    refreshToken: process.env.GOOGLE_REFRESH_DRIVE_EMAIL,
    accessToken: oauth2Client.getAccessToken(),
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

const sendReserveEmail = (data) => {
  const { userInfo, product } = data;

  const html = `
  <h1>Booking machine ${product.title}</h1>
    <div>
      <h2>User Info</h2>

      <ul>
        <li>Name: ${userInfo.name}</li>
        <li>Phone: ${userInfo.phone}</li>
        <li>Email: ${userInfo.email}</li>
        <li>City: ${userInfo.city}</li>
        <li>Coutry: ${userInfo.country}</li>
        <li>Company: ${userInfo.company}</li>
        <li>Address: ${userInfo.address}</li>
      </ul>
    </div>

    <div>
      <h2>Machine Info</h2>

      <ul>
        <li>Title: ${product.title}</li>
        <li>Brand: ${product.brand} </li>
        <li>Category: ${product.category}</li>
        <li>Id: ${product.id}</li>
      </ul>
      
      Product link: https://afg-machinery.com/product/${product.id}/tab=general
    </div>
  `;

  return send({
    email: process.env.COMPANY_EMAIL,
    subject: 'Booking a machine',
    html,
  });
};

const sendRequestEmail = (userInfo) => {
  const html = `
  <h1>New request from ${userInfo.name}</h1>
    <div>
      <h2>User Info</h2>

      <ul>
        <li>Name: ${userInfo.name}</li>
        <li>Phone: ${userInfo.phone}</li>
        <li>Email: ${userInfo.email}</li>
        <li>City: ${userInfo.city}</li>
        <li>Coutry: ${userInfo.country}</li>
        <li>Company: ${userInfo.company}</li>
        <li>Address: ${userInfo.address}</li>
      </ul>
    </div>
  `;

  return send({
    email: process.env.COMPANY_EMAIL,
    subject: 'New request',
    html,
  });
};

export const emailService = {
  send,
  sendActivationEmail,
  sendReserveEmail,
  sendRequestEmail,
};
