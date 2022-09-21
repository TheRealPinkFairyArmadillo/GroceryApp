const Router = require('express');
const recipeController = require('../controllers/recipeController');
const krogerController = require('../controllers/krogerController');

const router = Router();


//console log so we know the router is working
router.use((req, res, next) => {
    console.log(`server/routes/recipeRouter.js: received request ${req.method} ${req.url}`);
    next();
})

router.get('/search/:query', recipeController.getRecipes, (req, res) => {
    console.log(`server/routes/recipeRouter.js.router.get('/search'): received request ${req.method} ${req.url}`);
    res.status(200).json(res.locals.recipes);
})

router.get('/ingredients/', krogerController.getToken, krogerController.getItem2, (req, res) =>{
    console.log(`getting items from kroger`, res.locals);
    res.status(200).json(res.locals.itemInfo);
})

module.exports = router;
