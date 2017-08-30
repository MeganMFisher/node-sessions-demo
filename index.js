let express = require('express');
let session = require('express-session');

var app = express();

//Middleware
app.use(session({
    secret: 'ldkajflkejfakjelkfj;lafke',
    resave: false,
    saveUninitialized: false
}))
app.use( function(req, res, next) {
    const { session } = req;  // const session = req.session
    // console.log(session)
    if ( !session.user ) {
        session.user = { username: 'unisaurs', favorites: ['Jelly Shoes']};
    } 
    next();
    }
)

var port = 4000

//Get Favorites 
app.get( '/api/getFavorites', (req, res, next) => {
        const { user } = req.session; // const favorites = req.session.user.favorites
        res.status(200).send( user )
    })


//Add to Favorites
app.post( '/api/addFavorites', (req, res, next) => {
        const { favorites } = req.session.user; // const user = req.session.user
        let { fav } = req.query //const favorite = req.query.fav

////////////////////////////////////////
        // favorites.push(fav)
        // res.send(favorites)
////////////////////////////////////////

        const favIndex = favorites.findIndex( favItem => favItem == fav );

        if ( favIndex === -1 ) {
                favorites.push(fav)
               return res.send(req.session.user)
        }
        res.status(200).send(req.session.user)
    })

    //findIndex() method will return the index of an item if it is found if not it will return -1. First we check to see if the item they are trying to add to the user favorites array is already in it and if it is then we skip over the if statement and just res.send(200) with the user object on session. If not we go into the if statement below since index will return -1 and push the new item to the user favorites array.



app.listen( port, () => { console.log(`Server listening on port ${port}.`); } );