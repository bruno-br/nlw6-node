import { Request, Response } from "express";
import { GetUserService } from "../services/GetUserService";

class LandingPageController {
  async handle(request: Request, response: Response) {
    const { user_id } = request;

    const getUserService = new GetUserService();
    const user = await getUserService.execute({ user_id });

    return response.render("landingPage", { username: user.name });
  }
}

export { LandingPageController };
