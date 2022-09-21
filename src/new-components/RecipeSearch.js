import React, { useEffect, useState } from 'react';
// import Recipe from '...';

const RecipeSearch = (props) => {

  //create a fetch to the server to request recipes
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('/api/recipes', {
      method: 'GET',
      headers: {
      'Content-Type': "application/json"
      }
    })
    //take the recipes from the server and push them into a new array to be displayed
    .then(resp => resp.json())
    .then(data => {
      let recipeList = [];
      for (let i = 0; i < data.length; i++){
        recipeList.push(<Recipe 
          // key={i}
          // img={...}
          // name={...}
          // price={...}
          // ingredients={...}
          />)
      }
      //updating the state to be equal to the new array of recipes from the server
      props.setRecipes(recipeList);
    })
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
        {props.recipes}
      </div>
    </div>
  );
}

export default RecipeSearch