import nodemailer, { Transporter } from "nodemailer";
import handlebars from "handlebars";
import { resolve } from "path";
import fs from "fs";
import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UsersRepositories";
import { TagsRepositories } from "../repositories/TagsRepositories";
import { EntityDoesNotExistError } from "../errors/httpError/EntityDoesNotExistError";

import SendEmailService from "./SendEmailService";

class SendComplimentEmailService {
  async execute({ tag_id, user_sender, user_receiver, message }) {
    const emailPath = resolve(
      __dirname,
      "..",
      "views",
      "emails",
      "complimentMail.hbs"
    );

    const usersRepository = getCustomRepository(UsersRepositories);
    const sender = await usersRepository.findOne(user_sender);
    const receiver = await usersRepository.findOne(user_receiver);

    const tagsRepositories = getCustomRepository(TagsRepositories);
    const tag = await tagsRepositories.findOne(tag_id);

    if (!sender) {
      throw new EntityDoesNotExistError("User Sender");
    }

    if (!receiver) {
      throw new EntityDoesNotExistError("User Receiver");
    }

    if (!tag) {
      throw new EntityDoesNotExistError("Tag");
    }

    const subject = `Parabéns! Você recebeu um elogio de ${sender.name}`;

    SendEmailService.execute({
      to: receiver.email,
      subject,
      path: emailPath,
      handlebarsProperties: {
        username: receiver.name,
        subject,
        description: message,
        tag: tag.name,
      },
    });
  }
}

export default new SendComplimentEmailService();
