module.exports = {
  port: process.env.PORT || 4000,
  mongo: {
    url: process.env.MONGO_URL || 'mongodb://localhost:27017',
  },
  email: {
    receiverAddress: process.env.EMAIL_RECEIVER_ADDRESS || 'sebastien.montenez@gmail.com',
    smtp: {
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      username: process.env.SMTP_USERNAME || 'sebastien.montenez@gmail.com',
      password: process.env.SMTP_PASSWORD,
    },
  },
};
