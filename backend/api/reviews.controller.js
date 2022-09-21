import ReviewsDAO from "../dao/reviewsDAO.js";
export default class ReviewsController{
    static async apiPostReview(req, res, next){
        try{
            //if it is a post request, we use req.body
            const movieId = req.body.movie_id;
            const review = req.body.review;
            const userInfo = {
                name: req.body.name,
                _id: req.body.user_id
            }
            const date = new Date();
            const reviewResponse = await ReviewsDAO.addReview(
                movieId,
                userInfo,
                review,
                date,
            );
            var {error} = reviewResponse;
            console.log(error);
            if(error){
                res.status(500).json({error:"Unable to post reviews"})
            }else{
                res.json({status:'success'});
            }
        }catch(e){
            res.status(500).json({error:e.message});
        }
    }
    static async apiUpdateReview(req, res, next){
        try{
            const reviewId = req.body.review_id;
            const review = req.body.review;
            const date = new Date();
            const userInfo = {
                name: req.body.name,
                _id: req.body.user_id
            }
            const reviewResponse = await ReviewsDAO.updateReview(
                reviewId,
                review,
                userInfo,
                date,
            )
            var {error} = reviewResponse;
            console.log(reviewResponse);
            if(error){
                res.status(400).json({error:"Unable to update reviews"})
            }
            if(reviewResponse.modifiedCount == 0){
                throw new Error(
					"unable to update review - user may not be original poster",
				)
            }else{
                res.json({status:'success'});
            }
        }
        catch(e){
            res.status(500).json({error:e.message});
        }
    }

    static async apiDeleteReview(req, res, next){
        try{
            const userId = req.body.user_id;
            const reviewId = req.body.review_id;
            const reviewResponse = await ReviewsDAO.deleteReview(
                reviewId,
                userId,
            )
            var {error} = reviewResponse;
            if(error){
                res.status(500).json({error:"Unable to delete reviews"})
            }else{
                res.json({status:'success'});
            }
        }
        catch(e){
            res.status(500).json({error:e.message});
        }
    }
    
}