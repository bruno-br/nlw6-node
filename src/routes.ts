import { Router } from "express";
import { CreateUserController } from "./controllers/CreateUserController";
import { CreateTagController } from "./controllers/CreateTagController";
import { ensureAdmin } from "./middlewares/ensureAdmin";
import { AuthenticateUserController } from "./controllers/AuthenticateUserController";
import { CreateComplimentController } from "./controllers/CreateComplimentController";
import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";
import { ListUserSendComplimentsController } from "./controllers/ListUserSendComplimentsController";
import { ListUserReceiveComplimentsController } from "./controllers/ListUserReceiveComplimentsController";
import { ListTagsController } from "./controllers/ListTagsController";
import { ListUsersController } from "./controllers/ListUsersController";
import { LandingPageController } from "./controllers/LandingPageController";
import { LoginPageController } from "./controllers/LoginPageController";
import { authFrontEnd } from "./middlewares/authFrontEnd";

const router = Router();

const createUserController = new CreateUserController();
const createTagController = new CreateTagController();
const authenticateUserController = new AuthenticateUserController();
const createComplimentController = new CreateComplimentController();

const listUserSendComplimentsController =
  new ListUserSendComplimentsController();

const listUserReceiveComplimentsController =
  new ListUserReceiveComplimentsController();

const listTagsController = new ListTagsController();
const listUsersController = new ListUsersController();

const landingPageController = new LandingPageController();
const loginPageController = new LoginPageController();

router.post("/users", createUserController.handle);

router.get("/users", ensureAuthenticated, listUsersController.handle);

router.post(
  "/tags",
  ensureAuthenticated,
  ensureAdmin,
  createTagController.handle
);

router.get("/tags", ensureAuthenticated, listTagsController.handle);

router.post("/login", authenticateUserController.handle);

router.post(
  "/compliments",
  ensureAuthenticated,
  createComplimentController.handle
);

router.get(
  "/users/compliments/send",
  ensureAuthenticated,
  listUserSendComplimentsController.handle
);

router.get(
  "/users/compliments/receive",
  ensureAuthenticated,
  listUserReceiveComplimentsController.handle
);

router.get("/", authFrontEnd, landingPageController.handle);

router.get("/login", loginPageController.handle);

export { router };
