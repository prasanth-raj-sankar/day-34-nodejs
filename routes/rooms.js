import express from "express";
import { v4 as uuidv4 } from "uuid";

const roomRouter = express.Router();
const rooms = [];

// Create a Room
roomRouter.post("/", (req, res) => {
    const { name, seats, amenities, pricePerHour } = req.body;

    const newRoom = {
        id: uuidv4(),
        name,
        seats,
        amenities,
        pricePerHour,
    };

    rooms.push(newRoom);
    res.status(201).json({ msg: "Room created successfully", newRoom });
});

// Get all Rooms
roomRouter.get("/", (req, res) => {
    res.json(rooms);
});

export default roomRouter;




























