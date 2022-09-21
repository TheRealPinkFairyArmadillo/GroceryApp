//library imports
const path = require('path');
const express = require('express');
const app = express();
const PORT = 3000;
const cors = require('cors');
const mongoose = require('mongoose')

//file imports
const krogerRouter = require('./controllers/krogerController');
const groceryController = require('./controllers/groceryController');
const krogerController = require('./controllers/krogerController');

app.use(express.json())
app.use(cors());

//? Do I need to add access for all IPs?
const MONGO_URI = 'mongodb+srv://mcmcgowan:grocerEZ@cluster0.bzzcwf9.mongodb.net/?retryWrites=true&w=majority'
//mcmcgowan - grocerEZ

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
mongoose.connection.once('open', () => {
  console.log('Connected to Database')
})

const dbRouter = require ('./routes/dbRouter')
app.use('/users', dbRouter)






// //check if it exists in database
// // app.use('/addToGroceryList', )

// // get request to check db for input food item
// // newItemName
// app.get('/addToList/:item', groceryController.checkItem, (req, res) => {
//   return res.status(200).json(res.locals.food);
// });
//import routers
const list = require('./routes/listRouter');
const recipe = require('./routes/recipeRouter');
const user = require('./routes/userRouter');


app.use(cors());
app.use(express.json());
// app.use(cookieParser());

//serve the dist folder (build)
app.use(express.static(path.resolve(__dirname, '../dist')));

//add routers
app.use('/user', user);
app.use('/recipes', recipe);
app.use('/list', list);


app.get('/addToList/:item', krogerController.getToken, (req, res) => {
  return res.status(200).json(res.locals.food);
});


// // app.get('/krogerapi/token', krogerController.getToken, (req, res) => {
// //   return res.status(200).json(res.locals.tokenInfo);
// // });

// // get request to grab token and then fetch item data from kroger api
// app.get(
//   '/krogerapi/getItem/:item',
//   krogerController.getToken,
//   krogerController.getItem,
//   groceryController.addItem,
//   (req, res) => {
//     return res.status(200).json(res.locals.itemInfo);
//   }
// );

//default 404 handeler
app.use((req, res) => {
  console.log(`server/app.js: handler not found for request ${req.method} ${req.url}`);
  res
      .status(404)
      .send(
      'Page not found'
      );
});

//global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    message: { err: 'An error occurred' },
    log: 'Express error handler caught unknown middleware error',
    status: 400,
  };
  const errObj = Object.assign(defaultErr, err);
  console.log('ErrorObject Log: ', errObj.log);
  res.status(errObj.status).send(errObj.message);
});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
