import express from "express";
import cors from "cors";
// import session from 'express-session';
import publicRoutes from "./routes/public.js";
import privateRoutes from "./routes/authRotas.js";
// import { loggerController } from "./controllers/LoggerController.js";
const app = express();
const port = 3001;

// app.use(loggerController);
app.use(cors());
app.use(express.json());

app.use("/", publicRoutes);
app.use("/api", privateRoutes);

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
