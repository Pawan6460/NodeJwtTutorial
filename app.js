const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
app.get('/api', (req, res) => {
    res.json({
        message: 'welcome to mock api'
    })
})

//verifyToken is a middle ware to check for protected route by token recieved
app.post('/api/posts', verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretKey', (err, authData) => {
        if(err) {
            res.sendStatus(403)
        } else {
            res.json({
                message: 'Post created',
                authData
            })
        }
    })
    res.json({
        message: 'Post created'
    });
})

// token helps to route to a protected route
// witout which access to end point restrcited
app.post('/api/login',(req, res) => {
    //mock user
    const user = {
        id: 1,
        username: 'brad',
        email: 'brad@gmail.com' 
    }
    jwt.sign({user}, 'secretKey', {expiresIn: '30s'}, (err, token) => {
        res.json({
            token
        })
    })
})

app.listen(5000, () => {
    console.log('Server started on 5000')
})


//Formate of token
function verifyToken(req, res, next) {
  // get auth headers
  const bearerHeader = req.headers['authorization'];
  if(typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' '); 

    //get token from array
    const bearerToken = bearer[1];
    req.token = bearerToken;

    // next middleware
    next();
  } else {
    res.sendStatus(403)
  } 
}