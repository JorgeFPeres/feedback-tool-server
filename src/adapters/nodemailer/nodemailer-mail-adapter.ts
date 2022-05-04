import { MailAdapter, SendMailData } from '../mail-adapter'
import nodemailer from 'nodemailer'

const transport = nodemailer.createTransport({
  host: 'smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: '645bed11fd6fa1',
    pass: 'd770ffc6cb4a34',
  },
})

export class NodemailerMailAdapter implements MailAdapter {
  async sendEmail(data: SendMailData) {
    const { subject, body } = data
    await transport.sendMail({
      from: 'Equipe Feedget <oi@feedget,com>',
      to: 'Jorge Fernando <jorge-peres@live.com>',
      subject: subject,
      html: body,
    })
  }
}
