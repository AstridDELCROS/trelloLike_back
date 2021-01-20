require('dotenv').config();

const express = require('express');
const app = express();
const router = require('./app/router');
const port = process.env.PORT || 3000;
const cors = require('cors'); // pour rendre l'API accessible...
app.use(cors('*')); // ... à tous les domaines

// express.urlencoded() for POST requests, because in this request you are sending data 
// (in the form of some data object) to the server and you are asking the server to accept or 
// store that data (object), which is enclosed in the body (i.e. req.body) of that (POST) Request
app.use(express.urlencoded({extended: true}));

const sanitizeHtml = require('sanitize-html');
// pour assainir les données envoyer par les utilisateurs
const sanitizer = (request, response, next) => {
    if (request.body) {
        for (const propName in request.body) {
            // Grâce à request.body -> nouvelle valeur assainie grâce à function sanitizeHtml du module sanitize-html
            request.body[propName] = sanitizeHtml(request.body[propName]);
        }
    }
    next();
}
// middleware chargé d'assinir les données reçues doit être après celui qui organise les données reçues dans request.body (urlencoded etc.)
app.use(sanitizer);

app.use(router);

app.listen(port, _ => {
   console.log(`http://localhost:${port}`);
});