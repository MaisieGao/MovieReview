import React, {useState, useEffect} from 'react';
import MovieDataService from '../services/movies.js'
import { Link, useParams } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import moment from 'moment';
import './Movie.css';
//get user from app.js if logged in
const Movie = ({ user }) =>{
    
    let params = useParams();
    //set movie to have 4 criterias
    const [movie, setMovie] = useState({
        id: null,
        title: "",
        rated: "",
        reviews: []
    })

    useEffect(() => {
        const getMovie = id =>{
            //put the id into backend to get the movie
            MovieDataService.getMovie(id)
            //get the response back so we got the criterias in movies and we could use them 
            .then(response => {
                setMovie(response.data);
            })
            .catch(e => {
                console.log(e);
            });
        }
        //get id from the browser html
        getMovie(params.id)
    //the function got called when the id typed is different
    },[params.id]);
   
    return(
        <div>
            <Container>
                <Row>
                    <Col>
                    <div className='poster'>
                    <Image
                        className="bigPicture"
                        src={movie.poster+'/100px250'}
                        onError={(e) => {
                            // picture saved in public and no previous folders
                            e.target.src = '/NoPosterAvailable-crop.png';
                        }}
                    fluid />
                    </div>
                    </Col>
                    <Col>
                    <Card>
                        <Card.Header as='h5'>{movie.title}</Card.Header>
                        <Card.Body>
                            <Card.Text>
                                {movie.plot}
                            </Card.Text>
                            { user && 
                                <Link to={'/movies/' + params.id + '/review'}>
                                    Add Review
                                </Link>}
                        </Card.Body>
                    </Card>
                    <h2>Reviews</h2>
                    <br></br>
                    {movie.reviews.map((review, index) => {
                        return(
                            <div className='d-flex'>
                                <div className='flex-shrink-0 reviewsText'>
                                    <h5>{review.name + ' reviewed on'} {moment(review.date).format(' Do MMMM YYYY')}</h5>
                                    <p className='review'>{review.review}</p>
                                    {user && user.googleId === review.user_id &&
                                    <Row>
                                        <Col>
                                        <Link to={{
                                            pathname: '/movies/'+params.id+'/review'
                                        }}
                                        state={{
                                            currentReview: review
                                        }}>
                                            Edit
                                        </Link>
                                        </Col>
                                        <Col>
                                        <Button variant='link' onClick={() =>{
                                            //Implement delete behavior
                                            var data = {
                                                review_id: review._id,
                                                user_id: user.googleId,
                                            }
                                            MovieDataService.deleteReview(data)
                                            .then(response => {
                                                  setMovie((prevState) => {
                                                    prevState.reviews.splice(index, 1);
                                                    //after splice, it delete the first one
                                                    return ({
                                                        //give everything
                                                    ...prevState
                                                    })
                                                })
                                            })  
                                            .catch(e => {
                                                console.log(e);
                                            });
                                        }}>
                                            Delete
                                        </Button>
                                        </Col>
                                    </Row>
                                    }
                                </div>
                            </div>
                        )
                    })}
                    </Col>
                </Row>
            </Container>
        </div>
    )
}
export default Movie;