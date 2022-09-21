import React, { useEffect } from 'react';
import Recipe from './Recipe';

const RecipeSearch = ({recipes, setRecipes, setGroceries}) => {

  //create a fetch to the server to request recipes to display
  const handleSubmit = (e) => {
    e.preventDefault();
      //req perams for the search
    console.log(e.target.recipe.value);
    fetch(`/recipes/search/?id=${e.target.recipe.value}`)
    //take the recipes from the server and push them into a new array to be displayed
    .then(resp => resp.json())
    .then(data => {
      console.log(data)
      let recipeList = [];
      for (let i = 0; i < data.length; i++){
        recipeList.push(<Recipe 
          // key={i}
          // img={...}
          // name={...}
          // ingredients={...}
          // url={...}
          />)
      }
      //updating the state to be equal to the new array of recipes from the server
      setRecipes(recipeList);
    })

    //second fetch call to get pricing for each ingredient once the recipe state is populated
    useEffect(() => {
      // if (props.stretches)
    })
    
    // fetch('/recipes/ingredients', {
    //   method: 'GET',
    //   body: JSON.stringify({
    //     [currentRegion]: numberOfStretches,
    //   }),
    //   headers: {
    //     'Content-Type': "application/json"
    //   }
    // })
    // description
    // img
    // qty
    // price
  }

  return (
    <div>
      <div className='search-area'>
        <form className='message-form' onSubmit={e => handleSubmit(e)}>
          <input className='search-box'
            type='text'
            name='recipe'
            placeholder='Search for recipes'
            autoComplete='off'
            />
          <button type='submit' className='recipe-button'>
            Get Recipes
          </button>
        </form>
      </div>
      <div>
        {recipes}
      </div>
    </div>
  );
}

export default RecipeSearch