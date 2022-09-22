import React, { useEffect } from 'react';
import Recipe from './Recipe';
import '../stylesheets/RecipeSearch.css'

let recipeList = [];


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
      console.log(data); 
      //updating the state to be equal to the new array of recipes from the server
      setRecipes(data);
    })
  }
    useEffect(() => {
      if (recipeList.length > 1) recipeList = [];
      console.log('Use Effect Running')
      for (let key in recipes){
        console.log(key)
        recipeList.push(<Recipe 
          key={key}
          img={recipes[key].image}
          name={recipes[key].name}
          ingredients={recipes[key].ingredients}
          url={recipes[key].url}
          />)
        }
        console.log(recipeList);
        // run a new function to send data back for pricing
    },[recipes])

     //second fetch call to get pricing for each ingredient once the recipe state is populated

    
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
  

  return (
    <div className="recipe-search">
      <div className='search-area'>
        <form className='message-form' onSubmit={e => handleSubmit(e)}>
          <input className='search-box'
            type='text'
            name='recipe'
            placeholder='Search for recipes'
            autoComplete='off'
            />
          <button type='submit' className='recipe-button'>
            Search
          </button>
        </form>
      </div>
      <div className="recipe-tiles">
        {recipeList}
      </div>
    </div>
  );
}

export default RecipeSearch