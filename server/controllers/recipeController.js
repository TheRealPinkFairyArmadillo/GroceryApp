const recipeController = {};
const fetch = require('cross-fetch');
const { locals } = require('../routes/recipeRouter');

const APP_ID = '900da95e';
const APP_KEY = '40698503668e0bb3897581f4766d77f9';
const URL = 'https://api.edamam.com/api/recipes/v2?';

recipeController.getRecipes = async (req, res, next) => {
    const { id } = req.query;
    const recipes = [];
    console.log(id);
    const params = {
        type: 'public',
        app_id: APP_ID,
        app_key: APP_KEY,
        q: id,
    }
    
    fetch(URL + new URLSearchParams(params))
    .then((res) => res.json())
      .then((data) => {
        recipes.push(...data.hits);
        res.locals.recipeList = recipes;
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

recipeController.returnRecipes = (req, res, next) => {

const recipes = {};

const recipeList = res.locals.recipeList;

 Promise.all(recipeList.map(recipe => {
     
        recipeDetails = {
            name: recipe.recipe.label,
            image: recipe.recipe.images.THUMBNAIL.url,
            url: recipe.recipe.url,
            ingredients: recipe.recipe.ingredientLines,
            ingredientDetails: recipe.recipe.ingredients,
          }

      recipes[recipeDetails.name] = recipeDetails;
        }))
        .then( ()  => {
          res.locals.recipes = recipes;
          next();
    })
    .catch((error) => {
      next(
        {
          message: { err: error },
          log: 'cannot retrieve data from edamam API - recipeController.returnRecipes',
        }
      )
    })
  }



module.exports = recipeController;