const UserRouter = require("./UserRouter");

const routers = (app) => {
  // app.get("/api/user", (req, res) => {
  //   res.send("Hello from user API");
  // });
  app.use("/api/user", UserRouter);
};

module.exports = routers;
