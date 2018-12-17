const nodemailer = require('nodemailer');

const config = require('../config');

const EMAIL_SUBJECT_BASE = 'Nouvelle question sur votre MARIAGE de';

/**
 * Send an email to the toEmail address, with details about who wanted to send it: name and email
 *
 * @param {string} fromName  - name of the person who wanted to send the email
 * @param {string} fromEmail - email address of the person who wanted to send the email
 * @param {string} toEmail   - email address of the receiver
 * @param {string} content   - content of the email
 *
 * @returns {void}
 */
async function send(fromName, fromEmail, toEmail, content) {
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

  const message = {
    from: fromEmail,
    to: toEmail,
    subject: `${EMAIL_SUBJECT_BASE} ${fromName}`,
    text: content,
  };

  const result = await transporter.sendMail(message);

  return result;
}

module.exports = {
  send,
};
