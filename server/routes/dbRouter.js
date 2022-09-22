const express = require('express')
const router = express.Router()
const dbControllers = require('../controllers/dbControllers')

//get all users
router.get('/', dbControllers.getAllUsers, (req, res) => {
  return res.status(200).json(res.locals.users)
})

//getting one user
router.get('/:googleId', dbControllers.getUser, (req, res) => {
  return res.status(200).json(res.locals.user)
})

//create user
router.post('/', dbControllers.createUser, (req, res) => {
   return res.status(201).json(res.locals.user)
})

//replace db's copy of groceryList with new copy from state after manipulation
router.patch('/:googleId', dbControllers.updateGroceryList, (req, res) => {
  return res.status(200).json(res.locals.updatedUser)
})

// //decrement/delete ingredient from user grocery list
// router.delete('/:id', async (req, res) => {

// })

module.exports = router