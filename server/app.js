import express from "express";
import cors from "cors";
import publicRoutes from "./routes/public.js";
import privateRoutes from "./routes/authRotas.js";

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

app.use("/", publicRoutes);
app.use("/", privateRoutes);

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
