import express from "express";
import cors from "cors";
import guestsRouter from './routes/guests';
import roomsRouter from "./routes/rooms";
import bookingsRouter from "./routes/bookings";

const app = express();

app.use(cors());
app.use(express.json())

// Rota básica para verificar se a API está funcionando
app.get('/', (req, res) => {
  res.json({
    status: 'online',
    message: 'API do Sistema de Reservas de Hotel está funcionando',
    endpoints: {
      guests: '/guests',
      rooms: '/rooms',
      bookings: '/bookings'
    }
  });
});

app.use('/guests', guestsRouter);
app.use("/rooms", roomsRouter);
app.use("/bookings", bookingsRouter);

export default app;


