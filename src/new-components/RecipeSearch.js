import React, { useEffect } from 'react';
import Recipe from './Recipe';
import '../stylesheets/RecipeSearch.css'

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
      const recipeList = [];
      for (let key in data){
        recipeList.push(<Recipe 
          key={key}
          img={data[key].image}
          name={data[key].name}
          ingredients={data[key].ingredients}
          url={data[key].url}
          />)
      }
      console.log(recipeList)
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
        {recipes}
      </div>
    </div>
  );
}

export default RecipeSearch