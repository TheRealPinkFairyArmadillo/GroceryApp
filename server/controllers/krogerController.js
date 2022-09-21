const krogerController = {};
const base64 = require('base-64');
const fetch = require('cross-fetch');
const { json } = require('express');
// Declare an empty object
// Store token data in this object
const tokenData = {};

// Makes a POST request to the Kroger server
// Right now, only logs the response, and saves data to the tokenData object declared above but get back
// Response from Kroger is an object with three keys/properties
// access_token: String
// expires_in: 1800 *NOTE* in milliseconds (1800ms = 30 minutes)
// token_type: "bearer"

const client_id = 'recipezy-48ea7f3e9633ceb7b3a08fb11ebceb7f2097557129825701077'
const client_secret = '7NkEQCz6WLGLINvPKznSAcBWf1X5toR7bssESU5j'
//const encoded = utf8_to_b64(client_id + ":" + client_secret);
const encoded = base64.encode(client_id+":"+client_secret)

krogerController.getToken = (req, res, next) => {
  fetch('https://api.kroger.com/v1/connect/oauth2/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: 'Basic ' + encoded,
    },
    body: 'grant_type=client_credentials&scope=product.compact',
  })
    .then((res) => res.json())
    .then((data) => {
      tokenData.accessToken = data.access_token;
      tokenData.expiresIn = data.expires_in;
      tokenData.tokenType = data.token_type;
      res.locals.tokenInfo = tokenData;
      // added a next statement
      return next();
    })
    .catch((error) =>
    next(
      {
        message: { err: error },
        log: 'cannot retrieve data from edamam API',
      }
    )  
    );
};

// Test call to the Kroger server
// Hard coded the product name on line 43: filter.term=milk

//req params req body

krogerController.getItem2 = (req, res, next) => {
  const { ingredientsList } = req.body;
  const itemInfo = {};
  const test = [];
  const urls = [];
  ingredientsList.forEach((ingredient) => {
    urls.push(`https://api.kroger.com/v1/products?filter.term=${ingredient}}&filter.locationId=01400943&filter.limit=1`)
  })
  // use map() to perform a fetch and handle the response for each url
  Promise.all(urls.map((url, index) =>
    fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${tokenData.accessToken}`,
        'Access-Control-Allow-Origin': '*',
      },
    })
      .then((res) => res.json())                 
      .then((data) => itemInfo[ingredientsList[index]] = data)
      .catch((err) => console.log(err))
  ))
  .then(data => {
    console.log(itemInfo);
    res.locals.itemInfo = itemInfo;
    next();
    // do something with the data
  })
}



//https://api.kroger.com/v1//products?filter.term=bread&filter.locationId=01400943&filter.limit=1
krogerController.getItem = (req, res, next) => {
  const { ingredientsList } = req.body;
  const itemInfo = {};
  Promise.all(ingredientsList.forEach( async (ingredient) => {
    console.log(ingredient);
    fetch(
      `https://api.kroger.com/v1/products?filter.term=${ingredient}}&filter.locationId=01400943&filter.limit=1`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${tokenData.accessToken}`,
          'Access-Control-Allow-Origin': '*',
        },
      }
    )
      .then((res) => res.json())
      .then((info) => {
        // narrow down the properties we want from the response object that Kroger gives us
        // food name, upc, price, size
        itemInfo[ingredient] = {
          food_name: info.data[0].description,
          upc: info.data[0].upc,
          food_price: info.data[0].items[0].price.regular,
          food_size: info.data[0].items[0].size,
        };
        console.log(itemInfo);
        // store only the data we want in res.locals, to later create new row in db
      })
      .catch((error) =>
      next(
        {
          message: { err: error },
          log: 'cannot retrieve data from edamam API',
        }
      )  
      );
  }))
  .then((data) => {
    res.locals.itemInfo = itemInfo;
    return next();
  })
};

module.exports = krogerController;

// // curl -X GET \
//   'https://api.kroger.com/v1/locations' \
//   -H 'Accept: application/json' \
//   -H 'Authorization: Bearer {{TOKEN}}'
// https://api.kroger.com/v1/locations/{locationId}
// https://api.kroger.com/v1/locations/{locationId}
