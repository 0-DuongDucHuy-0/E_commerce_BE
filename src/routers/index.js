const UserRouter = require("./UserRouter");
const StudentRouter = require("./StudentRouter");
const RoomRouter = require("./RoomRouter");
const StaffRouter = require("./StaffRouter");
const FeesRouter = require("./FeesRouter");

const routers = (app) => {
  // app.get("/api/user", (req, res) => {
  //   res.send("Hello from user API");
  // });
  app.use("/api/user", UserRouter);
  app.use("/api/student", StudentRouter);
  app.use("/api/room", RoomRouter);
  app.use("/api/staff", StaffRouter);
  app.use("/api/fees", FeesRouter);
};

module.exports = routers;
