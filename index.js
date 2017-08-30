let express = require('express');
let session = require('express-session');

var app = express();

app.use(session({
    secret: 'IRolledMyFaceOnTheKeyboard',
    resave: false,
    saveUninitialized: false
}))
app.use( function(req, res, next) {
    const { session } = req;  // const session = req.session
    // console.log(session)
    if ( !session.user ) {
        session.user = { username: '', favorites: ['Jelly Shoes']};
    } 
    next();
    }
)

var port = 4000

//Get Favorites 
app.get( '/api/getFavorites', (req, res, next) => {
        const { favorites } = req.session.user; // const favorites = req.session.user.favorites
        res.status(200).send(favorites)
    })


//Add to Favorites
app.post( '/api/addFavorites', (req, res, next) => {
        const { favorites } = req.session.user; // const user = req.session.user
        let { fav } = req.query //const favorite = req.query.favorite

        favorites.push(fav)
        res.send(favorites)
        // const favIndex = favorites.findIndex( favItem => favItem.id == id );

        // if ( index === -1 ) {
        //     const selectedSwag = swag.find( swag => swag.id == id );

        //     cart.push( selectedSwag );
        //     req.session.user.total += selectedSwag.price;
        // }
        // res.status(200).send(req.session.user)
    })



app.listen( port, () => { console.log(`Server listening on port ${port}.`); } );