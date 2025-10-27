import Router from "express";

import { TransactionsController } from "../controllers/transactionsController";

const transactionsController = new TransactionsController();

const transactionsRoutes = Router();

transactionsRoutes.post("/", transactionsController.create);
transactionsRoutes.get("/", transactionsController.index);

export { transactionsRoutes };
