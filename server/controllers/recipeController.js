const recipeController = {};
const fetch = require('cross-fetch');

const APP_ID = '900da95e';
const APP_KEY = '40698503668e0bb3897581f4766d77f9';
const URL = 'https://api.edamam.com/api/recipes/v2?';

recipeController.getRecipes = async (req, res, next) => {
    const { query } = req.params;
    console.log(query);
    const params = {
        type: 'public',
        app_id: APP_ID,
        app_key: APP_KEY,
        q: query,
    }
    fetch(URL + new URLSearchParams(params))
      .then((res) => res.json())
      .then((data) => {
        res.locals.recipes = data;
        // added a next statement
        return next();
      })
      .catch((error) => {
        next(
          {
            message: { err: error },
            log: 'cannot retrieve data from edamam API',
          }
        )
      })
}

module.exports = recipeController;