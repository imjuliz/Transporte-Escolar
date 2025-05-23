import express from "express";
import { loggerController } from "../controllers/LoggerController";
const app = express();

function loggerUse (){
    app.use(loggerController);
}
export {loggerUse};
