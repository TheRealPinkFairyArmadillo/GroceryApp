import React from 'react';
// import '../stylesheets/RecipeDetails.css';

const RecipeDetails = ({recipes, recipeDetail}) => {
  //render the ingredients of the recipe selected
    //display the name of the recipe with the total price below (flexbox with columns and space-around)
    //img of the recipe to be on the right side
    console.log(recipeDetail);
    console.log(recipes)
  return (  
    <div className="recipe-title">
      <h3>{recipes[recipeDetail].name}</h3>
      <div className="recipe-ingredients">
        <p>Ingredient</p>
      </div>
    </div>
  )
}

export default RecipeDetails;