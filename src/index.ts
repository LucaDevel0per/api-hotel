import express from "express";
import roomsRouter from "./routes/rooms";
import guestsRouter from "./routes/guests";
// import bookingsRouter from "./routes/bookings";

const app = express();
const port = 3001;

app.use(express.json());
app.use("/rooms", roomsRouter);
app.use("/guests", guestsRouter);
// app.use("/bookings", bookingsRouter);

app.listen(port, () => {
  console.log(`🚀 API rodando em http://localhost:${port}`);
});
