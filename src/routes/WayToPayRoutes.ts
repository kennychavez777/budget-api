import { Router } from "express";
import { WayToPayController } from "../controllers/WayToPayController";

const wtpRouter = Router();
const wtpController = new WayToPayController();

// wtpRouter.get('/', (req, res) => wtpController.getAllWaysToPay(req, res));

export default wtpRouter;