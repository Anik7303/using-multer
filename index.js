const express = require('express');
const expressHandlebars = require('express-handlebars');
const multer = require('multer');

// middlewares
const { uploadImage, uploadVideo } = require('./middlewares/upload');

// variables
const PORT = process.env.PORT || 3000;

const app = express();

app.engine('hbs', expressHandlebars({ extname: 'hbs' }));
app.set('view engine', 'hbs');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/', (req, res, next) => {
    res.render('home');
});

app.post('/upload/image', uploadImage, (req, res) => {
    res.locals.message = 'upload successful';
    res.status(303).render('message');
});

app.post('/upload/video', uploadVideo, (req, res) => {
    res.locals.message = 'upload successful';
    res.status(303).render('message');
});

app.get('/message', (req, res) => {
    res.locals.message = 'Welcome to message page';
    res.render('message');
});

// 404 route
app.use((req, res) => {
    res.json({ message: "This route doesn't exist. Please try a valid route" });
});
// custom error handler
app.use((err, req, res, next) => {
    res.json({ error: err, status: err.statusCode });
});

app.listen(PORT, () => console.log(`server listening on port ${PORT}`));
