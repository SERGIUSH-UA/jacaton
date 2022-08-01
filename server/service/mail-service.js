require('dotenv').config({path:'./secure/.env'});
const nodeMailer = require('nodemailer')

class MailService {

    constructor() {
        this.transporter = nodeMailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure:false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD
            }
        })
    }

    async sendActivationMail(to, link) {
        await this.transporter.sendMail({
            from: `"Францисканська Молодь в Україні" <${process.env.SMTP_USER}>`,
            to, subject: `Активація аккаунта для гри "${process.env.GAME_NAME}"`,
            text:'',
            html:`
            <div>
                <h1>Вітаю, Вас! Для активації перейдіть за посиланням</h1>
                <a href="${link}">${link}</a>
                <p></p>
            </div>
            `
        })
    }
}

module.exports = new MailService();