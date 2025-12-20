import nodemailer from 'nodemailer';

const nodemailerEmail = process.env.NODEMAILER_EMAIL;
const nodemailerPassword = process.env.NODEMAILER_PASSWORD;

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: nodemailerEmail,
        pass: nodemailerPassword
    }
});

export default transporter;