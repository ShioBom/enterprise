import express from "express";
import movieController from "../../controller/movieController";
let clientRouter = express.Router();
let multer = require("multer");
let upload = multer({ dest: "../../../movieTicket/static/img/movies" });

module.exports = clientRouter;
clientRouter.get("/getMovies", movieController.getMovies());
clientRouter.post("/getPortrait", movieController.getPortrait());
clientRouter.post("/getMovie", movieController.getMovie());
clientRouter.post("/delMovie", movieController.delMovie());
clientRouter.post("/addMovie", movieController.addMovie());
clientRouter.post("/uploadMovie", upload.single('file'), movieController.uploadMovie());
clientRouter.post("/getActors", movieController.getActors());
clientRouter.post("/getReviews", movieController.getReviews());
clientRouter.post("/getCinemas", movieController.getCinemas());
clientRouter.post("/getCinemaMovie", movieController.getCinemaMovie());
clientRouter.post("/getChambers", movieController.getChambers());
clientRouter.post("/getCinema", movieController.getCinema());
clientRouter.post("/insertOrder", movieController.insertOrder());
clientRouter.post("/queryOrderByUser", movieController.queryOrderByUser());
clientRouter.post("/seatIsBought", movieController.seatIsBought());
clientRouter.post("/cancelOrderByUser", movieController.cancelOrderByUser());
clientRouter.post("/checkoutByUser", movieController.checkoutByUser());
clientRouter.post("/addReview", movieController.addReview());
clientRouter.post("/getAvgGrade", movieController.getAvgGrade());
clientRouter.post("/searchMovie", movieController.searchMovie());
clientRouter.post("/getOrderByID", movieController.getOrderByID());






