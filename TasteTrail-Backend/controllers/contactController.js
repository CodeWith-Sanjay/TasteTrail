import transporter from "../config/mailer.js";

export const sendEmail = async (req, res) => {
    try {
        const {name, email, message} = req.body;

        const data = await transporter.sendMail({
            from: email,
            to: process.env.NODEMAILER_EMAIL,
            subject: `New contact from ${name}`,
            text: message
        });

        console.log('Mail sent successfully');

        return res.status(200).json({
            message: 'Email sent successfully',
            data: data
        });
    } catch (error) {
        return res.status(500).json({message: 'Error Sending email', error: error.message});
    }
}