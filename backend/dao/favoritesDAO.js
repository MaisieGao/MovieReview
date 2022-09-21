// get a separate database query that queries for a specific collection of movie
// across the entire database
let favoritesCollection;
import MovieDAO from "../dao/moviesDAO.js"
export default class FavoritesDAO{
    static async injectDB(conn){
        if (favoritesCollection){
            return;
        }
        try{
            favoritesCollection = await conn.db(process.env.MOVIEREVIEWS_NS).collection('favorites');
        }
        catch(e){
            console.error(`Unable to connect in FavoritesDAO:${e}`);
        }
    }
    static async updateFavorites(userId, favorites){
        try{
            const updateResponse = await favoritesCollection.updateOne(
                {_id:userId},
                {$set: {favorites:favorites}},
                // The upsert: true setting ensures that if an entry does not 
                // exist for the user it is created, otherwise it is updated.
                {upsert:true}
            )
            return updateResponse
        }
        catch(e){
            console.error(`Unable to update favorites:${e}`);
            return {error: e};
        }
    }
    // This carries out a find operation on the database with the user's ID 
    // as the key. There will only ever be one value returned, which will 
    // represent the list of favorites. For this reason we only ever need
    //  to take the 0 indexed element of the returned array.
    static async getFavorites(id){
        let cursor;
        try{
            cursor = await favoritesCollection.find({
                _id: id
            });

           
            const favorites = await cursor.toArray();
            
            return favorites[0];
        }catch(e){
            console.error(`Something went wrong in getFavorites:${e}`);
            throw e;
        }
    }
    static async getAllFavorites(id){
        let cursor;
        try{
            cursor = await favoritesCollection.find({
                _id: id
            });
            let favorites = await cursor.toArray();
            favorites = favorites[0];

            let arr = [];
            for(let i = 0; i< favorites['favorites'].length; i++){
                let data = await MovieDAO.getMovieById(favorites['favorites'][i]);
                arr.push( {"_id" : data._id, "title" : data.title, "poster" : data.poster})
            }
            favorites['favorites'] = arr
            return favorites;
        }catch(e){
            console.error(`Something went wrong in getFavorites:${e}`);
            throw e;
        }
    }
}