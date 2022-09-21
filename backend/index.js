import app from './server.js';
import mongodb from 'mongodb';
import dotenv from 'dotenv';
import MovieDAO from './dao/moviesDAO.js';
import ReviewsDAO from './dao/reviewsDAO.js';
import FavoritesDAO from './dao/favoritesDAO.js'

async function main(){
    // sets up our environment variables with reference to the .env
    dotenv.config();
    //access to our database's URL
    const client = new mongodb.MongoClient(
        process.env.MOVIEREVIEWS_DB_URI
    )
    //if there is no port set up in env, use 8000, since we set up 
        //in env, use 5000
    const port = process.env.PORT || 8000;
    try{
        //connect to MongoDB database server
        //await for the result of client.connect() and then move forward
        //we can get database=client.db() and use db.collection().find() in the
            //simple version
        await client.connect();
        await MovieDAO.injectDB(client);
        await ReviewsDAO.injectDB(client);
        await FavoritesDAO.injectDB(client);

        app.listen(port, ()=>{
            console.log('Server is running on port:' +port);
        })
    }catch(e){
        console.error(e);
        process.exit(1);
    }
}
main().catch(console.error);