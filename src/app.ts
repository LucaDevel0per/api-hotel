import express from "express";
import guestsRouter from './routes/guests';
import roomsRouter from "./routes/rooms";

const app = express();

app.use(express.json())
app.use('/guests', guestsRouter);
app.use("/rooms", roomsRouter);

export default app;