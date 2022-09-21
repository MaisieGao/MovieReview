import express from "express";
import FavoritesController from "./favorites.controller.js";
import MoviesController from './movies.controller.js'
import ReviewsController from './reviews.controller.js'

const router = express.Router();
//if user give a '/' get request, we call apiGetMovies in MoviesController.js
router.route('/').get(MoviesController.apiGetMovies);
//will get an id of a movie in the database
router.route('/id/:id').get(MoviesController.apiGetMoviesById);
router.route('/ratings').get(MoviesController.apiGetRatings);

//Since users won't be creating, editing, or deleting movies, we 
    //don't need POST, PUT, or DELETE methods associated with these URLs.
router.route('/review').post(ReviewsController.apiPostReview);
router.route('/review').put(ReviewsController.apiUpdateReview);
router.route('/review').delete(ReviewsController.apiDeleteReview);

router.route('/favorites').put(FavoritesController.apiUpdateFavorites);
router.route('/favorites/:userId').get(FavoritesController.apiGetFavorites);
router.route('/favoritesAll/:userId').get(FavoritesController.apiGetAllFavorites);

export default router;