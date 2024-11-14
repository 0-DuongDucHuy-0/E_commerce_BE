const UserRouter = require("./UserRouter");
const StudentRouter = require("./StudentRouter");
const RoomRouter = require("./RoomRouter");

const routers = (app) => {
  // app.get("/api/user", (req, res) => {
  //   res.send("Hello from user API");
  // });
  app.use("/api/user", UserRouter);
  app.use("/api/student", StudentRouter);
  app.use("/api/room", RoomRouter);
};

module.exports = routers;
