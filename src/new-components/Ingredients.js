import React from 'react';
// import '../stylesheets/Ingredients.css';

const Ingredients = ({name, quantity, price}) => {
  
    // console.log(recipeDetail);
   
  return (  
    <div className="ingredients">
      <div>{name}</div>
      <div>{quantity}</div>
    </div>
  )
}

export default Ingredients;