const mongoose = require('mongoose');

//TODO: User Schema
const Schema = mongoose.Schema;

// const itemSchema = new Schema({
//   ingredient: String,
//   quantity: Number,
//   price: Number,
// })


const userSchema = new Schema({
  googleId: String, //? Are google Ids numbers or strings?
  //groceryList: {itemSchema}
  groceryList: [{
    ingredient: String,
    quantity: Number,
    price: Number,
  }]
  });



const User = mongoose.model('user', userSchema)


//TODO: Does this need to be fixed for mongo?
module.exports = User;