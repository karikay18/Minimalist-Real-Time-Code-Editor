const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

const PORT = process.env.PORT || 3001;

const rooms = new Map();

app.use(express.json());

app.get("/createroom", async (req, res) => {
  try {
    const roomId = Math.random().toString(36).substring(2, 8);
    rooms.set(roomId, {
      users: new Map(),
    });

    const userDir = path.join(__dirname, "User");
    if (!fs.existsSync(userDir)) {
      fs.mkdirSync(userDir);
    }

    const filePath = path.join(userDir, `${roomId}.js`);
    const initialContent =
      "// Type your JavaScript code here\nfunction example() {\n  // Start typing here...\n}\n";

    fs.writeFileSync(filePath, initialContent);

    res.status(201).json({ roomId });
  } catch (error) {
    console.error("Error creating room:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("join-room", async (roomId, username) => {
    socket.join(roomId);
    console.log(`User ${username} joined room: ${roomId}`);

    if (!rooms.has(roomId)) {
      rooms.set(roomId, { users: new Map() });
    }

    rooms.get(roomId).users.set(socket.id, username);

    const filePath = path.join(__dirname, "User", `${roomId}.js`);
    try {
      const data = await fs.readFileSync(filePath, 'utf8');
      socket.emit("initial-code", data);
    } catch (err) {
      console.error("Error reading file:", err);
      socket.emit("initial-code", "// Error loading code");
    }

    io.to(roomId).emit(
      "user-list",
      Array.from(rooms.get(roomId).users.values())
    );
  });

  socket.on("code-change", (roomId, newCode) => {
    // console.log(`Received code change for room ${roomId}:`, newCode); 
    console.log("kjnkjlvna",rooms.has(roomId));// Debug log
    
      const filePath = path.join(__dirname, "User", `${roomId}.js`);
      fs.writeFile(filePath, newCode, (err) => {
        if (err) {
          console.error("Error writing file:", err);
          return;
        }
        console.log('Broadcasting code update:', newCode); // Debug log
        io.to(roomId).emit("code-update", newCode);
      });
    
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
    rooms.forEach((room, roomId) => {
      if (room.users.has(socket.id)) {
        room.users.delete(socket.id);
        if (room.users.size === 0) {
          rooms.delete(roomId);
          const filePath = path.join(__dirname, "User", `${roomId}.js`);
          fs.unlink(filePath, (err) => {
            if (err) console.error("Error deleting file:", err);
          });
        } else {
          io.to(roomId).emit("user-list", Array.from(room.users.values()));
        }
      }
    });
  });
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
