import nodemailer, { Transporter } from "nodemailer";
import handlebars from "handlebars";
import fs from "fs";

class SendEmailService {
  private client: Transporter;

  constructor() {
    nodemailer.createTestAccount().then((account) => {
      const transporter = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass,
        },
      });
      this.client = transporter;
    });
  }

  async execute({ to, subject, path, handlebarsProperties }) {
    const templateFileContent = fs.readFileSync(path).toString("utf8");

    const mailTemplateParse = handlebars.compile(templateFileContent);

    const html = mailTemplateParse(handlebarsProperties);

    const mailMessage = await this.client.sendMail({
      to,
      subject,
      html,
      from: "Valoriza <noreply@valoriza.com.br>",
    });

    console.log(`Message sent: ${mailMessage.messageId}`);
    console.log(`Preview URL: ${nodemailer.getTestMessageUrl(mailMessage)}`);
  }
}

export default new SendEmailService();
