import { useState } from "react";
import React from "react";
import MovieDataService from '../services/movies.js';
import { useNavigate, useParams } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/Button";
import  Container from "react-bootstrap/Container";
import { useLocation } from 'react-router-dom';
const AddReview = ({ user }) => {
    const navigate = useNavigate()
    let params = useParams();
    let location = useLocation();
    
    let editing = false;
    let initialReviewState = '';

    //initialReviewState will have a different value if we are editing from an existing value
    const [review, setReview] = useState(initialReviewState);
    const onChangeReview = e => {
        const review = e.target.value;
        setReview(review);
    }
    if (location.state && location.state.currentReview){
        editing = true
    } 
    // The saveReview function will put together a data object and send
    //   it to the movies service method to be submitted to the backend
    //   via API call.
    const saveReview = () => {
        var data = {
            review: review,
            name: user.name,
            user_id: user.googleId,
            movie_id: params.id, //get movie id from URL   
        }
        
        if (editing){
            // To do: handle case where an existing review is being updated
            //give review_id to data
            data.review_id=location.state.currentReview._id
            MovieDataService.updateReview(data)
            .then(response => {
                navigate('/movies/'+params.id)
            })  
            .catch(e => {
                console.log(e);
            });
        } else{
            MovieDataService.createReview(data)
            .then(response => {
                navigate('/movies/'+params.id)
            })
            .catch(e => {
                console.log(e);
            });
        }
    }
    return(
        <Container className="main-container">
            <Form>
            <Form.Group className="mb-3">
                <Form.Label>{editing? 'Edit ':'Create '}Review</Form.Label>
                <Form.Control
                    as='textarea'
                    type='text'
                    required
                    value={ review }
                    onChange={onChangeReview}
                    defaultValue={editing? null:''}
                    />
                </Form.Group>
                <Button variant="primary" onClick={ saveReview }>
                    Submit
                </Button>
            </Form>
        </Container>
    )
}

export default AddReview;
