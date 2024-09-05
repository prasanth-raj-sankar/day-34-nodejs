
import express from "express";
import roomRouter from "./routes/rooms.js";
import bookingRouter from "./routes/booking.js";

const server = express();
server.use(express.json());


server.use("/rooms", roomRouter);
server.use("/bookings", bookingRouter);

const PORT = 4500;

server.listen(PORT, () => {
   console.log("Server running on port",PORT);
});





















