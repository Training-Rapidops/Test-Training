const express = require("express");
const app = express();
app.use(express.json());
const data = [
    { id: 1, genres: "Action" },
    { id: 2, genres: "Horror" },
    { id: 3, genres: "Thriller" },
    { id: 4, genres: "Romcom" }
];
app.get('/', (req, res) => {
    res.send("Welcome To Vidly");
});
app.get('/api/genres', (req, res) => {
    res.send(data);
});
app.get('/api/genres/:id', (req, res) => {
    let genre = data.find(g => g.id === parseInt(req.params.id));
    if (!genre) return res.send("requested Genre Not Found");
    res.send(genre);
});
app.post('/api/genres', (req, res) => {
    if (!req.body.genres) return res.send("Enter The Genres Name");
    const genre = {
        id: data.length + 1,
        genres: req.body.genres
    }
    data.push(genre);
    res.send(data);
});
app.put("/api/genres/:id", (req, res) => {
    let genre = data.find(g => g.id === parseInt(req.params.id));
    if (!genre) return res.send("requested Genre Not Found");
    if (!req.body.genres) return res.send("Enter The Genres Name");
    genre.genres = req.body.genres;
    res.send(data);
});
app.delete("/api/genres/:id", (req, res) => {
    let genre = data.find(g => g.id === parseInt(req.params.id));
    if (!genre) return res.send("requested Genre Not Found");
    const index = data.indexOf(genre);
    data.splice(index,1);
    res.send(data);
});
app.listen(3000, () => {
    console.log("Server Started On 3000");
});