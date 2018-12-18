const nodemailer = require('nodemailer');

const config = require('../config');

const EMAIL_SUBJECT_BASE = 'Hello, nouveau message sur notre mariage';

/**
 * Send an email to the toEmail address, with details about who wanted to send it: name and email
 *
 * @param {string} fromName  - name of the person who wanted to send the email
 * @param {string} fromEmail - email address of the sender
 * @param {string} toEmail   - email address of the receiver
 * @param {string} message   - message of the email
 *
 * @returns {void}
 */
async function send(fromName, fromEmail, toEmail, message) {
  const smtpConfig = {
    host: config.email.smtp.host,
    port: 465,
    secure: true,
    auth: {
      user: config.email.smtp.username,
      pass: config.email.smtp.password,
    },
  };

  const transporter = nodemailer.createTransport(smtpConfig);

  const text = createTextContent(fromName, fromEmail, message);
  const html = createHtmlContent(fromName, fromEmail, message);
  const data = {
    to: toEmail,
    subject: EMAIL_SUBJECT_BASE,
    text,
    html,
  };

  const result = await transporter.sendMail(data);

  return result;
}

/**
 * Create the text content of email
 *
 * @param {string} name      - name of the person who wanted to send the email
 * @param {string} fromEmail - email address of the sender
 * @param {string} message   - content of the email
 *
 * @returns {string} html content of the email
 */
function createTextContent(name, fromEmail, message) {
  return `
      Message envoyé par ${name}

      Répondre à l'adresse ${fromEmail}

      "${message}"
    `;
}

/**
 * Create the html content of email
 *
 * @param {string} name      - name of the person who wanted to send the email
 * @param {string} fromEmail - email address of the sender
 * @param {string} message   - content of the email
 *
 * @returns {string} html content of the email
 */
function createHtmlContent(name, fromEmail, message) {
  return `<div style="font-size: 16px">
      Message envoyé par: <strong>${name}</strong><br />
      <br />
      Répondre à l'adresse <strong>${fromEmail}</strong><br />
      <br />
      <span style="font-style: italic">"${message}"</span>
      </div>
    `;
}

module.exports = {
  send,
};
