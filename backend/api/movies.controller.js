import MovieDAO from "../dao/moviesDAO.js"
export default class MoviesController{
    static async apiGetMovies(req, res, next){
        //get the number of pages and movie per page 
        const moviesPerPage = req.query.moviesPerPage ?
            parseInt(req.query.moviesPerPage) : 20;
        const page = req.query.page ? parseInt(req.query.page) : 0;
    
        let filters = {}
        if (req.query.rated){
            filters.rated = req.query.rated;
        }else if(req.query.title){
            filters.title = req.query.title;
        }
        //This will return a single page's worth of movies in a 
            //list along with a total number of movies found.
        const {moviesList, totalNumMovies} = await MovieDAO.getMovies({filters, page, moviesPerPage});
        
        //take the information retrieved by the DAO, package it 
            //up into an object called response and put that into
            // the HTTP response object as JSON. This response is 
            //what will be sent back to the client who queried the API.
        let response = {
            movies: moviesList,
            page: page,
            filters: filters,
            entries_per_page: moviesPerPage,
            total_results: totalNumMovies,
        };
        res.json(response);
    }
    static async apiGetMoviesById(req, res, next){
        try{
            //get movie id and then get movie
            // if you have the route /student/:id, then the “id” property is available as req.params.id.
            let id = req.params.id || {}
            let movie = await MovieDAO.getMovieById(id);
            if(!movie){
                res.status(404).json({error: 'not found'});
                return;
            }
            //return movie
            res.json(movie);
        }catch(e){
            console.log(`API, ${e}`);
            res.status(500).json({error:e});
        }
    }
    //The DAO will query the database for all distinct "rating" 
        //values in the movies database, yielding a list of 
        //ratings to populate our ratings filter drop-down.
    static async apiGetRatings(req, res, next){
        try{
            let propertyTypes = await MovieDAO.getRatings();
            res.json(propertyTypes);
        }catch(e){
            console.log(`API, ${e}`);
            res.status(500).json({error:e});
        }
    }
}