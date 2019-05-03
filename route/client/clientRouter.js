import express from "express";
import movieController from "../../controller/movieController";
let clientRouter = express.Router();
module.exports = clientRouter;
clientRouter.get("/getMovies", movieController.getMovies());
clientRouter.post("/getMovie", movieController.getMovie());
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

