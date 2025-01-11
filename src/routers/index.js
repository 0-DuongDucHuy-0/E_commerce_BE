const UserRouter = require("./UserRouter");
const UpLoadImgRouter = require("./UploadImgRouter");
const ProductImageRouter = require("./ProductImageRouter");
const ProductRouter = require("./ProductRouter");


const routers = (app) => {
  app.use("/api/user", UserRouter);
  app.use("/api/upload", UpLoadImgRouter);
  app.use("/api/productImage", ProductImageRouter);
  app.use("/api/product", ProductRouter);
};

module.exports = routers;
