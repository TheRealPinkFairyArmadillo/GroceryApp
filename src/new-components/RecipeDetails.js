import React from 'react';
import Ingredients from './Ingredients.js'
// import '../stylesheets/RecipeDetails.css';

const RecipeDetails = ({recipes, recipeDetail}) => {
  //render the ingredients of the recipe selected
    //display the name of the recipe with the total price below (flexbox with columns and space-around)
    //img of the recipe to be on the right side
    console.log(recipeDetail.target.id);
    const recipeName = recipeDetail.target.id
    console.log(recipes[recipeName])
    const displayIngredients = [];

    for (let i = 0; i < recipes[recipeName].ingredientDetails.length; i++) {
      displayIngredients.push(<Ingredients 
        name={recipes[recipeName].ingredientDetails[i].food.description}
        quantity={`${recipes[recipeName].ingredientDetails[i].quantity} ${recipes[recipeName].ingredientDetails[i].measure}`}
        price={recipes[recipeName].ingredientDetails[i].food.price}
        key={i+'recipeList'}
        />)
    }
  return (  
    <div className="recipe-title">
      <h3>{recipeDetail.target.id}</h3>
      <div className="recipe-ingredients">
        {displayIngredients}
      </div>
    </div>
  )
}

export default RecipeDetails;