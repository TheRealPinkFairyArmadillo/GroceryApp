import React, { useEffect, useState } from 'react';
import Recipe from '...';
import { json } from 'express';

const RecipeSearch = () => {

  const [recipes, setRecipes] = useState([]);

  useEffect(() => {

  })

  const handleSubmit = async (e) => {
    e.preventDefault();
    fetch('/api/recipes', {
      method: 'GET',
      headers: {
      'Content-Type': "application/json"
      }
    })
    .then(resp => resp.json())
    .then(data => {
      let recipeList = [];
      for (let i = 0; i < data.length; i++){
        recipeList.push(<Recipe 
          img={...}
          name={...}
          price={...}
          />)
      }
      setRecipes(recipeList);
    })
  }

  

  //create fetch to the server for the entry being input in the 'recipe' search box
    //receive an array of objects (these will contain the recipe details)
      //push these into recipeList
      //update setRecipeList with the new recipeList


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