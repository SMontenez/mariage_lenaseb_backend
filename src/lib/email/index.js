const nodemailer = require('nodemailer');

const contents = require('./contents');
const config = require('../../config');

const EMAIL_SUBJECT_BASE = 'MARIAGE';

const SMTP_CONFIG = {
  host: config.email.smtp.host,
  port: 465,
  secure: true,
  auth: {
    user: config.email.smtp.username,
    pass: config.email.smtp.password,
  },
};

/**
 * Send an email to the toEmail address, with details about who wanted to send it: name and email
 *
 * @param {string} type    - type of email to send
 * @param {object} payload - payload with data to send
 * @param {string} toEmail   - email address of the receiver
 *
 * @returns {void}
 */
async function send(type, payload, toEmail) {
  const transporter = nodemailer.createTransport(SMTP_CONFIG);

  const text = contents[type].createTextContent(payload);
  const html = contents[type].createHtmlContent(payload);
  const data = {
    to: toEmail,
    subject: `${EMAIL_SUBJECT_BASE} - ${type}`,
    text,
    html,
  };

  const result = await transporter.sendMail(data);

  return result;
}

module.exports = {
  send,
};
