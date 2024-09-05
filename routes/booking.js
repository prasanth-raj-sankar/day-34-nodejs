import express from "express";
import { v4 as uuidv4 } from "uuid";


const bookingRouter = express.Router();
const bookings = [];

// Create a Booking
bookingRouter.post("/", (req, res) => {
    const { customerName, date, startTime, endTime, roomId } = req.body;

    const room = rooms.find((r) => r.id === roomId);
    if (!room) {
        return res.status(404).json({ msg: "Room not found" });
    }

    const newBooking = {
        id: uuidv4(),
        customerName,
        date,
        startTime,
        endTime,
        roomId,
        bookingDate: new Date().toISOString(),
        status: "Booked",
    };

    bookings.push(newBooking);
    res.status(201).json({ msg: "Room booked successfully", newBooking });
});

// Get all Bookings
bookingRouter.get("/", (req, res) => {
    res.json(bookings);
});

// Get all Rooms with Booking Data
bookingRouter.get("/rooms/bookings", (req, res) => {
    const result = rooms.map((room) => {
        const roomBookings = bookings.filter((booking) => booking.roomId === room.id);

        return {
            roomName: room.name,
            bookings: roomBookings.map((b) => ({
                customerName: b.customerName,
                date: b.date,
                startTime: b.startTime,
                endTime: b.endTime,
                bookingStatus: b.status,
            })),
        };
    });

    res.json(result);
});

// Get all Customers with Booking Data
bookingRouter.get("/customers/bookings", (req, res) => {
    const result = bookings.map((b) => {
        const room = rooms.find((r) => r.id === b.roomId);

        return {
            customerName: b.customerName,
            roomName: room.name,
            date: b.date,
            startTime: b.startTime,
            endTime: b.endTime,
        };
    });

    res.json(result);
});

// Get Customer's Booking History
bookingRouter.get("/customers/:customerName/bookings", (req, res) => {
    const { customerName } = req.params;
    const customerBookings = bookings.filter((b) => b.customerName === customerName);

    if (customerBookings.length > 0) {
        const result = customerBookings.map((b) => {
            const room = rooms.find((r) => r.id === b.roomId);
            return {
                roomName: room ? room.name : "Room not found",
                date: b.date,
                startTime: b.startTime,
                endTime: b.endTime,
                bookingId: b.id,
                bookingDate: b.bookingDate,
                bookingStatus: b.status,
            };
        });

        res.json(result);
    } else {
        res.status(404).json({ msg: "No bookings found for this customer" });
    }
});

export default bookingRouter;














