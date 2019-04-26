import express from 'express';
import movieController from "../../controller/movieController";
let clientRouter = express.Router();
module.exports = clientRouter;
clientRouter.get("/getMovies", movieController.getMovies());
