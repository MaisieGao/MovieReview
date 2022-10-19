**Home Page:**

<img width="1424" alt="Screen Shot 2022-10-05 at 5 47 55 PM" src="https://user-images.githubusercontent.com/90473308/194189304-b64013fa-35ba-489c-a160-d0531fb44d05.png">

**Movie Detail Page:**

<img width="1468" alt="Screen Shot 2022-10-05 at 5 48 14 PM" src="https://user-images.githubusercontent.com/90473308/194189342-61f2f8a6-499a-4b08-97a0-262e5aff1b86.png">

**Favorite Page:**

<img width="1469" alt="Screen Shot 2022-10-05 at 5 48 26 PM" src="https://user-images.githubusercontent.com/90473308/194189356-f0932028-9f4a-4963-81a7-32f3eac3d998.png">

**Please check all the pages on Heroku!**
<hr/>
I built a full-stack application using the MERN (MongoDB, Express, React, Node.js) stack.

The website I built is a movie review website. It allows users to sign in using google id, search movie by title, view/update/delete reviews, check movie details, add movies to their favorites collection by clicking on stars, rank their favorite movies cards by dragging and dropping the movie cards.

**For backend:**

*I imported the already completed movie database in MongoDB.
<br />
*I connected mongodb database to the backend in index.js. I set the port value and the server to listen at the port. 
<br />
*I used express to makes the app available to serve HTTP requests.
<br />
*I used router to create a list of apps routes to handle requests based on their different URLs and HTTP request methods. 
<br />
*I associated these routes to the controllers with api methods in the controller.js files to handle requests.
<br />
*The API methods connect to data retrieval methods in DAO files to retrieve data from database base on requests and then give the responses back to the frontend.
<br />

**For Frontend:**
<br />
*I first created a react app.
<br />
*I used axios to create functions to make GET,PUT,POST,DELETE requests to the API which I have already implemented on the backend. 
<br />
*I used Google's authentication API to handle identity management and authentication. 
<br />
*I then created the main page that display all the movies by retrieving the movie lists from the movie database. 
<br />
*I also created detail movie page with reviews in which only authorized user can edit and delete reviews.
<br />
*I then created a favorite movie page,in which only authorized user can see, with ranked favorite movies cards.  
<br />
*In these page components, I used useState to set and update state and I used useCallback and useEffect hooks to generate methods that enable me to process and filter data I retrieved from the backend.
<br />
*In the rendered part of the components, I used UI components from different react libraries (such as bootstrap library to generate cards for lists of movies, React DnD library to drag and drop cards to rank favorite movies, react-icons/bs to add or delete movie from the favorite movie list by pressing or unpressing the stars on the movie cards) to display the required arrays of movie data.

 
