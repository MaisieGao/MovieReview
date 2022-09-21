import mongodb from 'mongodb';
const ObjectId = mongodb.ObjectId

let movies;

export default class MovieDAO{
    //The conn object is the database connection
    static async injectDB(conn){
        if(movies){
            return;
        }
        //We grab a handle to the movies collection from the database.
        try{
            movies = await conn.db(process.env.MOVIEREVIEWS_NS).collection('movies');
        }
        catch(e){
            console.error(`Unable to connect in MoviesDAO: ${e}`);
        }
    }
    static async getMovies({
        filters = null,
        page = 0,
        moviesPerPage = 20,
    } = {}) {
        let query;
        if(filters){
            if('title' in filters){
                //https://blog.csdn.net/zhuchunyan_aijia/article/details/86656867
                //search filters['title'] in all text fields
                query = {$text: {$search: filters['title']}};
            } else if ("rated" in filters){
                query = {'rated': {$eq: filters['rated']}};
            }
        }
        let cursor;
        try{
            //https://blog.csdn.net/weixin_46253839/article/details/118383089
            //when skip() and limit(), we use skip the number first and then limit the number
            //skip the movies in the previous pages, and limit movies for this page to 20
            cursor = await movies.find(query).limit(moviesPerPage).skip(moviesPerPage * page)
            //make the cursor return an array
            const moviesList = await cursor.toArray();
            const totalNumMovies = await movies.countDocuments(query);
            return {moviesList, totalNumMovies};
            
        }catch(e){
            console.error(`Unable to issue find command, ${e}`);
            return{moviesList:[], totalNumMovies:0}
        }
    }
    static async getRatings(){
        let ratings = [];
        try{
            //get the distinct term for "rated", only for rated part
            //https://blog.csdn.net/skh2015java/article/details/55667829
            ratings = await movies.distinct('rated');
            return ratings;
        }catch(e){
            console.error(`Unable to get ratings, ${e}`);
            return ratings;
        }
    }
    static async getMovieById(id){
        try{
            return await movies.aggregate([
                {
                    $match: {
                        _id: new ObjectId(id),
                    }
                },
                {
                    $lookup: {
                        from: 'reviews',
                        localField: '_id',
                        foreignField: 'movie_id',
                        as: 'reviews',
                    }
                }
            ]).next();
        }catch(e){
            console.error(`Something went wrong in getMovieById: ${e}`);
            throw e;
        }
    }
}