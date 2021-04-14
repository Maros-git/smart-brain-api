import express from 'express';
import bodyParser from 'body-parser';
import bcrypt from 'bcrypt-nodejs';
import cors from 'cors';
import knex from 'knex';

import signin from './controllers/signin.js';
import register from './controllers/register.js';
import profile from './controllers/profile.js';
import image from './controllers/image.js';
import imageapi from './controllers/imageapi.js'

process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0; 

const db = knex ({
    client: 'pg',
    connection: {
      connectionString : process.env.DATABASE_URL,
      ssl: true
    }
  });

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/', (_req, res) => { res.send(db.users) })
app.post('/signin', (req, res) => { signin(req, res, db, bcrypt) })  
app.post('/register', (req, res) => { register(req, res, db, bcrypt) })
app.get('/profile/:id', (req, res) => { profile(req, res, db) })
app.put('/image', (req, res) => { image(req, res, db) })
app.post('/imageurl', (req, res) => { imageapi(req, res) })

// const PORT = process.env.PORT
app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is listening on port ${process.env.PORT}`);
});

// console.log(PORT)   

// bcrypt.hash(password, null, null, function(err, hash) {
//     console.log(hash);
// });

// // Load hash from your password DB.
// bcrypt.compare("bacon", hash, function(err, res) {
//     // res == true
// });
// bcrypt.compare("veggies", hash, function(err, res) {
//     // res = false
// });



/*    IDEAS of composition
/--> res = this is working
/signin --> POST (cos we're posting data) = success/fail
/register --> POST (cos we're adding data to dbs) = user
/profile/:userId --> GET (cos we're trying to get user info) = user
/image --> PUT (cos user is already exist and we're updating counting on profile) user


*/
