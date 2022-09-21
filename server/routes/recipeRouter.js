const Router = require('express');
const recipeController = require('../controllers/recipeController');

const router = Router();


//console log so we know the router is working
router.use((req, res, next) => {
    console.log(`server/routes/recipe.js: received request ${req.method} ${req.url}`);
    next();
})

router.get('/search/:query', recipeController.getRecipes, (req, res) => {
    console.log(`server/routes/recipeRouter.js.router.get('/search'): received request ${req.method} ${req.url}`);
    res.status(200).json(res.locals.recipes);
})

module.exports = router;