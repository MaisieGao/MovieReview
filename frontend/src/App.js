import { GoogleOAuthProvider } from '@react-oauth/google';
import { Route, Routes, Link } from "react-router-dom";
import React,{useState, useEffect, useCallback} from 'react'
import Login from "./components/Login.js";
import Logout from "./components/Logout.js";

import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import MoviesList from './components/MoviesList.js';
import Movie from './components/Movie.js';
import AddReview from './components/AddReview.js';
import './App.css';
import FavoriteDataService from '../src/services/favorites.js'
import Favorites from './components/Favorites.js';

function App() {
  const [user, setUser] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
  //useCallback get call whenever we change it 
  const GetFavorite = useCallback(() =>{
    //put the id into backend to get the movie
    FavoriteDataService.getFavorite(user.googleId)
    //get the response back so we got the criterias in movies and we could use them 
    .then(response => {
      setFavorites(response.data.favorites);
    })
    .catch(e => {
        console.log(e);
    });
},[user]);

  const addFavorite = (movieId) => {
    let updateFavorites = [...favorites, movieId]
    setFavorites(updateFavorites)
    const data = {
      _id:user.googleId,
      favorites : updateFavorites
    }
    FavoriteDataService.updateFavorite(data);
  }

  const deleteFavorite = (movieId) =>{
    let updateFavorites = favorites.filter(f => f !== movieId)
    setFavorites(updateFavorites);
    const data = {
      _id:user.googleId,
      favorites : updateFavorites
    }
    FavoriteDataService.updateFavorite(data);
  }

useEffect(() => {
  if(user){
    GetFavorite();    
  }
}, [user]);

  useEffect(() => {
    let loginData = JSON.parse(localStorage.getItem("login"));
    if (loginData) {
      let loginExp = loginData.exp;
      let now = Date.now()/1000;
      if (now < loginExp) {
        // Not expired
        setUser(loginData);
      } else {
        // Expired
        localStorage.setItem("login", null);
      }
    }
  }, []);

  return (
    <GoogleOAuthProvider clientId={clientId}>
    <div className="App">
      {/* div is the largest part, others are inside div */}
      <Navbar bg='primary' expand='lg' sticky='top' variant='dark'>
      {/* container is the layout --responsive
      class="container" fix width--white space on both sides
      "container-fluid" 100% width, take all viewport */}
        <Container className="container-fluid">
          <Navbar.Brand className="brand" href='/'>
            {/* brand has something to do with logo */}
            <img src="/images/movies-logo.png" alt='movies logo' className="moviesLogo"/>
            MOVIE TIME
          </Navbar.Brand>
          {/* fold and collapse the navbar */}
          {/* The navigation bar will respond to browser window resizes and toggle open and close when appropriate for smaller sizes */}
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id='responsive-navbar-nav'>
          {/* margin-left: auto which aligns an element to the right */}
            <Nav className="ml-auto">
            {/* we have a navigation link whose text is "Movies" and which links to the /movies URL */}
              <Nav.Link as={Link} to={'/movies'}>
                Movies
              </Nav.Link>
              {user != null && (<Nav.Link as={Link} to={'/favorites'}>
                Favorites
              </Nav.Link>)}
              
            </Nav>
          </Navbar.Collapse>
          {user? (
              <Logout setUser={setUser}/>
            ):(<Login setUser={setUser}/>
              )}
        </Container>
      </Navbar>
      {/* When you clicked through a website, each new URL you visited corresponded to 
      a new request to the web server, which was routed by server. */}
      <Routes>
        <Route exact path={'/'} element={
          // all of the necessary functions and state will be passed to MovieList as properties
          <MoviesList 
            user={ user }
            addFavorite={ addFavorite }
            deleteFavorite={ deleteFavorite }
            favorites={ favorites }
          />
        }/>
        <Route exact path={'/movies'} element={
          <MoviesList 
            user={ user }
            addFavorite={ addFavorite }
            deleteFavorite={ deleteFavorite }
            favorites={ favorites }
          />
        }/>
        <Route path={'/movies/:id/'} element={
          <Movie user={ user }/>
        }/>
        <Route path={'/movies/:id/review'} element={
          <AddReview user={ user }/>
        }/>
        <Route path={'/favorites'} element={
          
          <Favorites 
          user={ user } 
          favorites={ favorites }/>
          
        }/>
      </Routes>
    </div>
    </GoogleOAuthProvider>
  );
}

export default App;
