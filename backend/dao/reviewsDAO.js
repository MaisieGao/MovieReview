import mongodb from 'mongodb';
const ObjectId = mongodb.ObjectId

let reviews;

export default class ReviewsDAO{
    //The conn object is the database connection
    static async injectDB(conn){
        if(reviews){
            return;
        }
        //We grab a handle to the movies collection from the database.
        try{
            reviews = await conn.db(process.env.MOVIEREVIEWS_NS).collection('reviews');
        }
        catch(e){
            console.error(`Unable to establish connection handle in reviewsDA: ${e}`);
        }
    }
    static async addReview(movieId, user, review, date){
        try{
            const reviewDoc = {
                name: user.name,
                user_id: user._id,
                date:date,
                review:review,
                movie_id: ObjectId(movieId)
            }
            return await reviews.insertOne(reviewDoc);
        }
        catch(e){
            console.error(`Unable to post review: ${e}`);
            return {error:e};
        }
    }
    static async updateReview(reviewId,text,userInfo,date){
        try{
            const reviewDoc = reviews.updateOne(
                {_id: ObjectId(reviewId), 
                    user_id: userInfo._id,
                    name: userInfo.name},
                    //the left part is the field
                { $set: { review: text, date: date } },
            )
            return reviewDoc;
        }
        catch(e){
            console.error(`Unable to update review: ${e}`);
            return {error:e};
        }
    }
    static async deleteReview(reviewId,userId){
        try{
            const reviewDoc = reviews.deleteOne({
                user_id: userId, 
                _id: ObjectId(reviewId) },
            )
            return reviewDoc;
        }
        catch(e){
            console.error(`Unable to delete review: ${e}`);
            return {error:e};
        }
    }
}    