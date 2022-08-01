const nodeMailer = require('nodemailer')

class MailService {

    constructor() {
        this.transporter = nodeMailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure:false,
            auth: {

            }
        })
    }

    async sendActivationMail(to, link) {

    }
}

module.exports = new MailService();