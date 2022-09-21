import axios from 'axios';

class FavoriteDataService{
    getFavorite(userId){
        return axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/v1/movies/favorites/${userId}`)
    }
    // get all favorite movies from the backend for a user
    getAllFavorite(userId){
        return axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/v1/movies/favoritesAll/${userId}`)
    }
    updateFavorite(data){
        return axios.put(`${process.env.REACT_APP_API_BASE_URL}/api/v1/movies/favorites`,data)
    }

}
export default new FavoriteDataService();