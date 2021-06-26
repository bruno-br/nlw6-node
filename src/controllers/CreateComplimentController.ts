import { Request, Response } from "express";
import { findMissingParams } from "../helpers/FindMissingParams";
import { CreateComplimentService } from "../services/CreateComplimentService";
import SendComplimentEmailService from "../services/SendComplimentEmailService";

class CreateComplimentController {
  async handle(request: Request, response: Response) {
    const { user_id } = request;
    const { tag_id, user_receiver, message } = request.body;

    findMissingParams(request.body, ["tag_id", "user_receiver", "message"]);

    const createComplimentService = new CreateComplimentService();

    const compliment = await createComplimentService.execute({
      tag_id,
      user_sender: user_id,
      user_receiver,
      message,
    });

    await SendComplimentEmailService.execute({
      tag_id,
      user_sender: user_id,
      user_receiver,
      message,
    });

    return response.json(compliment);
  }
}

export { CreateComplimentController };
