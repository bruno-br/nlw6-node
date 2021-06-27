import { Request, Response } from "express";

class LoginPageController {
  async handle(request: Request, response: Response) {
    return response.render("loginPage");
  }
}

export { LoginPageController };
