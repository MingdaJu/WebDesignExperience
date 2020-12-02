const express = require('express');
const app = express();
const mongoose = require('mongoose');
const postsRoute = require('./routes/posts');
const bodyParser = require('body-parser');


require('dotenv/config');

app.use(express.json());
app.use('/user',postsRoute);

 
app.get('/', (req, res) => {
    res.send('Mingda JU');
});


mongoose.connect(
    //process.env.DB_CONNECTION,
    'mongodb://localhost:27017/newhw',
    { useNewUrlParser: true, /*useUnifiedTopology: true*/ },
    () => console.log('Connected to DB')
);
app.listen(3000);