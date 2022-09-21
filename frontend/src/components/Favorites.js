import React, {useState, useEffect, useCallback} from 'react';
import FavoriteDataService from '../services/favorites.js'
import Card from 'react-bootstrap/Card';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './Favorites.css';
import Container from 'react-bootstrap/Container';

const Favorites = ({ user,favorites }) =>{
  const [array, setArray] = useState([]);
  // get the favorites movie list and put the movies in the array
  const GetAllFavorite = useCallback((user) =>{
    //put the userid into backend to get the movie
    FavoriteDataService.getAllFavorite(user.googleId)
    //get the response back so we got the criterias in movies and we could use them 
    .then(response => {
        setArray(response.data.favorites);
        
    })
    .catch(e => {
        console.log(e);
    });
  },[]);

  useEffect(() => {
    if(user)
    {GetAllFavorite(user);}
}, [user])


  return(
     <div>
        <Container className='favoritesContainer container'>
          <div className='favoritesPanel'>
          {
            favorites && favorites.length > 0 ?
            <span>Drag your favorites to rank them</span> :
            <span> You haven't chosen any favorites yet</span>
          }
          </div>
          
          <DragDropContext onDragEnd={(param) => {
          const srcI = param.source.index;
          const desI = param.destination?.index;
          if (desI) {
            array.splice(desI, 0, array.splice(srcI, 1)[0]);
          }
        }}>
          <Droppable droppableId="characters">
            {(provided) => (
            <div className="favoritesbox" {...provided.droppableProps} ref={provided.innerRef}>
            
            {array.map(({_id, title, poster}, index) => {
              return (
                <Draggable key={_id} draggableId={_id} index={index}>
                  {(provided) => (
                <div className='favoritesLargeCard' ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                  
                  <div className="favoritesCard card">
                    <div className= {` favoritesNumber ${index>9 ? 'favoritesNumberTwoDigit' : 'favoritesNumberOneDigit'}`}>
                      {index+1}
                    </div>
                    <div>
                      <Card.Img
                        className='favoritesPoster'
                        src={poster+"/100px180"}
                        onError={(e) => {
                            // picture saved in public and no previous folders
                            e.target.src = '/NoPosterAvailable-crop.png';
                          }}
                        />
                    </div>
                    
                    <div className='favoritesTitle'>
                      { title }
                    </div>
                  </div>
                </div>)}
                </Draggable>
                )}
              )}
            {provided.placeholder}
          </div>
          )}
          </Droppable>
          </DragDropContext>
          
        </Container>
      </div>
  )
}

export default Favorites;