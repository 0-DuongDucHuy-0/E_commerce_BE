const UserRouter = require("./UserRouter");
const UpLoadImgRouter = require("./UploadImgRouter");
const ProductImageRouter = require("./ProductImageRouter");
const ProductRouter = require("./ProductRouter");
const OrderRouter = require("./OrderRouter");
const TransactionRouter = require("./TransactionRouter");
const RattingRouter = require("./RattingRouter");


const routers = (app) => {
  app.use("/api/user", UserRouter);
  app.use("/api/upload", UpLoadImgRouter);
  app.use("/api/productImage", ProductImageRouter);
  app.use("/api/product", ProductRouter);
  app.use("/api/order", OrderRouter);
  app.use("/api/transaction", TransactionRouter);
  app.use("/api/rating", RattingRouter);
};

module.exports = routers;
