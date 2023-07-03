import nodemailer from "nodemailer";
import config from "../../../config/config.js";

const transporter = nodemailer.createTransport({
  service: config.MAIL_SERVICE,
  host: config.MAIL_HOST,
  port: config.MAIL_PORT,
  secure: false,
  auth: {
    user: config.MAIL_EMAIL,
    pass: config.MAIL_PASSWORD,
  },
});

const sendMail = async (subject, text, htmlBody, toSend) => {
  try {
    const info = await transporter.sendMail({
      from: config.EMAIL_FROM,
      to: toSend,
      subject: subject,
      text: text,
      html: htmlBody,
    });
    transporter.sendMail(info, (error, response) => {
      if (error) {
        console.log("error while sending email");
      }
      console.log("email sent successfully");
    });
  } catch (error) {
    console.log("error while sending email", error);
  }
};
const successSignUpText = (name) => {
  return `Welcome to 55 Feat ${name}.`;
};
export default sendMail;
export { successSignUpText };
