module.exports = {
  port: process.env.PORT || 4000,
  email: {
    receiverAddress: process.env.EMAIL_RECEIVER_ADDRESS || 'sebastien.montenez@gmail.com',
    smtp: {
      host: process.env.SMTP_USERNAME || 'smtp.gmail.com',
      username: process.env.SMTP_USERNAME || 'sebastien.montenez@gmail.com',
      password: process.env.SMTP_PASSWORD,
    },
  },
};
