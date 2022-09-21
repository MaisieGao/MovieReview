import express from "express";
import cors from 'cors';
import movies from './api/movies.route.js'

const app = express();
//easy request: head, get, post
//complex: fetch
app.use(cors());
app.use(express.json());

app.use('/api/v1/movies',movies);
//other url will return a status of 404
app.use('*',(req,res) =>{
    res.status(404).json({error:'not found'})
})

export default app;