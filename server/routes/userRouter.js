const Router = require('express');

const router = Router();


//console log so we know the router is working
router.use((req, res, next) => {
    console.log(`server/routes/user.js: received request ${req.method} ${req.url}`);
    next();
})

module.exports = router;