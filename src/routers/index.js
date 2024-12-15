const UserRouter = require("./UserRouter");
const StudentRouter = require("./StudentRouter");
const RoomRouter = require("./RoomRouter");
const StaffRouter = require("./StaffRouter");
const FeesRouter = require("./FeesRouter");
const StudentRequestRouter = require("./StudentRequestRouter");

const routers = (app) => {
  app.use("/api/user", UserRouter);
  app.use("/api/student", StudentRouter);
  app.use("/api/room", RoomRouter);
  app.use("/api/staff", StaffRouter);
  app.use("/api/fees", FeesRouter);
  app.use("/api/student-request", StudentRequestRouter);
};

module.exports = routers;
