const express = require("express");
const router = express.Router();
const roomController = require("../controllers/RoomController");
const {
    authAdminMiddleWare,
    authUserMiddleWare,
    authStaffMiddleWare,
} = require("../middleware/auth");

router.put("/update-room/:id", roomController.updateRoom);
router.get("/get-detail-room/:id", roomController.getDetailRoom); // lấy cả các sinh viên trong phòng
router.get("/get-all-room", roomController.getAllRoom); // http://localhost:3001/api/room/get-all-room?gender=male

module.exports = router;
