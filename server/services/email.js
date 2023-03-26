const nodemailer = require("nodemailer");

const sendVerificationEmail = async (email, verificationLink) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USERNAME,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  console.log(email)

  const mailOptions = {
    from: process.env.SMTP_FROM_ADDRESS,
    to: email,
    subject: "Please verify your email address",
    html: `
      <p>Thank you for registering. Please click the link below to verify your email address:</p>
      <p><a href="${verificationLink}">${verificationLink}</a></p>
    `,
  };
  

  await transporter.sendMail(mailOptions);
};

const sendResetPasswordEmail = async (email, resetLink) => {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  
    const mailOptions = {
      from: process.env.SMTP_FROM_ADDRESS,
      to: email,
      subject: "Password reset request",
      html: `
        <p>We received a request to reset the password for your account. Please click the link below to reset your password:</p>
        <p><a href="${resetLink}">${resetLink}</a></p>
      `,
    };
  
    await transporter.sendMail(mailOptions);
  };
  

module.exports = { sendVerificationEmail, sendResetPasswordEmail };
