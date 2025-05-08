import app from './app'
// import bookingsRouter from "./routes/bookings";

// const app = express();
const port = 3001;


// app.use("/bookings", bookingsRouter);

app.listen(port, () => {
  console.log(`🚀 API rodando em http://localhost:${port}`);
});
