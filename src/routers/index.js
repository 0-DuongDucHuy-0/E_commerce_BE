const UserRouter = require("./UserRouter");
const UpLoadImgRouter = require("./UploadImgRouter");
const ProductImageRouter = require("./ProductImageRouter");


const routers = (app) => {
  app.use("/api/user", UserRouter);
  app.use("/api/upload", UpLoadImgRouter);
  app.use("/api/productImage", ProductImageRouter);
};

module.exports = routers;
