import nodemailer from 'nodemailer'

import { MailAdapter, SendMailData } from "../mail-adapter";

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "e68ca3a15f60d3",
    pass: "534e2d169cd35a"
  }
})

export class NodeMailerMailAdapter implements MailAdapter {
  async sendMail({ subject, body }: SendMailData) {
    await transport.sendMail({
      from: "Equipe Feedget <teste@feedget.com>",
      to: "Alisson Fabricio <alisonfabricio04@gmail.com>",
      subject,
      html: body
    })
  }
}