require('dotenv').config({path:'../sec_mail.env'});
const nodeMailer = require('nodemailer')

class MailService {

    constructor() {
        this.transporter = nodeMailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure:false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS
            }
        })
    }

    async sendActivationMail(to, link) {

    }
}

module.exports = new MailService();