Me and my teammates built a full-stack application using the MERN (MongoDB, Express, React, Node.js) stack.

The website we built is a movie review website. It allows users to sign in using google id, search movie by title, view/update/delete reviews, check movie details, add movies to their favorites collection by clicking on stars, rank their favorite movies cards by dragging and dropping.

**For backend:**

We imported the already completed movie database in MongoDB.
We connect mongodb database to our backend in index.js. We set the port value and the server to listen at the port. 
We use express to makes the app available to serve HTTP requests.
We use router to create a list of apps routes to handle requests based on their different URLs and HTTP request methods. 
we associate these routes to the controllers with api methods in the controller.js files to handle requests.
The API methods connect to data retrieval methods in DAO files to retrieve data from database base on requests and then give the responses back to the frontend.

**For Frontend:**

We first create a react app.
We used axios to create functions to make GET,PUT,POST,DELETE requests to the API which we have already implemented on the backend. 
We used Google's authentication API to handle identity management and authentication. 
We then create the main page that display all the movies by retrieving the movie lists from the movie database. 
We also create detail movie page with reviews in which only authorized user can edit and delete reviews.
We then created a favorite movie page,in which only authorized user can see, with ranked favorite movies cards.  
In these page components, we used useState to set and update state and we used useCallback and useEffect hooks to generate methods that enable us to process and filter data we retrieved from the backend.
In the rendered part of the components, we used UI components from different react libraries (such as bootstrap library to generate cards for lists of movies, React DnD library to drag and drop cards to rank favorite movies, react-icons/bs to add or delete movie from the favorite movie list by pressing or unpressing the stars on the movie cards) to display the required arrays of movie data.

 
