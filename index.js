const socketIO = require("socket.io");
const Server = socketIO.Server;

const io = new Server(3000, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});

const connectedUsers = []

io.on("connection", (socket) => {
    console.log("connected with socket id", socket.id);

    connectedUsers.push({ id: socket.id });

    io.emit("connectedUsers", connectedUsers);

    socket.on("alertAll", (data) => {
        io.emit("alertAll", data);
    });


    socket.on("disconnect", () => {
        console.log("disconnected with socket id", socket.id);

        const disconnectedUser = connectedUsers.find((i) => i.id == socket.id);
        connectedUsers.splice(connectedUsers.indexOf(disconnectedUser), 1);
        io.emit("connectedUsers", connectedUsers);
    });
});