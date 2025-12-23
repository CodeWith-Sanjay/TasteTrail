import transporter from "../config/mailer.js";

export const sendEmail = async (req, res) => {
    try {
        const {name, email, message} = req.body;

        if(!name || !email || !message) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            });
        }

        console.log("REQ BODY:", req.body);

        const data = await transporter.sendMail({
            from: `Contact Form <${process.env.NODEMAILER_EMAIL}>`,
            to: process.env.NODEMAILER_EMAIL,
            replyTo: email,
            subject: `New contact from ${name}`,
            text: message
        });

        console.log('Mail sent successfully', data);

        return res.status(200).json({
            success: true,
            message: 'Email sent successfully',
            data: data
        });
    } catch (error) {
        console.error("EMAIL ERROR:", error);
        return res.status(500).json({
            success: false,
            message: 'Error Sending email', 
            error: error.message
        });
    }
}